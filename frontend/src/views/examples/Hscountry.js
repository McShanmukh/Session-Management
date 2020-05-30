import React from 'react'
import Top from "./Top"
import Top2 from "./Top2"
import {useParams,useLocation} from "react-router"
import Hs from "./Hs"
import SecNav from './secNav'
import Tradeaisearch from './search'
import StaticEco from './staticEco'

function Hscountry(){
    const params = useParams()
    let country = params.country
    let hscode = params.hscode
    console.log(country,"country params")
    console.log("hscountry entered")


    return (
        <>
        <SecNav/>
        <Tradeaisearch />
        <div className="eco-al-mn-mx">
          <StaticEco/>
          <div className="eco-mx">
            <div className="seperator">
              <hr className="line" />
              <vr className="line" />
            </div>
    <div className="hs-con">
        <h2>Country : {country}</h2>
        <h2>Hscode : {hscode}</h2>
        <Hs/>
        <Top country={country}/> 
        <Top2 hscode={hscode}/>
        </div>
        </div>
        </div>
        </> 
    )
}


export default Hscountry