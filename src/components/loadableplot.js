import React, {Component} from 'react';
import Loadable  from 'react-loadable';

function Loading({ pastDelay }) {
    return pastDelay ? <h3>Loading...</h3> : null;
  }
  
  const LoadablePlot = Loadable({
    loader: () => import('react-plotly.js'),
    loading: Loading
  });
  
  
class Plot extends Component {
    render() {
        return <LoadablePlot data={this.props.data} layout={this.props.layout} />;
      }
    }
  
  export default Plot;