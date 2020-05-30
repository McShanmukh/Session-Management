import React, { useState, useEffect } from 'react'
import News from './News'
import { useParams, useHistory } from 'react-router'
import DatatablePage from './sun'
import axios from 'axios'
import Example from './cc'
import { MDBBtn } from 'mdbreact'

function Ecochartnews(props){
    const history=useHistory()
    const params=useParams()
    // console.log(params) 
    let level2_key=params.level2key
    let level3_key=params.lev3
    let level4_key=params.lev4
    let level5_key=params.lev5
    let level6_key=params.lev6
    const url = process.env.REACT_APP_ELASTIC_URL+process.env.REACT_APP_ELASTIC_ECONOMICS_INDEX+'/_search'
    
  
    const [temp, setData] = useState([])
    const [list, setlist]=useState([])
    const [depth,setdepth]=useState()
    var [v3,setv3]=useState()
    if(depth==5)
          v3=level3_key
        else if(depth==6)  
          v3=level4_key
        else if(depth==7)
          v3=level5_key
        else if(depth==8)
          v3=level6_key
    console.log(v3)


    useEffect(() => {
      let query = {
        "query": {
          "bool": {
            "must": [
              {"match": {"Level2.keyword":level2_key}}
            ],
            "filter": [
              {"term": {"Level3.keyword": level3_key}}
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
  
  
      axios.post(url, query)
          .then( d => {
              if(d.status === 200 ){
                let data = d.data.hits.hits
                let v1,v2
                const depth=d.data.aggregations.depth.buckets[0].key
                setdepth(depth)
                setv3("level"+(depth-2)+"_key")
                console.log({v3})
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
          if(depth==5)
          v3=level3_key
        else if(depth==6)  
          v3=level4_key
        else if(depth==7)
          v3=level5_key
        else if(depth==8)
          v3=level6_key
          setv3(v3)
    console.log(v3)
    }, [level3_key,level2_key,v3,depth,level4_key,level5_key,level6_key])
  
  // let variable1="level"+(depth-2)
  // setv3(variable1)
    
  
    const Tablecreate = (k) => {
      console.log(k)

      var columns= [
        {
          label: 'Year',
          field: 'Year',
          sort: 'dsc',
          width: 150
        }
      ]
      var cc=[]
      // console.log(temp)
      for(let i in temp[k])
      {let xy=(temp[k][i][0]);
        let str=""
        if(depth==5)
          str=level2_key
        else if(depth==6)  
          str=level2_key+"/"+level3_key  
        else if(depth==7)
          str=level2_key+"/"+level3_key+"/"+level4_key
        else if(depth==8)
          str=level2_key+"/"+level3_key+"/"+level4_key+"/"+level5_key
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
      // console.log(tabledata)
      // console.log(temp[k])
      
      return(
        <DatatablePage data={tabledata} xscrolling={true} yscrolling={true}  />
      )
    }
  
    return(
        <div>
            <div>
                <Example/>
            </div>
            <div >
                <h2>{level2_key}>{level3_key}</h2>
                {Tablecreate(v3)}
                
            </div>
            <div>
                <News lev5={`${level2_key}`}/>
            </div>
        </div>
    )
}
export default Ecochartnews