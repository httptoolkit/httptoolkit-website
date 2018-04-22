import _ from 'lodash';
import React from 'react';
import styled from 'styled-components';
import {
    subSeconds,
    format as dateFormat,
    distanceInWordsStrict,
    distanceInWords,
    differenceInSeconds
} from 'date-fns';
import { AreaStack, Line } from '@vx/shape';
import { curveMonotoneX } from '@vx/curve';
import { ParentSize } from '@vx/responsive';
import { scaleLinear, scaleOrdinal } from 'd3-scale';
import { interpolateRainbow } from 'd3-scale-chromatic';

const GraphWrapper = styled.div`
    position: relative;
`;

const Tooltip = styled.div`
    position: absolute;
    left: ${p => p.x}px;
    top: ${p => p.y}px;

    line-height: 1.45;
    padding: 0 8px 1px;
    border-radius: 4px;
    border: 1px solid ${p => p.theme.containerBackground};

    background-color: ${p => p.theme.popBackground};
    box-shadow: 0 4px 10px 0 rgba(0,0,0,0.15);
    color:  ${p => p.theme.mainColor};

    ${p => !p.hideArrow && `
        cursor: pointer;

        &:hover {
            border-color: #222;

            :before {
                border-right-color: #222;
            }
        }

        &:after, &:before {
            right: 100%;
            top: 50%;
            border: solid transparent;
            content: " ";
            height: 0;
            width: 0;
            position: absolute;
            pointer-events: none;
        }

        &:after {
            border-color: rgba(255, 255, 255, 0);
            border-right-color: #fff;
            border-width: 6px;
            margin-top: -6px;
        }
        &:before {
            border-color: rgba(216, 226, 230, 0);
            border-right-color: #d8e2e6;
            border-width: 7px;
            margin-top: -7px;
        }
    `});
`;

const RelativeTime = styled.div`
    opacity: 0.6;
`;

export default class StackedGraph extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            now: new Date(),
            requestTime: subSeconds(new Date(), 20),
            focusedData: null
        };

        this.timerInterval = null;
    }

    componentWillMount() {
        this.timerInterval = setInterval(() => {
            this.setState({ now: new Date() });
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timerInterval);
    }

    render() {
        const {
            data,
            highlighted,
            opacity,
            graphPaddingPx = 10
        } = this.props;

        const { requestTime, now } = this.state;

        let highlightOverlay = null;
        let tooltip = null;

        return <ParentSize>
            {({ width, height }) => {
                if (!width || !height) {
                    width = 1024;
                    height = 360;
                }
                
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
                                key={key}
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

                    let timeAgo = differenceInSeconds(requestTime, now) > -30 ?
                        distanceInWordsStrict(requestTime, now) :
                        distanceInWords(requestTime, now, { includeSeconds: true })

                    tooltip = <div>
                        <Tooltip x={x + 10} y={8} hideArrow={true}>
                            <div>
                                { dateFormat(requestTime, 'h:mm:ss a') }
                            </div>
                            <RelativeTime>
                                { timeAgo } ago
                            </RelativeTime>
                        </Tooltip>
                        { _.map(ys, (y, key) => {
                            let value = rowData[key];
                            return <Tooltip
                                key={key}
                                x={x + 10}
                                y={yScale(y) - 16}
                                onMouseEnter={() => this.setState({ focusedData: key }) }
                                onMouseOut={() => this.setState({ focusedData: null }) }
                            >
                                { value } { key } request{ value !== 1 && 's' }
                            </Tooltip>
                        }).reverse() }
                    </div>;
                }

                return <GraphWrapper>
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

                            fillOpacity={({ series: { key } }) => {
                                return this.state.focusedData === key ? (1 + opacity) / 2 : opacity
                            }}
                            fill={({ index }) => colorScale(keys[index])}
                        />

                        { highlightOverlay }
                    </svg>
                    { tooltip }
                </GraphWrapper>;
            }}
        </ParentSize>;
    }
};