import React from 'react';
import Tradeaisearch from './search'; 
import Tables from './tt'
import "./staticEco.css"
import LastPart from './Lastpart';

import {Switch,Route,useRouteMatch} from "react-router-dom"
import Hscountry from './Hscountry';
import Country from './Country'
import Hscodename from './Hscodename'
import Items from './Items'
import SecNav from './secNav';

function TradeAnalytics(){
  const { path, browserURL } = useRouteMatch();
  return(
    <>
      <div>
                <SecNav />
                    
          <Switch>
                
                <Route exact path={`${path}/trade/:country/:hscode`} component={Hscountry} />
                <Route exact path={`${path}/country/:country`} component={Country}></Route>
                <Route exact path={`${path}/hscode/:hscode`} component={Hscodename}></Route>
                <Route exact path={`${path}/hscode/:hscode`} component={Items} />
                <Route path="/">
                <div style={{marginTop:"12.5%"}}>
                  <Tables />
                </div>
                </Route>
                </Switch>
                </div>
    </>
  )
}

export default TradeAnalytics