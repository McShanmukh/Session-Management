import React, { Component } from 'react';
import "./Lastpart.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {faFacebook} from '@fortawesome/free-solid-svg-icons';
import {
    faFacebookF,
    faTwitter,
    faInstagram
  } from "@fortawesome/free-brands-svg-icons";
export default class LastPart extends Component {
    render() {
        return (
            <div className="main">
                <div className="sub-main">
                    <div className="links">
                        <h3><a className="ftranc" href="/blog"> Blog </a></h3>
                        <h3><a className="ftranc" href="/About"> About </a></h3>
                        <h3><a className="ftranc" href="/Contact Us"> Contact Us </a></h3>
                    </div>
                    <div className= "social">
                    <h3><a className="ftranc" href="/Facebook"><FontAwesomeIcon icon={faFacebookF} color="white" size="1x" margin="20x"/> Facebook </a></h3>
                    <h3><a className="ftranc" href="/Instagram"><FontAwesomeIcon icon={faInstagram} color="white" size="1x"/> Instagram </a></h3>
                    <h3><a className="ftranc" href="/Twitter"><FontAwesomeIcon icon={faTwitter} color="white" size="1x"/> Twitter </a></h3>
                    </div>
                </div>     
                     
            </div>
        )
    }
}
