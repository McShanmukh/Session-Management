import React,{useEffect,useState} from "react"
import { Link, Redirect } from "react-router-dom";
import Cookies from 'js-cookie';
import {useHistory} from "react-router-dom"

function UserBio(){
    let history = useHistory();
    const session = Cookies.get("session")
    const [Bio,setBio] = useState("")
    const [Proffession,setProffession] = useState("")
    const [authenticated,changeAuth]= useState(false)
    const [viewDetails,setView] = useState(true)
    const [type,setType] = useState("")

    const headers = {
        'Access-Control-Allow-Origin':'*',
        'Content-Type':'application/json',
    }

    useEffect(() =>{
      if(typeof session === "string"){
          changeAuth(true)
      } 
      else{
          changeAuth(false)
          history.push("/login")
      }
      getdata()
    },[])

    function toggle(){
        if(viewDetails){
            setView(false)
        }
        else{
            setView(true)
        }
        console.log('hi')
    }


    function getdata() {
      
      fetch('http://localhost:5000/details', {
            method: 'POST',
            body: JSON.stringify({sesid:session}),
            headers: headers,
            credentials: "include"
          })
            .then(res=> res.json())
            .then(res => {
                console.log("resssss",res)
                if(res.session === "expired"){
                    changeAuth(false)
                    window.alert("session exipred !pls login")
                    history.push("/login")
                  }
                else if(res.data === "true"){
                    setBio(res.Bio)
                    setProffession(res.Profession)
                    if(res.Bio === "" && res.Profession === ""){
                        // type = "insert"
                        setType("insert")
                    }
                    else{
                        // type = "insert"
                        // type = "update"
                        setType("update")
                    }
                    
                }
                else{
                    window.alert("error in getting user bio")
                } 
                console.log("errorrr2!!",res)
            })
            .catch(err=>{
                console.log(err)
            })
     
    }

    function handleSubmit(event) {
        
        
          fetch('http://localhost:5000/adddetails', {
            method: 'POST',
            body: JSON.stringify({sesid:session,bio:Bio,Profession:Proffession,type:type}),
            headers: headers,
            credentials: "include"
          })
            .then(res=> res.json())
            .then(res=> {
                if(res.session === "expired"){
                    changeAuth(false)
                    window.alert("session exipred !pls login")
                    history.push("/login")
                  }
                else if(res.response === "sucefully inserted"){
                    toggle()
                    window.alert(res.response)
                    
                // console.log("respons",res)
                }
                else if(res.response === "user details not found"){
                    window.alert(res.response)
                }
                else{
                    window.alert("error in posting user details")
                }
                console.log("errorrr!!",res)
            })
            .catch(err=>{
                console.log(err)
            })
    
        event.preventDefault();
      }
    
      if(!authenticated){
        return (<><h2>Session expired!pls login before u accesss</h2><br /><a href="login">login</a></>)
    }
    if(viewDetails){
        return (
            <div>
                <h4>view details</h4>
                <ul>
                    <li>Bio:{Bio}</li>
                    <li>Profession:{Proffession}</li>
                </ul>
                <button onClick={toggle}>Edit</button>
            </div>
        )
    }
    else{
        return (
            <div>
                
                <h3>Change Details</h3>
                
                <form  onSubmit={handleSubmit}>
                    <input type="text" name="bio" placeholder="Bio" value={Bio} onChange={e => setBio(e.target.value)} /><br />
                    <input type="text" name="Proffession" placeholder="Proffesion" value={Proffession} onChange={e => setProffession(e.target.value)} /><br /><br />
                    <button type="submit">Edit details</button>    
                </form>
                <button onClick={toggle}>Cancel</button>

            </div>
        )
    }
}

export default UserBio