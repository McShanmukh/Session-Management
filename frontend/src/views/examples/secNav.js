import React, { Component, useState } from 'react'
import "./secNav.css"
import Tradeaisearch from './search';
export default function SecNav(){
    var [variable,setvariable]=useState("both");
        return (
            <div>
            <div className= "secnav-outer">
                <h1 class="header2" >
                    <a href="/AI-TradeAnalytics" onClick={()=>{setvariable("both")}}>AI TRADE ANALYTICS</a>
                    </h1>
                <div className="secnav-sub-na">
                <div className="secnav-left">
                    <a onClick={()=>{setvariable("commodity")}}>By Commodity</a>
                    <a onClick={()=>{setvariable("country")}} >By Country</a>
                    <a href="/#" >Tariff</a>
                    <a href="/#" >Non-Tariff</a>
                </div>
                <div className="space">

                </div>
                <div className="secnav-right">
                <a href="/About-Trade-Analytics" >About Trade Analytics</a>
                </div>
                </div>
            </div>
            <div className = "search">
                <Tradeaisearch variable={variable}/>
            </div>
            </div>
        )
}
