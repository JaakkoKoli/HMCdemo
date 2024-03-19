import React, { useState } from 'react';
import Plot from './loadableplot';
import {styledButton,} from './hmc.module.css'


const Hmc2d = (props) => {
  const [count, setCount] = useState(0);

  const plotLayout = {
    xaxis: {
      range: [-12, 12],
    },
    yaxis: {
      range: [-12, 12]
    }
  };
  const plotLayout2 = {
    xaxis: {
      range: [0, Math.max(1,count)]
    },
    yaxis: {
      range: [-13, 13]
    }
  };
  return (
    <div>
    <p>Acceptance ratio: {100*props.samples.length/10000.0}%</p>
      <Plot data={[
        {type: "scatter", 
        x: props.samples.slice(0,count).map((x) => x[0]),
        y: props.samples.slice(0,count).map((x) => x[1]),
        name: "Sampling path"}
      ]} layout={plotLayout} /> 
    
    <Plot data={[
        {type: "scatter", 
        x: props.samples.slice(0,count).map((x) => x[0]),
        y: props.samples.slice(0,count).map((x) => x[1]),
        mode: "markers",
        name: "Samples"}
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
        y: props.samples.slice(0,count).map((x) => x[0]),
        name: "x"}, 

        {type: "scatter", 
        x: Array.from({length: count}, (_, index) => index),
        y: props.samples.slice(0,count).map((x) => x[1]),
        name: "y"}, 
      ]} layout={plotLayout2}/> 
    </div>
  )
}

export default Hmc2d