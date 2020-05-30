import React from 'react'
import Top from "./Top"
import {useParams,useLocation} from "react-router"
import "./tt.css";
import Navbaar from './navbaar';
// import LastPart from './Lastpart';
import StaticEco from './staticEco';
import "./staticEco.css"
import Tradeaisearch from './search';
import SecNav from './secNav';

function Country(){
    const params = useParams()
    let country = params.country
    console.log(country,"country params")


    return (
        <>
        <Navbaar/>
        <SecNav/>
        <Tradeaisearch />
        <div className="eco-al-mn-mx">
          <StaticEco/>
          <div className="eco-mx">
            <div className="seperator">
              <hr className="line" />
              <vr className="line" />
            </div>
        
        
        
        <div className="con-con">

            
        <h2>Country : {country}</h2>
        

            <Top country={country}/>

            </div></div></div>
        </>
    )
}


export default Country;