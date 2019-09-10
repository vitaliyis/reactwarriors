import React from "react";
import Basic from "./steps/Basic"
import Contacts from "./steps/Contacts"
import Avatar from "./steps/Avatar"
import Steps from "./Steps"
import Finish from "./steps/Finish";


export default class App extends React.Component {
  constructor() {
    super()

    this.state = {
      stepActive: 0,
      steps: [
        {
          name: 'Basic',
          isActive: true,
          isCompleted: false
        },
        {
          name: 'Contacts',
          isActive: false,
          isCompleted: false
        },
        {
          name: 'Avatar',
          isActive: false,
          isCompleted: false
        }
        ,
        {
          name: 'Finish',
          isActive: false
        }
      ],
      values: {
        firstname: "",
        lastname: "",
        password: "",
        repeatPassword: "",
        gender: "male",
        email: "",
        mobile: "",
        country: "1",
        city: "",
        avatar: ""
      },
      errors: {
        firstname: false,
        lastname: false,
        password: false,
        repeatPassword: false,
        email: false,
        mobile: false,
        avatar: false
      }
    }
  }

  onChange = event => {
    this.setState({
      values: {...this.state.values, [event.target.name] : event.target.value},
      errors: {...this.state.errors, [event.target.name] : false}
    })
  }

  onChangeAvatar = event => {
    const reader = new FileReader()
    reader.onload = event => {
      this.setState({
        values: {...this.state.values, avatar: event.target.result},
        errors: {...this.state.errors, avatar : false}
      })
      console.log('this.state.values.avatar', this.state.values.avatar)
    }

    reader.readAsDataURL(event.target.files[0])
  }

  getErrorForBorder = error => {
    let str = 'form-control'
    if (error) {
      str += ' error-border'
    }
    return str
  }

  onNext = event => {
    event.preventDefault();
    const errors = {}

    switch (this.state.stepActive) {
      case 0:
        if (this.state.values.firstname.length < 5) {
          errors.firstname = "Must be 5 characters or more"
        }

        if (this.state.values.lastname.length < 5) {
          errors.lastname = "Must be 5 characters or more"
        }

        if (this.state.values.password.length < 6) {
          errors.password = "Must be 6 characters or more"
        }

        if (this.state.values.password !==  this.state.values.repeatPassword) {
          errors.repeatPassword = "Must be equal password"
        }
        break;
      case 1:
        if (!this.state.values.email) {
          errors.email = "Required"
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(this.state.values.email)){
          errors.email = "Invalid email address";
        }

        if (!/^[(]{0,1}[0-9]{3}[)]{0,1}[-\s]{0,1}[0-9]{3}[-\s]{0,1}[0-9]{4}$/i.test(this.state.values.mobile)) {
          errors.mobile = "Invalid mobile";
        }

        if (!this.state.values.city) {
          errors.city = "Required";
        }
        break;
      case 2:
        if (!this.state.values.avatar) {
          errors.avatar = 'Required'
        } 
        break;
      default:
        break;
    }

    console.log("submit", this.state)

    if (Object.keys(errors).length > 0) {
      this.setState({
        errors: errors
      })
    } else {    // если ошибок нет
      let newSteps = [...this.state.steps]
      let stepActive = 0;
      for (let i = 0; i < this.state.steps.length; i++) {
        if (this.state.steps[i].isActive) {
          newSteps[i].isActive = false;
          newSteps[i].isCompleted = true;
          newSteps[i + 1].isActive = true;
          stepActive = i + 1
          break;
        }
      }
      this.setState({
        errors: {},
        steps: newSteps,
        stepActive: stepActive
      })
    }
  }

  onPrev = () => {
    let newSteps = [...this.state.steps]
    let stepActive;
    for (let i = 1; i < this.state.steps.length; i++) {
      if (this.state.steps[i].isActive) {
        newSteps[i].isActive = false;
        newSteps[i - 1].isActive = true;
        stepActive = i - 1
        break;
      }
    }
    this.setState({
      steps: newSteps,
      stepActive: stepActive
    })
  }

  onReset = () => {
    let newSteps = [...this.state.steps]
    for (let i = 0; i < this.state.steps.length; i++) {
      if (i === 0) {
        newSteps[i].isActive = true;
        newSteps[i].isCompleted = false;
      } else {
        newSteps[i].isActive = false;
        newSteps[i].isCompleted = false;
      }
    }
    this.setState({
      values: {
        firstname: "",
        lastname: "",
        password: "",
        repeatPassword: "",
        gender: "male",
        email: "",
        mobile: "",
        country: "1",
        city: "",
        avatar: ""
      },
      steps: newSteps,
      stepActive: 0
    })
  }

  render() {
    return (
      <div className="form-container card">
        <form className="form card-body">
          <Steps
            steps={this.state.steps}
          />
          {this.state.steps[0].isActive && (
              <Basic
                values={this.state.values}
                errors={this.state.errors}
                onChange={this.onChange}
                getErrorForBorder={this.getErrorForBorder}
              />
            )}
          {this.state.steps[1].isActive && (
              <Contacts
                values={this.state.values}
                errors={this.state.errors}
                onChange={this.onChange}
                getErrorForBorder={this.getErrorForBorder}
              />
            )}
          {this.state.steps[2].isActive && (
              <Avatar
                values={this.state.values}
                errors={this.state.errors}
                onChangeAvatar={this.onChangeAvatar}
              />
            )}
          {this.state.steps[3].isActive && (
            <Finish
              values={this.state.values}
            />
          )}

          <div className="text-center mt-3">
            {!this.state.steps[3].isActive ? (
              <div>
                <button
                  type="button"
                  className="btn btn-light mr-3"
                  onClick={this.onPrev}
                  disabled={this.state.stepActive === 0}
                >Previous</button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={this.onNext}
                >Next</button>
              </div>
            ) : (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={this.onReset}
              >Reset</button>
            )}

          </div>

        </form>
      </div>
    );
  }
}
