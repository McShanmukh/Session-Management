import React, { PureComponent, useEffect, useState } from 'react';
import ReactDOM from 'react-dom'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,Brush,ResponsiveContainer
} from 'recharts';
import { useParams } from 'react-router';
import axios from 'axios';

export default function Example () {
  const params=useParams()
    var lev2=params.level2key;
    var lev3=params.lev3;
    var lev4=params.lev4;
    var lev5=params.lev5;
    var lev6=params.lev6;
    var lev7=params.lev7;
    console.log(lev2,"----------",lev3,"----------",lev4,"----------",lev5,"----------",lev6)
  const [datax,setdata]=useState([])
  var[x,setx]=useState('')
  
  useEffect(() => {
    
    if(lev5==undefined){
      x=lev4
      var query = {
        "query": {
          "bool":{
            "must":[
              {"match": {"Level2.keyword": lev2}},
              {"match": {"Level3.keyword": lev3}},
              {"match": {"Level4.keyword": lev4}}
              ]
          }
        }
      }
    }
    else if(lev6==undefined)
    {
      x=lev5
      var query = {
        "query": {
          "bool":{
            "must":[
              {"match": {"Level2.keyword": lev2}},
              {"match": {"Level3.keyword": lev3}},
              {"match": {"Level4.keyword": lev4}},
              {"match": {"Level5.keyword": lev5}}
              ]
          }
        }
      }
    }
    else if(lev7==undefined)
    {
      x=lev6
      var query = {
        "query": {
          "bool":{
            "must":[
              {"match": {"Level2.keyword": lev2}},
              {"match": {"Level3.keyword": lev3}},
              {"match": {"Level4.keyword": lev4}},
              {"match": {"Level5.keyword": lev5}},
              {"match": {"Level6.keyword": lev6}}
              ]
          }
        }
      }
    }
    else
    {
      x=lev6
      var query = {
        "query": {
          "bool":{
            "must":[
              {"match": {"Level2.keyword": lev2}},
              {"match": {"Level3.keyword": lev3}},
              {"match": {"Level4.keyword": lev4}},
              {"match": {"Level5.keyword": lev5}},
              {"match": {"Level6.keyword": lev6}},
              {"match": {"Level7.keyword": lev7}}
              ]
          }
        }
      }
    }
    setx(x)
    const url = process.env.REACT_APP_ELASTIC_URL+process.env.REACT_APP_ELASTIC_ECONOMICS_INDEX+'/_search'

console.log(query)

    axios.post(url, query)
		.then( d => {
			if(d.status === 200 ){
        console.log(d)
        let temp_data = d.data.hits.hits[0]._source
        let data =temp_data.data
        let description = temp_data.Description

        console.log("chart dta",description)
				
        let list = []

        for (let [key, value] of Object.entries(data)) {
          // console.log(`${key}: ${value}`);
          let dict = {name : `${key}`}
          dict[x]=value
          list.push(dict)
        }
				
        console.log(list,"list")

        setdata(list)
        
			}
			else{
				console.log("err")
			}
		})
		.catch( error => {
			if (error) {
			  console.log(error)
			}
			else{
				console.log("Error!");
			}
		});
    }, [lev2,lev3,lev4,lev5,lev6])


    return (<div  ><h1>Chart</h1><br/>
    {/* <div style={{marginLeft:"51%"}}> */}
  <ResponsiveContainer width="99%" height={500} margin={{
          top: 20, right: 0, left: 50, bottom: 5,
        }}>
      <LineChart
        width={1450}
        height={600}
        data={datax}
        margin={{
          top: 20, right: 0, left: 5, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Brush dataKey="name" height={30} stroke="#000000" />
        <Line type="monotone" dataKey={x} stroke="#000000" />
        
      </LineChart>
      </ResponsiveContainer>
      </div>
      // </div>
    );
}