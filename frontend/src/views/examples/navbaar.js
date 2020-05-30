import React, { Component } from 'react'
import "./navbar.css"
import HamburgerButton from './hamButton';
import Hamber from "./Hamber"
import ProdDrop from "./ProdDrop"
import { useState, useEffect } from 'react';
import { black } from 'material-ui/styles/colors';


export default function Navbaar() {

  const [navbarColor, setNavbarColor] = useState(black)
  const [toggled, toggle] = useState(false)
  const [togged, tog] = useState(false)
  useEffect(() => {

  const update = (x) => {
    // const mynav = document.querySelector('.topnav');
    // console.log(mynav)
    // const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    // const scrolled = window.scrollY;
    // console.log(scrolled)
    window.getComputedStyle(document.documentElement).getPropertyValue("--color1");
    document.documentElement.style.setProperty("--color1", x);
  }
  
  const updateNavbarColor = () => {
      if (
        document.documentElement.scrollTop > 250||
        document.body.scrollTop > 250
      ) {
        setNavbarColor("black")
        update("black")
      } else if (
        (50 < document.documentElement.scrollTop < 250) ||
        (50 < document.body.scrollTop < 250)
      ){
        setNavbarColor("transperant")
        update("transperant")
      }     
    };
    window.addEventListener("scroll", updateNavbarColor);
    return function cleanup() {
      window.removeEventListener("scroll", updateNavbarColor);
    };
  });
  console.log(document.documentElement.scrollTop)
  console.log(document.body.scrollHeight)


        return (
          <>
          <div className="outer-main">
            <div className="mainav">
                    <h1 className="header1" style={{color:"white",fontSize:" 23px",height:"25px"}}><a className="navanc" href="/">AI DATABASES</a></h1>
                <div className="sub-na">
                    <div className= "left">
                        <div  id="1" onClick={() => tog(togged => !togged)}>
                            <a className="navanc" href="#" >Products</a>
                        </div>
                        <div id="2">
                            <a className="navanc" href="/Services">Services</a>
                        </div>
                        <div id="3">
                            <a className="navanc"  href="/Others">Others</a>
                        </div>
                    </div>
                    <div className="space">
                    </div>
                    <div className= "right" >
                    <div  id="4">
                            <a className="navanc" href="/About">About</a>
                        </div>
                        <div  id="5">
                            <a className="navanc" href="/Login">Login</a>
                        </div>
                        <div id="6">
                            <a className="navanc" href="/Register">Register</a>
                        </div>
                    </div>
                </div>
                </div>
                <div className="hambrger" onClick={() => toggle(toggled => !toggled)}>
            <HamburgerButton />
            </div>
            {toggled && <div className = "ham-button"><Hamber/></div>}
            </div>
            {togged && <div className = "prod-hover"><ProdDrop/></div>}
            </>
        )
    
}
