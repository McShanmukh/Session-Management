import React, { Component } from 'react'
import "./staticEco.css";
export default class StaticEco extends Component {
    render() {
        return (
            <div className="static-left">
                <a href="/AI-Economics/Chart">Chart</a>
                <a href="/AI-Economics/Related-Items">Related Items</a>
                <a href="/AI-Economics/Tariffs-and-GST">Tariffs and GST</a>
                <a href="/AI-Economics/Importing-Exporting-Countries">Importing/Exporting Countries</a>
                <a href="/AI-Economics/Sellers-Buyers">Sellers/Buyers</a>
                <a href="/AI-Economics/Non-Tariffs">Non-Tariffs</a>
                <br />
                <br />
                <a href="/AI-Economics/SPS">    SPS</a>
                <a href="/AI-Economics/TBT">    TBT</a>
                <a href="/AI-Economics/Indicators">Indicators</a>
            </div>
        )
    }
}

