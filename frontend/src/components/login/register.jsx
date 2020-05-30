import React from "react";
import axios from "axios";

import Cookies from 'js-cookie';
import history from"./history";

function ValidationMessage(props) {
  if (!props.valid) {
    return(
      <div className='error-msg' style={{color:"red"}}>{props.message}</div>
    )
  }
  return null;
}


// export class Register extends React.Component {
  
//   state = {
//     username: '', usernameValid: false,
//     email: '', emailValid: false,
//     password: '', passwordValid: false,
//     passwordConfirm: '', passwordConfirmValid: false,
//     formValid: false,
//     errorMsg: {}
//   }

          // validateForm = () => {
          //   const {firstnameValid,lastnameValid , emailValid, passwordValid, passwordConfirmValid} = this.state;
          //   this.setState({
          //     formValid: firstnameValid && lastnameValid && emailValid && passwordValid && passwordConfirmValid
          //   })
          // }

//   updateFirstname = (firstname) => {
//     this.setState({firstname}, this.validateFirstname)
//   }
//  updateLastname = (lastname) => {
//     this.setState({lastname}, this.validateLastname)
//   }

            // validateFirstname = () => {
            //   const {firstname} = this.state;
            //   let firstnameValid = true;
            //   let errorMsg = {...this.state.errorMsg}

            //   if (firstname.length < 3) {
            //     firstnameValid = false;
            //     errorMsg.firstname = 'Must be at least 3 characters long'
            //   }

            //   this.setState({firstnameValid, errorMsg}, this.validateForm)
            // }
//    validateLastname = () => {
//     const {lastname} = this.state;
//     let lastnameValid = true;
//     let errorMsg = {...this.state.errorMsg}

//     if (lastname.length < 3) {
//       lastnameValid = false;
//       errorMsg.lastname = 'Must be at least 3 characters long'
//     }

//     this.setState({lastnameValid, errorMsg}, this.validateForm)
//   }

//    updateEmail = (email) => {
//     this.setState({email}, this.validateEmail)
//   }

//   validateEmail = () => {
//     const {email} = this.state;
//     let emailValid = true;
//     let errorMsg = {...this.state.errorMsg}

//     // checks for format _@_._
//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
//       emailValid = false;
//       errorMsg.email = 'Invalid email format'
//     }

//     this.setState({emailValid, errorMsg}, this.validateForm)
//   }

//   updatePassword = (password) => {
//     this.setState({password}, this.validatePassword);
//   }

//   validatePassword = () => {
//     const {password} = this.state;
//     let passwordValid = true;
//     let errorMsg = {...this.state.errorMsg}

//     // must be 6 charsclass App extends React.Component {
  // state = { 
  //   firstName: '' ,
  //   LastName: '' ,
  //   phoneName: '' ,
  //   email: '' ,
  //   password: '', 
  //   confirmPassword: '' 
  // };
  
  
  // handleSubmit = async (event) => {
  //   event.preventDefault();
  //   // const resp = await axios.get(`https://www.google.com/search?q=${this.state.companyName}`);
  //   // this.props.onSubmit(resp.data);
  //   this.setState({ 
  //     firstName: '' ,
  //     LastName: '' ,
  //     phoneName: '' ,
  //     email: '' ,
  //     password: '', 
  //     confirmPassword: '' 
  //   });
  // };
//     // must contain a number
//     // must contain a special character

//     if (password.length < 6) {
//       passwordValid = false;
//       errorMsg.password = 'Password must be at least 6 characters long';
//     } else if (!/\d/.test(password)){
//       passwordValid = false;
//       errorMsg.password = 'Password must contain a digit';
//     } else if (!/[!@#$%^&*]/.test(password)){
//       passwordValid = false;
//       errorMsg.password = 'Password must contain special character: !@#$%^&*';
//     }

//     this.setState({passwordValid, errorMsg}, this.validateForm);
//   }
//   updatePhone = (phone) => {
//     this.setState({phone}, this.validatePhone);
//   }

//   validatePhone = () => {
//     const {phone} = this.state;
//     let phoneValid = true;
//     let errorMsg = {...this.state.errorMsg}

//     // must be 10 chars
//     // must be a number
//     // must no contain a special character

    
//      if (!/\d/.test(phone)){
//       phoneValid = false;
//       errorMsg.phone = 'Phonenumber must not contain a letter';
//     } else if (/[!@.#$%^&*]/.test(phone)){
//       phoneValid = false;
//       errorMsg.phone = 'Phonenumber must not contain special character: !@#$%^&*';
//     }
//     else if (phone.length > 10) {
//       phoneValid = false;
//       errorMsg.phone = 'Phonenumber Must have 10 digits only';
//     } else if (!/\d/.test(phone)){
//       phoneValid = false;
//       errorMsg.phone = 'Phonenumber must not contain a letter';
//     }

