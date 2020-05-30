import React, { PureComponent, useEffect, useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,Brush
} from 'recharts';
import { useParams } from 'react-router';
import axios from 'axios';

export default function Example () {
  const params=useParams()
    var lev2=params.lev2;
    var lev3=params.lev3;
    var lev4=params.lev4;
    var lev5=params.lev5;
    console.log(lev2,lev3,lev4,lev5)
  const [datax,setdata]=useState([])
  
  useEffect(() => {
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
    const url = 'http://159.65.150.184:9200/ai_economics_v1_1/_search'



    axios.post(url, query)
		.then( d => {
			if(d.status === 200 ){
        let temp_data = d.data.hits.hits[0]._source
        let data =temp_data.data
        let description = temp_data.Description

        console.log("chart dta",description)
        console.log(data)

				
        let list = []

        for (let [key, value] of Object.entries(data)) {
          // console.log(`${key}: ${value}`);
          let dict = {name : `${key}`,pv: value}
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
    }, [lev2,lev3,lev4,lev5])


    return (<div><h1>Chart</h1><br/>

      <LineChart
        width={1500}
        height={300}
        data={datax}
        margin={{
          top: 20, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Brush dataKey="name" height={30} stroke="#8884d8" />
        <Line type="monotone" dataKey="pv" stroke="#8884d8" />
        
      </LineChart>
      </div>
    );
}