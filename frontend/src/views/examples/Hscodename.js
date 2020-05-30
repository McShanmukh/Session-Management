import React from 'react'
import Top2 from "./Top2"
import {useParams,useLocation} from "react-router"
import SecNav from './secNav'
import Tradeaisearch from './search'
import StaticEco from './staticEco'


function Hscodename(){
    const params = useParams()
    let hscode = params.hscode
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
        <div>

            
        <h2>Hscode : {hscode}</h2>
        <Top2 hscode={hscode}/>

        </div>
        </div>
        </div>
        </>

    )
}


export default Hscodename