import React from 'react';

export default class RotatingText extends React.Component {
    rotateIntervalId = null;
  
    constructor(props) {
      super(props);
      
      this.state = {
        currentOption: 0
      };
    }
  
    componentDidMount() {
      this.rotateIntervalId = setInterval(() => {
        this.setState((state) => ({
          currentOption: (state.currentOption + 1) % this.props.children.length
        }));
      }, 2000);
    }
  
    componentWillUnmount() {
      clearInterval(this.rotateIntervalId);
    }
  
    render() {
      return <span className={this.props.className}>
        {this.props.children[this.state.currentOption]}
      </span>
    }
  }