//     this.setState({phoneValid, errorMsg}, this.validateForm);
//   }

//   updatePasswordConfirm = (passwordConfirm) => {
//     this.setState({passwordConfirm}, this.validatePasswordConfirm)
//   }

//   validatePasswordConfirm = () => {
//     const {passwordConfirm, password} = this.state;
//     let passwordConfirmValid = true;
//     let errorMsg = {...this.state.errorMsg}

//     if (password !== passwordConfirm) {
//       passwordConfirmValid = false;
//       errorMsg.passwordConfirm = 'Passwords do not match'
//     }

//     this.setState({passwordConfirmValid, errorMsg}, this.validateForm);
//   }
  
export class Register extends React.Component {
  state = { 
    firstname: '' ,
    lastname: '' ,
    phone: '' ,
    email: '' ,
    password: '', 
    passwordConfirm: '',
    firstnameValid:false,
    lastnameValid:false,
    emailValid:false,
    passwordValid:false,
    passwordConfirmValid:false,
    formValid: false,
    errorMsg:{}
  };
  
  updateFirstName=(firstname) =>{
    this.setState({ firstname: firstname })
    this.validateFirstname(firstname)
  }
  updateLastName=(lastname) =>{
    this.setState({ lastname: lastname })
    this.validateLastname(lastname)
  }
  updatePhone=(phone) =>{
    this.setState({ phone: phone })
    this.validatePhone(phone)
  }
  // This is the old code pasted form top //


  validateForm = () => {
    const {firstnameValid,lastnameValid , emailValid, passwordValid, passwordConfirmValid} = this.state;
    this.setState({
      formValid: firstnameValid && lastnameValid && emailValid && passwordValid && passwordConfirmValid
    })
  }
  validateFirstname = (firstname) => {
    // const {firstname} = this.state;
    let firstnameValid = true;
    let errorMsg = {...this.state.errorMsg}

    if (firstname.length < 3) {
      firstnameValid = false;
      errorMsg.firstname = 'choose atleast 3 characters long'
    }

    this.setState({firstnameValid, errorMsg}, this.validateForm)
  }
  validateLastname = (lastname) => {
    // const {firstname} = this.state;
    let lastnameValid = true;
    let errorMsg = {...this.state.errorMsg}

    if (lastname.length < 3) {
      lastnameValid = false;
      errorMsg.lastname = 'choose atleast 3 characters long'
    }
    this.setState({lastnameValid, errorMsg}, this.validateForm)
  }
 validatePhone = (phone) => {
    // const {firstname} = this.state;
    let phoneValid = true;
    let errorMsg = {...this.state.errorMsg}
    let phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
      if(phone.match(phoneno))
      {
        if (phone.length < 10){
          phoneValid=false;
          errorMsg.phone = 'Missing Phone Number'
        }
      }
      else
      {
         phoneValid  = false;
         errorMsg.phone = 'Not a valid Phone Number'
      }
    this.setState({phoneValid, errorMsg}, this.validateForm)
  }








  
  // <--------------------------------------- This is the old code pasted form top -----------------------------------------------> //


  handleSubmit = async (event) => {
    event.preventDefault();
    // const resp = await axios.get(`https://www.google.com/search?q=${this.state.companyName}`);
    // this.props.onSubmit(resp.data);
    this.setState({ 
      firstname: '' ,
      lastname: '' ,    
      phone: '' ,
      email: '' ,
      password: '', 
      passwordConfirm: '' 
    });
    const headers = {
      'Access-Control-Allow-Origin':'*',
      'Content-Type':'application/json',
  }
  let axiosConfig = {
      withCredentials: true,
    }
    const requestOptions = {
      method: 'POST',
      headers:headers,
      credentials: "include",
      body: JSON.stringify(this.state)
  };
    console.log(this.state)
    // axios.post('http://localhost:5000/register', this.state)
    fetch('http://localhost:5000/register',requestOptions)
    .then(res => res.json())
    .then(res=>{
      // res = res.data
      console.log("profile",res)
      if(res["verified"] === "true"){
        const session_id =res["session-id"]
        console.log("dat",session_id)
        Cookies.set('session', session_id)
        // this.setState({ authenticated:true})
        // history.push('/profile')
        // this.context.history.push('/AI-Economics')
        window.alert("registered succesfully")

        history.push('/profile')
        console.log("registration done!")
        }
        else if(res["verified"] === "false"){
          console.log(res["error"])
          window.alert(res["error"])
          window.alert(res["error"])
        }
        
    })
  };

