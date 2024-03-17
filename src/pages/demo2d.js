import * as React from 'react'
import Layout from '../components/layout'
import Seo from '../components/seo'
import Hmc2d from '../components/hmc2d';
import hmc2d from '../utils/hmc2d';


const Demo2d = () => {
    const [initialPosX, setInitialPosX] = React.useState(0.0),
    [initialPosY, setInitialPosY] = React.useState(0.0),
    [lfSteps, setLfSteps] = React.useState(50),
    [lfStepSize, setLfStepSize] = React.useState(0.2);
    const setter = (event, setFunc) => {
      if(!isNaN(event.target.value)){
      if(event.target.value > 0){
        setFunc(event.target.value);
      }
    }
  }
  const target = (x) => Math.log(Math.exp(-0.5*x[0]**2.0)*Math.exp(-0.5*x[1]**2.0));
  const target2 = (x) => -20*(Math.sqrt(x[0]**2 + x[1]**2)-10)**2;
  return (
    <Layout pageTitle="2D Hamiltonian Monte Carlo demo">
      <p>Sampling a circular density function using Hamiltonian Monte Carlo.</p>
      <form onSubmit={(event) => event.preventDefault()}>
        Initial position <input type="text" value={initialPosX} onChange={(event) => setter(event, setInitialPosX)} /><input type="text" value={initialPosY} onChange={(event) => setter(event, setInitialPosY)} /><p></p>
        Leapfrog steps <input type="text" value={lfSteps} onChange={(event) => setter(event, setLfSteps)} /><p></p>
        Leapfrog step size <input type="text" value={lfStepSize} onChange={(event) => setter(event, setLfStepSize)} /><p></p>
      </form>
      <p></p>
      <Hmc2d samples={hmc2d([parseFloat(initialPosX), parseFloat(initialPosY)], 10000, Math.floor(parseFloat(lfSteps)), parseFloat(lfStepSize), target2)}></Hmc2d>
    </Layout>
  )
}

export const Head = () => <Seo title="2-dimensional" />

export default Demo2d