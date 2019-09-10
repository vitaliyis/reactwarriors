import React from "react"
import Field from "../Field"
import countries from "../../data/countries";
import cities from "../../data/cities";

const Contacts = props => {
  const {values, errors, onChange, getErrorForBorder} = props

  let getOptionsCountries = items => {
    return items.map(country => (
      <option key={country.id} value={country.id}>{country.name}</option>
    ))
  }

  let getOptionsCities = cities => {
    let citiesOneCountry = []
    for (let i in cities){
      if (cities[i].country === Number(values.country)) {
        citiesOneCountry.push(<option key={Number(i)} value={i}>{cities[i].name}</option>)
      }
    }
    return citiesOneCountry
  }

  return (
    <div>
      <Field
        id="email"
        labelText="Email"
        type="text"
        placeholder="Enter email"
        name="email"
        value={values.email}
        onChange={onChange}
        error={errors.email}
        getErrorForBorder={getErrorForBorder}
      />
      <Field
        id="mobile"
        labelText="Mobile"
        type="text"
        placeholder="Enter mobile"
        name="mobile"
        value={values.mobile}
        onChange={onChange}
        error={errors.mobile}
        getErrorForBorder={getErrorForBorder}
      />
      <div className="form-group">
        <label htmlFor="country">Country</label>
        <select
          className="form-control"
          id="country"
          name="country"
          value={values.country}
          onChange={onChange}
        >
          {getOptionsCountries(countries)}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="city">Cities</label>
        <select
          className={getErrorForBorder(errors.city)}
          id="city"
          name="city"
          value={values.city}
          onChange={onChange}
        >
          <option value="">Select city</option>
          {getOptionsCities(cities)}
        </select>
        {errors.city ? <div className="invalid-feedback">{errors.city}</div> : null}
      </div>
    </div>
  )
}

export default Contacts