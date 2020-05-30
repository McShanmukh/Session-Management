import React, { Component } from 'react'
import Navbaar2 from './navbaar2'
import LastPart from './Lastpart'
import TradeAnalytics from "./AITradeAnalytics";
import Homepage from "./Homepage";
import EcoNav from './Eco-Nav';
import AutoComo from './Autocomo';
import "./AIEconomics.css";
import SearchBar from 'views/Search_Bar';
// import { Route, Switch } from 'react-router';
import App4 from './App4';
// import { BrowserRouter } from 'react-router-dom';
import {
    BrowserRouter,
    Switch,
    Route,
    Link,
    useParams,
    useRouteMatch
  } from "react-router-dom";
import Chart from './cc'
import Ecochartnews from './ecochartnews';
import Leftdivision from './leftdiv';
import Rightdivision from './rightdiv';


import LeftNdRight from "./LeftNdRight"
function Economics(){
    const { path, browserURL } = useRouteMatch();
    return (
        <div>
            <div>
                <div>
                    <EcoNav/>
                </div>
                <div >
                    <div className="search-in-economics" style={{paddingTop:"10vh", paddingLeft:"0vw",}}>
                    <AutoComo />
                    </div>                     
                </div>  
            </div>
            <div>
            <Switch>
                <Route exact path={path}>
                    <Homepage />
                </Route>

                <Route path={`${path}/:level2key`}><LeftNdRight /></Route>
                {/* <Route exact path={`${path}/:level2key`}><Leftdivision /></Route>
                <Route exact path={`${path}/:level2key/:level3key`}>
                    <div>
                        <Leftdivision/>
                        <Rightdivision/>
                    </div>
                </Route>
                <Route exact path={`${path}/:level2key/:lev3/:lev4/:lev5`}>
                    <div>
                        <Leftdivision/>
                        <Ecochartnews/>
                    </div>
                </Route> */}
                

            </Switch>
            </div>
        </div>
    )
}


export default  Economics