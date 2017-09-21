import React from 'react';
import Plot from './Plot';

const styles = {
  width   : 1000,
  height  : 500,
  padding : 50,
};


export default class Chart extends React.Component {
   constructor(props) {
      super(props);
   }
   componentDidMount() {
      this.loadData()
   }

   loadData() {
      $.ajax({
          url: this.props.url,
          datatype: 'json',
          cache: false,
          success: function(data) {
              this.setState({data: data});
          }.bind(this)
      });
   }

  render() {
    return (
      <div>
        <Plot {...this.state} {...styles} /> 
      </div>
    )
  }
}