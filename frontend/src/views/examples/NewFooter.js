import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./NewFooter.css"
import {
    faFacebookF,
    faTwitter,
    faInstagram
  } from "@fortawesome/free-brands-svg-icons";
import axios from "axios";

export default class NewFooter extends Component {
    state = { 
        newsmail: ''
      }
      handleSubmit = async (event) => {
        event.preventDefault();
        this.setState({ 
          newsmail: ''
        })
        console.log(this.state)
        console.log("fuck")
        axios.post('http://localhost:5000/register', this.state)
        };
    render() {
        return (
            <div className="LastFooter">
                <div className="LastFooter-outer">
                    <div className="footer-sub1">
                        <h3 > AI DATABASES</h3>
                        <span><p>Arthasastra Intelligence Databases Private Limited Provides economic, socio-economic and financial data with highest accuracy.</p></span>
                    </div>
                    <div className="footer-sub2">
                        <h3>Products</h3>
                        <a href="/Catalogue">Catalogue</a>
                        <a href="/Pricing">Pricing</a>
                        <a href="/Security">Security</a>
                    </div>
                    <div className="footer-sub3">
                        <h3>Services</h3>
                        <a href="/Customised-Data">Customised Data</a>
                        <a href="/Solutions">Solutions</a>
                        <a href="/Due-Diligence">Due Diligence</a>
                        <a href="/Consulting">Consulting</a>
                    </div>
                    <div className="footer-sub4">
                        <h3>For Developers</h3>
                        <a href="/API">API</a>
                        <a href="/Engineering-Team">Engineering Team</a>
                    </div>
                    <div className="footer-sub5">
                        <h3>Company</h3>
                        <a href="/About">About</a>
                        <a href="/Internships">Internships</a>
                        <a href="/Careers">Careers</a>
                        <a href="/Blog">Blog</a>
                    </div>
                    <div className="footer-sub6">
                        <h3>Support</h3>
                        <a href="/Login">Login/Register</a>
                        <a href="/Help-Center">Help Center</a>
                        <a href="/Contact-Us">Contact Us</a>
                        <a href="/Security">Security</a>
                        <a href="/Bulletins">Bulletins</a>
                        <a href="/Documentation">Documentation</a>
                    </div>
                </div>
                <div className="LastFooter-outer-2">
                    <div className="footer-o-1">
                        <h3>Follow us</h3>
                        <div className="socio-links" >
                            <a href="http://www.fb.com"><FontAwesomeIcon icon={faFacebookF} color="white" size="lg" margin="20px" pull="left"/></a>
                            <br />
                            <a href="http://www.Twitter.com"><FontAwesomeIcon icon={faTwitter} color="white" size="lg"  margin="20x" /></a>
                            <br />
                            <a href="http://www.Instagram.com"><FontAwesomeIcon icon={faInstagram} color="white" size="lg" margin="20x" pull="right"/></a>
                        </div>
                        
                    </div>
                    <div className="footer-o-2">
                    <h3>Newsletter</h3>
                    <div className="f-news-form">
                       {/* <form > */}
                            <input class="nl-input" onSubmit={this.handleSubmit} method="POST"
                                type="text"
                                name="e-mail"
                                value={this.state.newsmail}
                                placeholder="Drop Your E-Mail here"
                                onChange={event => this.setState( {newsmail: event.target.value} )}
                                />
                        {/* </form> */}
                        <button className="f-nl-btn" onClick={()=> this.handleSubmit}> <i class="fas fa-paper-plane"></i></button>
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}
