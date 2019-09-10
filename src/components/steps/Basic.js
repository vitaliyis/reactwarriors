import React from "react"
import Field from "../Field"

const Basic = props => {
  const {values, errors, onChange, getErrorForBorder} = props
  return (
    <div>
      <Field
        id="firstname"
        labelText="Firstname"
        type="text"
        placeholder="Enter firstname"
        name="firstname"
        value={values.firstname}
        onChange={onChange}
        error={errors.firstname}
        getErrorForBorder={getErrorForBorder}
      />
      <Field
        id="lastname"
        labelText="Lastname"
        type="text"
        placeholder="Enter lastname"
        name="lastname"
        value={values.lastname}
        onChange={onChange}
        error={errors.lastname}
        getErrorForBorder={getErrorForBorder}
      />
      <Field
        id="password"
        labelText="Password"
        type="password"
        placeholder="Enter password"
        name="password"
        value={values.password}
        onChange={onChange}
        error={errors.password}
        getErrorForBorder={getErrorForBorder}
      />
      <Field
        id="repeatPassword"
        labelText="Repeat password"
        type="password"
        placeholder="Enter repeat password"
        name="repeatPassword"
        value={values.repeatPassword}
        onChange={onChange}
        error={errors.repeatPassword}
        getErrorForBorder={getErrorForBorder}
      />
      <fieldset className="form-group">
        <div>Gender</div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            id="male"
            name="gender"
            value="male"
            checked={values.gender === "male"}
            onChange={onChange}
          />
          <label className="form-check-label" htmlFor="male">
            Male
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            id="female"
            name="gender"
            value="female"
            checked={values.gender === "female"}
            onChange={onChange}
          />
          <label className="form-check-label" htmlFor="female">
            Female
          </label>
        </div>
      </fieldset>
    </div>

  )
}

export default Basic