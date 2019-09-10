import React from "react"

const Steps = props => {
  const {steps} = props

  let getStepClassName = step => {
    let className = 'step';
    if (step.isActive) {
      className += ' is-active'
    }
    if (step.isCompleted) {
      className += ' is-completed'
    }
    return className;
  }

  return (
    <div className="steps mb-4">
      {steps.map((step, i) =>(
        <div key={i} className={getStepClassName(step)}>
          <div className="step__marker">{i + 1}</div>
          <div className="step__title mt-1">{step.name}</div>
        </div>
      ))}
    </div>
  )
}

export default Steps