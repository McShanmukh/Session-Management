import React, { Component } from 'react'

import {useParams,Switch,Route, Link,useLocation,useRouteMatch} from "react-router-dom"

import Ecochartnews from './ecochartnews';
import Leftdivision from './leftdiv';
import Rightdivision from './rightdiv';



function LeftNdRight(){
    const { path, browserURL } = useRouteMatch();
    const params = useParams()
    const level2key=params.level2key

    return (
        <React.Fragment>
            <div className="lftnright" style={{display:"flex", flexDirection:"column" , paddingLeft:"1%",paddingRight:"1%"}}>
            <div className="lfthrline" style={{width:"100%"}} ><hr style={{height:"0.25px" ,backgroundColor:"black"}}/></div>
            <div style={{display: 'flex',flexdirection: "row"}}>
                
                <div style={{width:'18%'}}>
                    
                    <Leftdivision />
                </div>
                <div style={{width:'5px',height:"100%",marginTop:"6.5%", backgroundColor:"black"}}>
                <div className="lfthrline2" style={{width:"100%",}} ><vl style={{width:"0.5px" ,height:"100%",backgroundColor:"black" }}/></div>
                </div>
                <div style={{width:'82%',display:"flex",flexDirection:"row"}}>
                    <div style={{width:"0.5px", height:"auto" ,backgroundColor:"black"}}> 
                    <br/>
                    </div>
                    <div style={{paddingLeft:"3%",width:"99%"}}>
                    <Switch>
                        <Route exact path={`${path}/:level3key`}>
                            <div>
                                <Rightdivision/>
                            </div>
                        </Route>
                        <Route exact path={`${path}/:lev3/:lev4`}>
                            <div>
                                <Ecochartnews/>
                            </div>
                        </Route>
                        <Route exact path={`${path}/:lev3/:lev4/:lev5`}>
                            <div>
                                <Ecochartnews/>
                            </div>
                        </Route>
                        <Route exact path={`${path}/:lev3/:lev4/:lev5/:lev6`}>
                            <div>
                                <Ecochartnews/>
                            </div>
                        </Route>
                        <Route exact path={`${path}/:lev3/:lev4/:lev5/:lev6/:lev7`}>
                            <div>
                                <Ecochartnews/>
                            </div>
                        </Route>
                    </Switch>
                    </div>
                </div>
                </div>
            </div>

        </React.Fragment>
    )

}

export default LeftNdRight