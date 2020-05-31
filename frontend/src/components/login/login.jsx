import React,{componentDidMount} from "react";
import loginImg from "../../login.svg";
import axios from "axios";
import history from"./history";

import Cookies from 'js-cookie';

export class Login extends React.Component {
  
  state = { 
    email: '',
    password: '',
    authenticated:false
  };

  componentDidMount(){

  const session = Cookies.get("session")
  if(typeof session === "string"){
      //changeAuth(true)
      this.setState({ authenticated:true})
    }
    else{
      this.setState({ authenticated:false})
    }

    
    const headers = {
      'Access-Control-Allow-Origin':'*',
      'Content-Type':'application/json',
  }

    fetch('http://localhost:5000/profile', {
      method: 'POST',
      body: JSON.stringify({sesid:session}),
      headers: headers,
      credentials: "include"
    })
    .then(res=>res.json())
    .then(res => {
        console.log("profile",res)
        console.log(res)
        if(res.session === "expired"){
          this.setState({ authenticated:false})
          //window.alert("session exipred !pls login")
          //history.push("/login")
        }
        else if(res["session"] === "active"){
          if(session === res["session-id"]){

            this.setState({ authenticated:true})
            history.push("/profile")
          }else{
            this.setState({ authenticated:false})
          }
        }

    })
    .catch(err => {
      console.log('error:-' + err)
    })
  }
  
  handleSubmit = async (event) => {
    event.preventDefault();
    this.setState({ 
      email: '' ,
      password: '',
    });
    console.log(this.state)
    // axios.post('http://localhost:5000/login', this.state)
    const headers = {
      'Access-Control-Allow-Origin':'*',
      'Content-Type':'application/json',
  }
    fetch('http://localhost:5000/login', {
      method: 'POST',
      body: JSON.stringify({email:this.state.email,password:this.state.password}),
      headers: headers,
      credentials: "include"
    })
    .then(res=>res.json())
    .then(res => {
      console.log(res)
        let data = res
        if(res["verified"] === "true"){
        const session_id =res["session-id"]
        console.log("dat",session_id)
        Cookies.set('session', session_id)
        this.setState({ authenticated:true})
        history.push('/profile')
        }
        else if(res["verified"] === "false"){
          console.log(res["error"])
          window.alert(res["error"])
        }
      
    })

  };
  

  render() {
    if(this.state.authenticated){
      return(
      <div>
        <h1>Logged in</h1>
        <a href="/profile">profile</a>
      </div>
      )
    }
    else {
    return (
      <div className="base-container" ref={this.props.containerRef}>
        <div className="header">Login</div>
        <div className="content">
          <div className="image">
            <img src={loginImg} />
          </div>
          <div className="form">
          <form method='POST' action='/Login' onSubmit={this.handleSubmit} >
                <div className="forms"> 
              <label htmlFor="e-mail">E-Mail</label>
              <input 
               type="text"
               name="email"
               value={this.state.email}
               placeholder="E-Mail"
               onChange={event => this.setState({ email: event.target.value })}
              />
            </div> 
                <br/>  
                <div className="forms">
              <label htmlFor="password">Password</label>
              <input 
               type="password"
               name="password"
               value={this.state.password}
               placeholder="password"
               onChange={event => this.setState({ password: event.target.value })}
              />
            </div> 
                <div className="footer">
                  <button className="btn" onClick={()=> this.handleSubmit}>
                    Login
                  </button>
                </div>
      </form>
           
        </div>
        
      </div>
      </div>
    );
    }
  }
}
