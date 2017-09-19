import React from 'react';
import Plot from './Plot';

const styles = {
  width   : 1000,
  height  : 500,
  padding : 50,
};

// The number of data points for the chart.
const numDataPoints = 50000;

// A function that returns a random number from 0 to max
const randomNum     = (max) => Math.floor(Math.random() * max);

// A function that creates an array of 50 elements of (x, y) coordinates.
const randomDataSet = () => {
  return Array.apply(null, {length: numDataPoints}).map(() => [randomNum(20000), randomNum(10000)]);
}

export default class Chart extends React.Component{
  constructor(props) {
    super(props);
    this.state = { data: randomDataSet() };
  }

  render() {
    return <div>
      <Plot {...this.state} {...styles} />
    </div>
  }
}