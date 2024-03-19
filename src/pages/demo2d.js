import React from 'react'
import Layout from '../components/layout'
import Seo from '../components/seo'
import Hmc2d from '../components/hmc2d';
import hmc2d from '../utils/hmc2d';


const Demo2d = () => {
    const [initialPosX, setInitialPosX] = React.useState(-8.0),
    [initialPosY, setInitialPosY] = React.useState(8.0),
    [lfSteps, setLfSteps] = React.useState(50),
    [lfStepSize, setLfStepSize] = React.useState(20.0);
  //const target = (x) => Math.log(Math.exp(-0.5*x[0]**2.0)*Math.exp(-0.5*x[1]**2.0));
  const target = (x) => -20*(Math.sqrt(x[0]**2 + x[1]**2)-10)**2;
  return (
    <Layout pageTitle="2D Hamiltonian Monte Carlo demo">
      <p>Sampling a circular density function using Hamiltonian Monte Carlo.</p>
      <form onSubmit={(event) => event.preventDefault()}>

        Initial position: {initialPosX}, {initialPosY} <br />
        -10<input type="range" min={-10} max={10} value={initialPosX} onChange={(event) => setInitialPosX(event.target.value)} /> 10 <br />
        -10<input type="range" min={-10} max={10} value={initialPosY} onChange={(event) => setInitialPosY(event.target.value)} />10 <br />
        <p></p>
        Leapfrog steps: {lfSteps} <br />
        1<input type="range" min={1} max={100} value={lfSteps} onChange={(event) => setLfSteps(event.target.value)} />100 <br />
        <p></p>
        Leapfrog step size: {lfStepSize/100.0} <br />
        0.01<input type="range" min={1} max={100} value={lfStepSize} onChange={(event) => setLfStepSize(event.target.value)} />1.0 <br />
      </form>
      <p></p>
      <Hmc2d samples={hmc2d([parseFloat(initialPosX), parseFloat(initialPosY)], 1000, Math.floor(parseFloat(lfSteps)), parseFloat(lfStepSize)/100.0, target)}></Hmc2d>
    </Layout>
  )
}

export const Head = () => <Seo title="2-dimensional" />

export default Demo2d