import React, { Component } from 'react'
import Navbaar2 from './navbaar2'
import SecNav from './secNav'
import "./staticEco.css"
import LastPart from './Lastpart'
import TradeAnalytics from "./AITradeAnalytics";
import Tradeaisearch from './search'

export default class TradeAnalyticsHome extends Component {
    render() {
        return (
            <div>
                <SecNav />
                <div className = "search">
                    <Tradeaisearch/>
                </div>
                <TradeAnalytics />
                
            </div>
        )
    }
}
