import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {useParams, useHistory} from "react-router-dom"
import "./Tab.css"
import DatatablePage from './sun'
import { MDBBtn, MDBTableBody, MDBTableHead, MDBTable } from 'mdbreact'

function Rightdivision(props){
  const [depth,setdepth]=useState('')
  const history=useHistory()
  const params = useParams()
  let level2key=params.level2key
  let level3key=params.level3key
  let level4key=params.level4key
  let level5key=params.level5key
  const url = 'http://159.65.150.184:9200/economics_v1/_search'

  
  function Qur(lev3,lev2){
    let query = {
      "query": {
        "bool": {
          "must": [
            {"match": {"Level2.keyword":lev2}}
          ],
          "filter": [
            {"term": {"Level3.keyword": lev3}}
          ]
          
        }
      },
           "aggs": {
        "level3_feilds": {
          "terms": {
            "field": "Level3.keyword"
          }
        },
        "level4_feilds": {
          "terms": {
            "field": "Level4.keyword"
          }
        },
        "level5_feilds": {
          "terms": {
            "field": "Level5.keyword"
          }
        },
        "depth":{
          "terms": {
            "field": "Level_depth"
          }
        }
      },
      "size":10000
    }
    return query;
  }


  const [temp, setData] = useState([])
  const [list, setlist]=useState([])
  

  useEffect(() => {
    var query = Qur(level3key,level2key)
    axios.post(url, query)
		.then( d => {
			if(d.status === 200 ){
        let data = d.data.hits.hits
        let v1,v2
        const depth=d.data.aggregations.depth.buckets[0].key
        setdepth(depth)
        console.log(depth,"depth")
				var temp = {}
				for(var x in data){
          let dataobject = data[x]._source
          v1="Level"+(depth-2)
          v2="Level"+(depth-1)
          let key = dataobject[v1]
          console.log(key)
					if( dataobject[v2] !== null){
					let l = [dataobject[v2],dataobject.data]
					
					temp[key] = temp[key] || [];
					
          temp[key].push(l)
          }
        }
        
        let info = d.data.aggregations["level"+(depth-2)+"_feilds"].buckets
        let list = info.map(s => {return {"label" : s.key ,"value" : s.key}})
				setlist(list)
        setData(temp)
        console.log(list)
        console.log(temp)
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
  }, [level2key,level3key])

  const Tablecreate = (k) => {
    var columns= [
      {
        label: 'Year',
        field: 'Year',
        sort: 'asc',
        width: 150
      }
    ]
    var cc=[]
    
    for(let i in temp[k])
    {
      let xy=(temp[k][i][0]);
      let str=""
      if(depth==5)
        str=level2key
      else if(depth==6)  
        str=level2key+"/"+level3key  
      else if(depth==7)
        str=level2key+"/"+level3key+"/"+level4key
      else if(depth==8)
        str=level2key+"/"+level3key+"/"+level4key+"/"+level5key
     cc.push({"label":<>{xy}<MDBBtn onClick={()=>{history.push("/AI-Economics/"+str+"/"+k+"/"+xy)}} ><i class="fas fa-chart-line"></i></MDBBtn></>,"field":xy,"sort":'asc',"width":200})
    }
    columns=columns.concat(cc)
    let x;
    for(let i in temp[k])
    {
      x=(temp[k][i][1])
      break;
    }
    let rows=[]
    for(let i in x)
    {
      let sup={"Year":parseInt(i)}
      let abc;
      let p=[]
      let q=[]
      for(let j in temp[k])
    {
      let z=temp[k][j]
      
      p.push(z[0])
      q.push(z[1][i])
      
    }
    for (let j = 0; j < p.length; j++) {
      sup[p[j]] = q[j];
    }
    rows.push(sup)
    } 
    var tabledata = {columns,rows};
    
    return(
    <DatatablePage data={tabledata} xscrolling={true} yscrolling={true} />
    )
  }
  return (
    <div>
        <h2>{level3key}</h2>
      <ul style={{listStyleType:"none"}}>
        {list.map(item => (
        <li key={item.value}>
          <h3>{item.value}</h3>
          {Tablecreate(item.value)}
        </li>
        ))}
      </ul>
    </div>
        
      
  )
}

export default Rightdivision