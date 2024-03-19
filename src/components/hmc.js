import React, { useState } from 'react';
import Plot from './loadableplot';
import {styledButton,} from './hmc.module.css'



const Hmc = (props) => {
  const [count, setCount] = useState(15);
  const xvals = Array.from({length: 1000}, (_, index) => index).map((x) => (x / 1000 * 12) - 6),
  yvals = xvals.map((x) => (1/(Math.sqrt(2*Math.PI)))*(1/5*Math.exp(-0.5*(x)**2) + 4/5*Math.exp(-0.5*(x - 3)**2)));
  const approximateFunction = (x, s, sigma) => s.map( (x2) => ((1/(sigma*Math.sqrt(2*Math.PI)))*Math.exp(-0.5*((x - x2)/sigma)**2)) )
  const plotLayout = {
    xaxis: {
      range: [-6, 6],
      dtick: 1
    },
    yaxis: {
      range: [0, 0.4]
    }
  };
  const plotLayout2 = {
    xaxis: {
      range: [0, Math.max(1,count)]
    },
    yaxis: {
      range: [-4, 7]
    }
  };
  return (
    <div>
      <p>Acceptance ratio: {100*props.samples.length/1000.0}%</p>
      <Plot data={[
        {type: "histogram", 
        x: props.samples.slice(0,count),
        histnorm: "probability density",
        name: "Histogram of samples"}, 
        
        {type: "scattergl", 
        x: xvals, 
        y: yvals,
        name: "True function"},

        {type: "scattergl", 
        x: xvals, 
        y: count !== 0 && props.samples.length !== 0 ? xvals.map( (x) => approximateFunction(x, props.samples.slice(0,count), 0.35).reduce((x2,x3) => x2+x3) / count) : [],
        name: "Approximated function"}
      ]} layout={plotLayout} /> 
    
    

      <p>Add or remove samples to the graphs.</p>
      <button onClick={() => setCount(count+1)} disabled={count>=props.samples.length} className={styledButton}>Add 1</button>
      <button onClick={() => setCount(count+10)} disabled={count+10>=props.samples.length} className={styledButton}>Add 10</button>
      <button onClick={() => setCount(count+100)} disabled={count+100>=props.samples.length} className={styledButton}>Add 100</button>
      <p></p>
      <button onClick={() => setCount(count-1)} disabled={count<1} className={styledButton}>Remove 1</button>
      <button onClick={() => setCount(count-10)} disabled={count<10} className={styledButton}>Remove 10</button>
      <button onClick={() => setCount(count-100)} disabled={count<100} className={styledButton}>Remove 100</button>
      
      <Plot data={[
        {type: "scatter", 
        x: Array.from({length: count}, (_, index) => index),
        y: props.samples.slice(0,count)}, 
      ]} layout={plotLayout2}/> 
    </div>
  )
}

export default Hmc