  render() {
    return (
      <div className="base-container" ref={this.props.containerRef}>
        <div className="header">Register</div>
        <div className="content">
          <div className="form">
          <form onSubmit={this.handleSubmit} action="/Register" method="POST">
            {/* <div className="splitname">
              <label htmlFor="username">First Name</label>
              < ValidationMessage valid={this.state.firstnameValid} message={this.state.errorMsg.firstname} />
              <input type="text" name="firstname" placeholder="UserName" required="true" value={this.state.firstname} onChange={(e) => this.updateFirstname(e.target.value)}/>
            </div> 
                <br/>
              <div className="splitname">
              <label htmlFor="username">Last Name</label>
              < ValidationMessage valid={this.state.lastnameValid} message={this.state.errorMsg.lastname} />
              <input type="text" name="lastname" placeholder="UserName" required="true" value={this.state.lastname} onChange={(e) => this.updateLastname(e.target.value)}/>
            </div> 
                <br/>
                <div className="form-group">
              <label htmlFor="email">E-Mail</label>
              < ValidationMessage valid={this.state.emailValid} message={this.state.errorMsg.email} />
              <input type="text" name="e-mail" placeholder="E-Mail" value={this.state.email} onChange={(e) => this.updateEmail(e.target.value)} />
            </div> 
                <br/>
                <div className="form-group">
              <label htmlFor="phone">Phone-Number</label>
               < ValidationMessage valid={this.state.phoneValid} message={this.state.errorMsg.phone} />
              <input type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" name="phone" placeholder="Phone-Number" onChange={(e) => this.updatePhone(e.target.value)} /> 
            </div> 
                <br/>  
                <div className="form-group">
              <label htmlFor="password">Password</label>
               < ValidationMessage valid={this.state.passwordValid} message={this.state.errorMsg.password} />
              <input type="password" name="password" placeholder="password" value={this.state.password} onChange={(e) => this.updatePassword(e.target.value)} />
            </div>
                <br/>
                 <div className="form-group">
              <label htmlFor="password-confirmation">Confirm Password</label>
              < ValidationMessage valid={this.state.passwordConfirmValid} message={this.state.errorMsg.passwordConfirm} />
              <input type="password" name="last-name" placeholder="Last-Name" value={this.state.passwordConfirm} onChange={(e) => this.updatePasswordConfirm(e.target.value)} />
            </div> 
                <div className="footer">
          <button type="button" className="btn" disabled={!this.state.formValid}>
            Register
          </button>
        </div> */}
         <div className="forms">
        <label>
          First Name
          <input 
            type="text" 
            label="name"
            value={this.state.firstname}
            onChange={event => this.updateFirstName(event.target.value)}
            // onChange={event => this.validateFirstname(this.state.firstname)} /
            placeholder="Enter First Name" 
            required 
          />
          </label>
        < ValidationMessage valid={this.state.firstnameValid} message={this.state.errorMsg.firstname} />

          </div>
          <br />
          <div className="forms">
        <label>
          Last Name
          <input 
            type="text" 
            label="name"
            value={this.state.lastname}
            onChange={event => this.updateLastName(event.target.value)}
            placeholder="Enter Last Name" 
            required 
          />
          </label>
        < ValidationMessage valid={this.state.lastnameValid} message={this.state.errorMsg.lastname} />
          </div>
          <br />
          <div className="forms">
        <label>
          Phone Number
          <input 
            type="text" 
            label="name"
            value={this.state.phone}
            onChange={event => this.updatePhone(event.target.value)}
            placeholder="Enter Phone Number" 
            required 
          />
          </label>
        < ValidationMessage valid={this.state.phoneValid} message={this.state.errorMsg.phone} />
          </div>
          <br />
          <div className="forms">
        <label>
          E-Mail Address 
          <input 
            type="text" 
            label="name"
            value={this.state.email}
            onChange={event => this.setState({ email: event.target.value })}
            placeholder="Enter Email" 
            required 
          />
          </label>
          </div>
          <br />
          <div className="forms">
        <label>
          Password
          <input 
            type="password" 
            label="name"
            value={this.state.password}
            onChange={event => this.setState({ password: event.target.value })}
            placeholder="Enter Password" 
            required 
          />
          </label>
          </div>
          <br />
          <div className="forms">
        <label>
          Confirm Password
          <input 
            type="password" 
            label="name"
            value={this.state.passwordConfirm}
            onChange={event => this.setState({ passwordConfirm: event.target.value })}
            placeholder="Enter Confirm Password" 
            required 
          />
          </label>
          </div>
          <br />
          <div className="footer">
          <button className="btn" onClick={()=> this.handleSubmit}  >Register</button>
          </div>
              </form> 
            </div>
          </div>
        </div>
    );
  }
}
