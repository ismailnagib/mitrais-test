import React from 'react';
import Axios from 'axios';
import config from './config';
import './app.css';

class App extends React.Component {
  state = {
    mobileNumber: '',
    mobileNumberError: '',
    firstName: '',
    firstNameError: '',
    lastName: '',
    lastNameError: '',
    gender: '',
    email: '',
    emailError: '',
    month: '',
    date: '',
    year: '',
    infoErrorStyle: {
      marginTop: '10px',
      background: 'red'
    },
    disableRegisterForm: false,
    registerError: '',
    loginError: '',
    loginPage: false,
    loggedIn: false,
  }

  changeInputValue = (field, event, validate, cb) => {
    if (typeof event.target.value === 'string') event.target.value = event.target.value.trimLeft();
    const valid = validate ? validate(event.target.value) : true;

    if (valid && this.state[field] !== event.target.value) {
      this.setState({
        [field]: event.target.value
      }, cb);
    }
  }

  validateMobileNumber = (number) => {
    if (number.trimRight().length !== number.length) return false;
    if (number.length > 0 && isNaN(number[0] * 1)) return false;
    if (isNaN(number * 1)) return false;
    return true;
  }

  registerUser = async () => {
    let newState = {};
    let isError = false;
    let mobileNumber = this.state.mobileNumber > 1 ? String(this.state.mobileNumber * 1) : '';

    if (mobileNumber.length < 1) {
      newState.mobileNumberError = 'Mobile number is required';
    } else {
      if (mobileNumber.slice(0, 2) === '62') mobileNumber = mobileNumber.slice(2);
      if (mobileNumber[0] !== '8' || mobileNumber.length < 9) {
        isError = true;
        newState.mobileNumberError = 'Please enter a valid Indonesian mobile number';
      } else {
        newState.mobileNumberError = '';
      }
    }

    if (this.state.firstName.length < 1) {
      isError = true;
      newState.firstNameError = 'First name is required';
    } else {
      newState.firstNameError = '';
    }

    if (this.state.lastName.length < 1) {
      isError = true;
      newState.lastNameError = 'Last name is required';
    } else {
      newState.lastNameError = '';
    }

    if (this.state.email.length < 1) {
      isError = true;
      newState.emailError = 'Email is required';
    } else {
      newState.emailError = '';
    }

    if (isError) {
      newState.disableRegisterForm = false;
      this.setState(newState);
      return null;
    }

    let data = {
      success: false,
      message: ''
    }

    const parameter = {
      mobileNumber: this.state.mobileNumber,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      dateOfBirth: this.state.year.length > 0 && this.state.month.length > 0 && this.state.date.length > 0
        ? this.state.year + '-' + this.state.month + '-' + this.state.date
        : null,
      gender: this.state.gender.length > 0 ? this.state.gender : null,
      email: this.state.email,
    }

    await Axios.request({
      url: `${config.baseUrl}/register`,
      method: 'POST',
      data: parameter,
    })
      .then(response => {
        data = response.data;
      })
      .catch(error => {
        data = error.response.data;
      });

    if (!data.success) {
      newState.registerError = data.message;
      newState.disableRegisterForm = false;
    } else {
      newState = {
        ...newState,
        mobileNumber: '',
        firstName: '',
        lastName: '',
        gender: '',
        email: '',
        month: '',
        date: '',
        year: '',
        registerError: '',
      }
    }

    this.setState(newState);
  }

  loginPage = () => {
    this.setState({
      loginPage: true,
    })
  }

  login = async () => {
    let isError = false;
    let newState = {};
    let mobileNumber = this.state.mobileNumber > 1 ? String(this.state.mobileNumber * 1) : '';

    if (mobileNumber.length < 1) {
      newState.mobileNumberError = 'Mobile number is required';
    } else {
      if (mobileNumber.slice(0, 2) === '62') mobileNumber = mobileNumber.slice(2);
      if (mobileNumber[0] !== '8' || mobileNumber.length < 9) {
        isError = true;
        newState.mobileNumberError = 'Please enter a valid Indonesian mobile number';
      } else {
        newState.mobileNumberError = '';
      }
    }

    if (this.state.email.length < 1) {
      isError = true;
      newState.emailError = 'Email is required';
    } else {
      newState.emailError = '';
    }

    if (isError) {
      newState.loggedIn = false;
      this.setState(newState);
      return null;
    }

    let data = {
      success: false,
      message: ''
    }

    const parameter = {
      mobileNumber: this.state.mobileNumber,
      email: this.state.email,
    }

    await Axios.request({
      url: `${config.baseUrl}/login`,
      method: 'POST',
      data: parameter,
    })
      .then(response => {
        data = response.data;
      })
      .catch(error => {
        data = error.response.data;
      });

    if (!data.success) {
      newState.loginError = data.message;
      newState.loggedIn = false;
    } else {
      newState = {
        ...newState,
        mobileNumber: '',
        email: '',
        loginError: '',
        loggedIn: true,
      }
    }

    this.setState(newState);
  }

