import React, { Component } from 'react'
import "./card.css"
import { Link } from 'react-router-dom'

export default class Mycard extends Component {
    render() {
        return (
            <div className = "cards">
                <div className="sub-cards">

                <div className="car-flex">
                        <div className = "card0">
                            <div className = "sub-card">
                                <div className="card-text1">
                            <h2 style={{}}>AI Economics</h2>
                        <p style={{fontWeight:500}}>AI-Economics offers various economic indicators from multitude of data-resources with real-time updates</p>
                        </div>
                        <button className = "card-btnn" onClick={(e): void => {e.preventDefault();window.location.href='/AI-Economics';}}>Read More</button>
                            </div>
                        </div>
                
                <div className = "card1" >
                    <div className = "sub-card">
                    <div className="card-text1">
                    <h2>AI Trade Analytics</h2>
                   <p>AI-Trade Analytics brings you curated datasets on trade data of India across the countries and across comodities</p>
                   </div>
                    <button className = "card-btnn" onClick={(e): void => {e.preventDefault();window.location.href='/AI-TradeAnalytics';}}>Read More</button>
                    </div>
                </div>
                </div>
                <div className="car-flex">
                <div className = "card2">
                    
                    <div className = "sub-card">
                    <div className="card-text1">
                    <h2>AI Demographics</h2>
                   <p>The state-wise collection of homongous data on various variables collected from individual state-departments</p>
                   </div>
                    <button className = "card-btnn"  onClick={(e): void => {e.preventDefault();window.location.href='/AI-Demographics';}}>Read More</button>
                    </div>
                </div>
                <div className = "card3">
                    
                    <div className = "sub-card">
                    <div className="card-text1">
                    <h2>AI Industrial Research</h2>
                   <p>AI Industrial Research focusses on tracking and analysing finest movements of industries</p>
                   </div>
                    <button className = "card-btnn" onClick={(e): void => {e.preventDefault();window.location.href='/AI-IndustrialResearch';}}>Read More</button>
                    </div>
                </div>
            </div></div>
        </div>
        )
    }
}