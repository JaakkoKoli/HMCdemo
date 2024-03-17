function leapfrog(position, momentum, steps, step_size, target_log_prob){
    let current_momentum = momentum,
    current_position = position;
    let grad = [0.0, 0.0];
    for(let i=0;i<steps;i++){
      grad = estimateGradient(target_log_prob, current_position).map((x) => x*step_size*0.5);
      current_momentum = [current_momentum[0] + grad[0], current_momentum[1] + grad[1]];

      current_position = [current_position[0] + step_size * current_momentum[0], current_position[1] + step_size * current_momentum[1]];

      grad = estimateGradient(target_log_prob, current_position).map((x) => x*step_size*0.5);
      current_momentum = [current_momentum[0] + grad[0], current_momentum[1] + grad[1]];
    }
    return([current_position, current_momentum])
  }
  
  // Box-Muller transform
  function gaussianRandom(mean=0, stdev=1) {
    const u = 1 - Math.random();
    const v = Math.random();
    const z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    return z * stdev + mean;
  }
  
  function targetLogP(x){
    return((-0.5*x[0]**2.0-0.5*x[1]**2.0)*0.5)
  }
  
  function estimateGradient(f, x, e=[0.00001, 0.00001]){
    return([
        ((f([x[0], x[1]]) - f([x[0]-e[0], x[1]]))/e[0] + (f([x[0]+e[0], x[1]]) - f([x[0], x[1]]))/e[0])/2.0,
        ((f([x[0], x[1]]) - f([x[0], x[1]-e[1]]))/e[0] + (f([x[0], x[1]+e[1]]) - f([x[0], x[1]]))/e[0])/2.0
    ])
  }
  
  function evaluateHamiltonian(position, momentum, targetLogP){
    let potential_energy = -targetLogP(position),
    kinetic_energy = 0.5 * momentum[0]**2.0 + 0.5 * momentum[1]**2.0;
    return(potential_energy + kinetic_energy)
  }
  
  function hmc2d(initial_position=[0.0, 0.0], num_samples=1000, leapfrog_steps=10, step_size=0.1, target_log_prob=targetLogP){
    let samples = [];
    let current_position = initial_position;

    for(let i=0;i<num_samples;i++){
      let momentum = [gaussianRandom(), gaussianRandom()],
      current_momentum = momentum;
  
      let lf = leapfrog(current_position, current_momentum, leapfrog_steps, step_size, target_log_prob);
      let new_position = lf[0], 
      new_momentum = lf[1];
  
      let current_hamiltonian = evaluateHamiltonian(current_position, current_momentum, target_log_prob),
      proposed_hamiltonian = evaluateHamiltonian(new_position, new_momentum, target_log_prob);
  
      let acceptance_ratio = proposed_hamiltonian - current_hamiltonian;
  
      if(Math.log(Math.random()) < -acceptance_ratio){
        samples.push(new_position);
        current_position = new_position;
      }
    }
  
    return(samples)
  }

  export default hmc2d