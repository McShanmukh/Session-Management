import React, { Component } from 'react'
import "./Hamber.css";
export default class Hamber extends Component {
    render() {
        return (
            <div className="outer">
                <div className="headers">
                    <div className= "ph1">
                    <h1 >Products</h1>
                    <hr className="lh1" />
                    </div>
                    <div className= "ph2">
                    <h1 >Services</h1>
                    <hr className="lh2" />
                    </div>
                     <div className= "ph3">
                    <h1 >Others</h1>
                    <hr className="lh3" />
                    </div>
                </div>
                <div className="subouter">
                    <div className="products">
                        <div className="subp1" >
                        <a href="/AI-Economics"  >AI Economics</a>
                        <a href="/AI-Demographics">AI Demographics</a>
                        <a href="/AI-Companies">AI Companies</a>
                        <a href="/AI-Industrial-Research">AI Industrial Research</a>
                        </div>
                        <div className="subp2">
                        <a href="/AI-Ratings">AI Ratings</a>
                        <a href="/AI-Trade-Analytics" >AI Trade Analytics</a>
                        <a href="/AI-Legal-Databases" >AI Legal Databases</a>
                        <a href="/AI-Election-Tracker" >AI Election Tracker</a>
                        </div>
                    </div>
                    <div className="Services">
                        <a href="/Customized-Data-Solutions" >Customized Data Solutions</a>
                        <a href="/Due-Diligence" >Due Diligence</a>
                        <a href="/Consulting" >Consulting</a>
                        <a href="/M&A" >M&A</a>
                    </div>
                    <div className="Others">
                        <div className="Others1">
                            <a href="/Register" >Register</a>
                            <a href="/Subscriptions" >Subscriptions</a>
                            <a href="/Join-Us" >Join Us</a>
                        </div>
                        <div className="Others2">
                            <a href="/Login" >Login</a>
                            <a href="/Contact-Us" >Contact Us</a>
                            <a href="/Feedback-Form" >Feedback Form</a>
                        </div>
                    </div>
                </div>
                
            </div>
        )
    }
}