  render() {
    return (
      <div id="app">
        <div id="content-wrapper">
          <div id="content">
            {
              !this.state.loginPage && !this.state.loggedIn && <div id="registration-form" className={this.state.disableRegisterForm ? 'disabled' : ''}>
                <div id="registration-form-title">
                  <h2>Registration</h2>
                </div>
                <div id="user-info">
                  <div
                    className="user-info-error"
                    style={this.state.mobileNumberError.length > 0 ? this.state.infoErrorStyle : {}}
                  >
                    <p>{this.state.mobileNumberError}</p>
                  </div>
                  <input
                    id="mobileNumber"
                    type="text"
                    placeholder="Mobile number"
                    value={this.state.mobileNumber}
                    onChange={(event) => { this.changeInputValue('mobileNumber', event, this.validateMobileNumber) }}
                  />
                  <div
                    className="user-info-error"
                    style={this.state.firstNameError.length > 0 ? this.state.infoErrorStyle : {}}
                  >
                    <p>{this.state.firstNameError}</p>
                  </div>
                  <input
                    id="firstName"
                    type="text"
                    placeholder="First name"
                    value={this.state.firstName}
                    onChange={(event) => { this.changeInputValue('firstName', event) }}
                  />
                  <div
                    className="user-info-error"
                    style={this.state.lastNameError.length > 0 ? this.state.infoErrorStyle : {}}
                  >
                    <p>{this.state.lastNameError}</p>
                  </div>
                  <input
                    id="lastName"
                    type="text"
                    placeholder="Last name"
                    value={this.state.lastName}
                    onChange={(event) => { this.changeInputValue('lastName', event) }}
                  />
                  <div id="date">
                    <p>Date of Birth</p>
                    <input
                      type="number"
                      min="1"
                      max="12"
                      value={this.state.month}
                      placeholder="Month"
                      onChange={(event) => { this.changeInputValue('month', event, (value) => value === '' || (value >= 1 && value <= 12)) }}
                    />
                    <input
                      type="number"
                      min="1"
                      max="31"
                      value={this.state.date}
                      placeholder="Date"
                      onChange={(event) => { this.changeInputValue('date', event, (value) => value === '' || (value >= 1 && value <= 31)) }}
                    />
                    <input
                      type="number"
                      min="0"
                      max={new Date().getFullYear()}
                      value={this.state.year}
                      placeholder="Year"
                      onChange={(event) => { this.changeInputValue('year', event, (value) => value === '' || (value >= 0 && value <= new Date().getFullYear())) }}
                    />
                  </div>
                  <div id='gender-radio'>
                    <input
                      type="radio"
                      value="MALE"
                      checked={this.state.gender === "MALE"}
                      onChange={(event) => { this.changeInputValue('gender', event) }}
                    />
                    <span>Male</span>
                    <input
                      type="radio"
                      value="FEMALE"
                      checked={this.state.gender === "FEMALE"}
                      onChange={(event) => { this.changeInputValue('gender', event) }}
                    />
                    <span>Female</span>
                  </div>
                  <div
                    className="user-info-error"
                    style={this.state.emailError.length > 0 ? this.state.infoErrorStyle : {}}
                  >
                    <p>{this.state.emailError}</p>
                  </div>
                  <input
                    id="email"
                    type="text"
                    placeholder="Email"
                    value={this.state.email}
                    onChange={(event) => { this.changeInputValue('email', event) }}
                  />
                </div>
                <div
                  className="user-info-error"
                  style={this.state.registerError.length > 0 ? this.state.infoErrorStyle : {}}
                >
                  <p>{this.state.registerError}</p>
                </div>
                <button id="register-btn" onClick={() => { this.setState({ disableRegisterForm: true }, this.registerUser) }} >
                  Register
                </button>
              </div>
            }
            {
              !this.state.loginPage && !this.state.loggedIn && this.state.disableRegisterForm && <div id="login-page-btn-wrapper">
                <button id="login-page-btn" onClick={() => { this.loginPage() }} >
                  Login
                </button>
              </div>
            }
            {
              this.state.loginPage && !this.state.loggedIn && <div id="login-form">
                <div id="login-form-title">
                  <h2>Login</h2>
                </div>
                <div id="user-info">
                  <div
                    className="user-info-error"
                    style={this.state.mobileNumberError.length > 0 ? this.state.infoErrorStyle : {}}
                  >
                    <p>{this.state.mobileNumberError}</p>
                  </div>
                  <input
                    id="mobileNumber"
                    type="text"
                    placeholder="Mobile number"
                    value={this.state.mobileNumber}
                    onChange={(event) => { this.changeInputValue('mobileNumber', event, this.validateMobileNumber) }}
                  />
                  <div
                    className="user-info-error"
                    style={this.state.emailError.length > 0 ? this.state.infoErrorStyle : {}}
                  >
                    <p>{this.state.emailError}</p>
                  </div>
                  <input
                    id="email"
                    type="text"
                    placeholder="Email"
                    value={this.state.email}
                    onChange={(event) => { this.changeInputValue('email', event) }}
                  />
                </div>
                <div
                  className="user-info-error"
                  style={this.state.loginError.length > 0 ? this.state.infoErrorStyle : {}}
                >
                  <p>{this.state.loginError}</p>
                </div>
                <button id="login-btn" onClick={() => { this.login() }} >
                  Login
                </button>
              </div>
            }
            {
              this.state.loggedIn && <div id="logged-in"><h1>Logged In</h1></div>
            }
          </div>
        </div>
      </div>
    )
  } 
}

export default App;
