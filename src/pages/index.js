import * as React from 'react'
import Layout from '../components/layout'
import Seo from '../components/seo'
import Hmc from '../components/hmc'
import hmc from '../utils/hmc'

const IndexPage = () => {
  // initialise states for HMC parameters
  const [initialPos, setInitialPos] = React.useState(0.0),
  [lfSteps, setLfSteps] = React.useState(20),
  [lfStepSize, setLfStepSize] = React.useState(10.0);

  return (
    <Layout pageTitle="Hamiltonian Monte Carlo demo">
      <p>Sampling a mixture of two Gaussian distributions using Hamiltonian Monte Carlo.</p>
      <form onSubmit={(event) => event.preventDefault()}>
        
      Initial position: {initialPos} <br />
        -4<input type="range" min={-4} max={4} value={initialPos} onChange={(event) => setInitialPos(event.target.value)} /> 4 <br />
        <p></p>
        Leapfrog steps: {lfSteps} <br />
        1<input type="range" min={1} max={100} value={lfSteps} onChange={(event) => setLfSteps(event.target.value)} />100 <br />
        <p></p>
        Leapfrog step size: {lfStepSize/100.0} <br />
        0.01<input type="range" min={1} max={100} value={lfStepSize} onChange={(event) => setLfStepSize(event.target.value)} />1.0 <br />
      </form>
      <p></p>
      <Hmc samples={hmc(parseFloat(initialPos), 1000, Math.floor(parseFloat(lfSteps)), parseFloat(lfStepSize)/100.0, (x) => Math.log(1/5*Math.exp(-0.5*(x)**2) + 4/5*Math.exp(-0.5*(x - 3)**2)))}></Hmc>
    </Layout>
  )
}

export const Head = () => <Seo title="1-dimensional" />
export default IndexPage