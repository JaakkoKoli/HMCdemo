import * as React from 'react'
import Layout from '../components/layout'
import Seo from '../components/seo'
import Hmc from '../components/hmc'
import hmc from '../utils/hmc'

const IndexPage = () => {
  const [initialPos, setInitialPos] = React.useState(0.0),
  [lfSteps, setLfSteps] = React.useState(20),
  [lfStepSize, setLfStepSize] = React.useState(0.1);
  const setter = (event, setFunc) => {
    if(!isNaN(event.target.value)){
      if(event.target.value > 0){
        setFunc(event.target.value);
      }
    }
  }

  return (
    <Layout pageTitle="Hamiltonian Monte Carlo demo">
      <p>Sampling a mixture of two Gaussian distributions using Hamiltonian Monte Carlo.</p>
      <form onSubmit={(event) => event.preventDefault()}>
        Initial position <input type="text" value={initialPos} onChange={(event) => setter(event, setInitialPos)} /><p></p>
        Leapfrog steps <input type="text" value={lfSteps} onChange={(event) => setter(event, setLfSteps)} /><p></p>
        Leapfrog step size <input type="text" value={lfStepSize} onChange={(event) => setter(event, setLfStepSize)} /><p></p>
      </form>
      <p></p>
      <Hmc samples={hmc(parseFloat(initialPos), 10000, Math.floor(parseFloat(lfSteps)), parseFloat(lfStepSize), (x) => Math.log(1/5*Math.exp(-0.5*(x)**2) + 4/5*Math.exp(-0.5*(x - 3)**2)))}></Hmc>
    </Layout>
  )
}

export const Head = () => <Seo title="1-dimensional" />
export default IndexPage