import { useState, useEffect } from 'react';
import Component  from 'react'
import React from 'react'
import "./MainNavbar.css"
import ProdDrop from './ProdDrop';

import { Button, Alert } from 'reactstrap';
import App from 'App';

import HamburgerButton from './hamButton';

function MainNavbar() {
  const [navbarColor, setNavbarColor] = useState()
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
          document.documentElement.scrollTop > 580||
          document.body.scrollTop > 580
        ) {
          setNavbarColor("black")
          update("black")
        } else if (
          (200 < document.documentElement.scrollTop < 580) ||
          (200 < document.body.scrollTop < 580)
        ){
          setNavbarColor("transparent")
          update("transparent")
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
             <div className="topnav">
                <div className = "sub-nav">
                    <div className="box-1">
                    <a href="/products"><b><h3>AI DATABASES</h3></b></a>
                    </div>
                    <div className="box-2" id="1" onClick={() => tog(togged => !togged)}>
                       <a href="#"><b><h3>Products</h3></b></a>
                    </div>
                    <div className="box-3">
                    <a href="/products"><b><h3>Services</h3></b></a>
                    </div>
                    <div className="box-6">
                    <a href="/products"><b><h3>Register</h3></b></a>
                    </div>
                    <div className="box-5">
                    <a href="/products"><b><h3>Login</h3></b></a>
                    </div>
                    <div className="box-4">
                    <a href="/products"><b><h3>About</h3></b></a>
                    </div>
                </div>
                <div className="hamburger" onClick={() => toggle(toggled => !toggled)}>
            <HamburgerButton />
            </div>
            {toggled && <div className = "ham-button"><Hamber/></div>}
            </div>
            {togged && <div className = "prod-hover"><ProdDrop/></div>}
                </>
        )
                  }
    // }
// }


