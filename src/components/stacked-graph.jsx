import _ from 'lodash';
import React from 'react';
import styled from 'styled-components';
import {
    subSeconds,
    format as dateFormat,
    distanceInWordsStrict
} from 'date-fns';
import { AreaStack, Line } from '@vx/shape';
import { curveMonotoneX } from '@vx/curve';
import { scaleLinear, scaleOrdinal } from 'd3-scale';
import { interpolateRainbow } from 'd3-scale-chromatic';

const GraphWrapper = styled.div`
    position: relative;

    .graph-data {
        opacity: ${p => p.opacity == null ? 1 : p.opacity};
    }
`;

const Tooltip = styled.div`
    position: absolute;
    left: ${p => p.x}px;
    top: ${p => p.y}px;

    padding: 5px 8px;
    border-radius: 4px;
    border: 1px solid #fafafa;

    background-color: #d8e2e6;
    box-shadow: 0 4px 10px 0 rgba(0,0,0,0.1);
    color: #222;
`;

export default ({
    width,
    height,
    data,
    highlighted,
    opacity,
    graphPaddingPx = 10
}) => {
    const keys = Object.keys(data[0]);

    const x = (d, i) => i;

    const xScale = scaleLinear()
        .domain([0, data.length - 1])
        .range([0, width]);

    const yScale = scaleLinear()
        .domain([_.max(data.map(d => _(d).values().sum())), 0])
        .range([graphPaddingPx, height]);

    const colorScale = scaleOrdinal()
        .domain(keys)
        .range(_.map(keys, (_key, index) => interpolateRainbow(index / keys.length)));

    let highlightOverlay = null;
    let tooltip = null;

    if (highlighted) {
        let x = xScale(highlighted);
        let rowData = data[highlighted];

        let ys = keys.reduce(({sum, result}, key) => {
            let value = rowData[key];
            sum = sum + value;

            if (value !== 0) {
                result[key] = sum;
            }

            return {sum, result};
        }, { sum: 0, result: {}}).result;

        highlightOverlay = <g>
            <Line
                from={{ x, y: height }}
                to={{ x, y: 0 }}
                stroke="rgb(0, 0, 0)"
                strokeWidth={2}
                style={{ pointerEvents: 'none' }}
                strokeDasharray="2,2"
            />
            { _.map(ys).map((y, key) => {
                return (<circle
                    cx={x}
                    cy={yScale(y)}
                    r={4}
                    fill="rgb(225, 66, 31)"
                    stroke="white"
                    strokeWidth={2}
                    style={{ pointerEvents: 'none' }}
                />);
            }) }
        </g>

        let requestTime = subSeconds(new Date(), 10);

        tooltip = <div>
            <Tooltip x={x + 10} y={8}>
                <div>
                    { dateFormat(requestTime, 'hh:mm:ss a') }
                </div>
                <div>
                    ({ distanceInWordsStrict(requestTime, new Date()) } ago)
                </div>
            </Tooltip>
            { _.map(ys, (y, key) => {
                let value = rowData[key];
                return <Tooltip x={x + 10} y={yScale(y) - 16}>
                    { value } <strong>{ key }</strong> request{ value !== 1 && 's' }
                </Tooltip>
            } )}
        </div>;
    }

    return (<GraphWrapper opacity={opacity}>
        <svg width={width} height={height}>
            <rect
                x={0}
                y={0}
                width={width}
                height={height}
                fill="#fafafa"
                rx={14}
            />

            <AreaStack
                keys={keys}
                data={data}
                className='graph-data'

                x={(d, i) => xScale(i)}
                y0={(d) => yScale(d[1])}
                y1={(d) => yScale(d[0])}
                curve={curveMonotoneX}

                fillOpacity={1}
                fill={({ index }) => colorScale(keys[index])}
            />

            { highlightOverlay }
        </svg>
        { tooltip }
    </GraphWrapper>);
};