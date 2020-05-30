import React, { useState, useEffect } from "react"
import { geoEqualEarth, geoPath } from "d3-geo"
import { feature } from "topojson-client"
import {select,scaleLinear}  from "d3"
import * as d3 from 'd3'
//import {d3tip} from "d3-tip"




const projection = d3.geoMercator()
  .scale(1000)
  .translate([ -1000,700])

const WorldMap = (props) => {


  const [geographies, setGeographies] = useState([])
    
  useEffect(() => {
    fetch("/india.json")
      .then(response => {
        if (response.status !== 200) {
          console.log(`There was a problem: ${response.status}`)
          return
        }
        response.json().then(worlddata => {
          let x = feature(worlddata, worlddata.objects.india).features
          setGeographies(x)
        })
        
      })
    
    }, [props.data])

    useEffect(() => {
      var data=props.data
      var cmin=10000000,cmax=0;

      for(let i in data){
        if(i!="Total"){
        if(data[i] < cmin)
         cmin=data[i];
        
         if(data[i]>cmax){
           cmax=data[i]
         }
      }
    }

      var colorScale= scaleLinear()
    .domain([cmin, cmax])
    .range(["#D4EEFF", "#0099FF"]);

    const mystyle = {
      color: "white",
      backgroundColor: "DodgerBlue",
      padding: "10px",
      fontFamily: "Arial"
    };

    var svg = select(".mapsvg");
    
   var states = svg.selectAll(".countries")
                .data(geographies)
                .enter()

        var mState = states.append("path").attr("d",(d,i)=>{return geoPath().projection(projection)(d)})
                .attr("fill",(d,i)=>{ var country = d.properties.st_nm
                  var val = props.data[country];
                  console.log(country,val);
                   return colorScale(val)} )
                .attr("stroke"," #000000")
                // .append("rect").attr("width",50).attr("x",30).attr("y",40).attr("height",60).attr("fill","red")
                var tooltip =svg.append("g").attr("class","ttip")
                var bg =tooltip.append("rect")

                var txt=tooltip.append("text").attr("x",50).attr("y",70);

                  mState.attr("class",(d,i)=>{ return "mystate"+i})

                mState.on("mouseover",(d,i,e)=>{ 
                  //svg.call(tip)
                  var mstate = d.properties.st_nm
                  select(".mapsvg").selectAll(".mystate"+i).attr("fill","#00c3ff")
                  //console.log(i,e,".mystate"+i,event.pageX,event.pageY)
                  return tooltip.style("visibility", "visible");
                })
                .on("mouseout",(d,i,e)=>{                   
                  select(".mapsvg").selectAll(".mystate"+i).attr("fill",(d)=>(colorScale(props.data[d.properties.st_nm])))
                  return tooltip.style("visibility", "hidden");
                })
                .on("mousemove", function(d){
                  console.log("mov",d.properties.st_nm);
                  txt.text(d.properties.st_nm + ":" + data[d.properties.st_nm])
                  bg.attr("x",()=>{ return window.event.pageX-835}).attr("y",(d)=>{return window.event.pageY-200})
                  .attr("width",180).attr("height",30).attr("fill","silver")
                  
                  txt.attr("x",()=>{ return window.event.pageX-825}).attr("y",(d)=>{return window.event.pageY-180})
                  
                
                })
                  

    },[geographies])

  return (
    <div style={{width:"60vw",height:"600"}}>
      <svg className="mapsvg" width='60vw' height='600'>
      <g className="countries"> </g>
    </svg>
  </div>
    
  )
}

export default WorldMap