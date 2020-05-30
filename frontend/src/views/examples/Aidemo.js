import React, { useState, useEffect } from "react"
import axios from 'axios'
import ReactDOM from 'react-dom'
import DatatablePage from "views/examples/sun";
import WorldMap from "views/examples/WorldMap"
import DemoDrop from "./demodropdowns";
import DemoNav from "./demo-nav";
var data="aak";



const col = ["State","confirmed","active","deaths","recovered"]



function Page() {
 
  const url = "https://api.covid19india.org/data.json"

  const [t,setTemp] = useState({})
  const [selected,setSelected] = useState("deaths")
const [loading,setloading] = useState(false)
const [error,seterror] = useState(false)
var[rows,setrows]=useState([])
 


  useEffect(() => {
    
    setloading(true)
      axios.get(url)
        .then( d => {
          if(d.status === 200 ){
            let states_data = d.data.statewise
            console.log(states_data)
            let x=states_data
            let i=1
            let y=[]
            for(i in x)
            {
              let z=x[i]
              if(i>0)
              y.push({state:z.state,confirmed:parseInt(z.confirmed),active:parseInt(z.active),deaths:parseInt(z.deaths),recovered:parseInt(z.recovered)})

            }
            console.log(y)
            setrows(y)
            var temp ={}
            let states_list = states_data.forEach(state => {
                let state_name = state.state
                let state_code = state.statecode
                
                let confirmed = state.confirmed
                let active = state.active
                let recovered = state.recovered
                let deaths = state.deaths
                temp[state_name] = parseInt(state[`${selected}`])
            })

            // setList(states_list)
            setTemp(temp)

          }
          else{
            console.log("err")
          }
          setloading(false)
        })
        .catch( error => {
            console.log(error)
            setloading(false)
            seterror(true)
        });
        if(loading){
          seterror(true)
        }
  },[selected])
  var columns= [
    {
      label: 'StateName',
      field: 'state',
      sort: 'asc',
      width:150
    },
    {
      label: 'Confirmed',
      field: 'confirmed',
      sort: 'asc',
      width:150
    },
    {
      label: 'Active',
      field: 'active',
      sort: 'asc',
      width:150
    },
    {
      label: 'Deaths',
      field: 'deaths',
      sort: 'asc',
      width:150
    },
    {
      label: 'Recovered',
      field: 'recovered',
      sort: 'asc',
      width:150
    }
  ]
  var tabledata = {columns,rows};
  
  
  return (
    <>
    <DemoNav />
    <div style={{marginTop:"10vh"}}>
      <div style={{display:"flex",flexDirection:"row"}}>
          <div style={{height:"1000",marginLeft:"500"}}>
          <select onChange={e=>{
              setSelected(e.target.value)}}>
            <option value="" disabled selected>Select Variable</option>
            <option value="active">Active</option>
            <option value="confirmed">Confirmed</option>
            <option value="deaths">Deaths</option>
            </select>
            </div>
            <DemoDrop />
       </div>
    <br/>
    <br/>
      <div style={{display:"flex",direction:"row"}}>
      <div style={{height:"1000",marginLeft:"500",width:"40%"}}>
      
      <DatatablePage data={tabledata} xscrolling={false} yscrolling={true} searching={true} />
      </div>

    <div style={{float:"right"}}>
      <WorldMap data={t} />
      </div>
    </div>
    

      </div>
      </>
  )

}
export default Page