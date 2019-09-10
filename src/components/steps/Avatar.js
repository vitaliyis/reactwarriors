import React from "react"

const Avatar = props => {
  const {values, errors, onChangeAvatar} = props

  let getErrorForBorderAvatar = error => {
    let str = 'custom-file-label'
    if (error) {
      str += ' error-border'
    }
    return str
  }
  return (
    <div>
      <img src={values.avatar} alt="" className="w-100"/>
      <div className="custom-file mt-3">
        <input
          type="file"
          className="custom-file-input"
          id="avatar"
          name="avatar"
          placeholder="avatar"
          onChange={onChangeAvatar}
        />
        <label
          className={getErrorForBorderAvatar(errors.avatar)}
          htmlFor="avatar"
        >Choose avatar</label>
        {errors.avatar ? <div className="invalid-feedback">{errors.avatar}</div> : null}
      </div>
    </div>
  )
}

export default Avatar