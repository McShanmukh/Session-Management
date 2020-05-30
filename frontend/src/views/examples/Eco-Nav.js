import React, { Component } from 'react'
import "./secNav.css"
import "./Eco-nav.css"
export default class EcoNav extends Component {
    render() {
        return (
            <div className= "econav-outer">
                {/* <h1 class="econav-header" > */}
                    <a className="Econav-header" href="/AI-Economics">AI ECONOMICS</a>
                    {/* </h1> */}
                <div className="secnav-sub-na">
                <div className="space">

                </div>
                <div className="eco-right">
                <a href="/About-Trade-Analytics" >About AI Economics</a>
                </div>
                </div>
            </div>
        )
    }
}
