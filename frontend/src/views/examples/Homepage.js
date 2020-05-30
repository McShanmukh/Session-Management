import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {Link,useLocation,useRouteMatch} from "react-router-dom"
import "./Homepage.css";

function Homepage  () {
  // const browserURL = useLocation().pathname
  const browserHistory = useRouteMatch()
	const browserURL = browserHistory.url
  
  const url = process.env.REACT_APP_ELASTIC_URL+process.env.REACT_APP_ELASTIC_ECONOMICS_INDEX+'/_search'
  const [list, setlist]=useState([])

  useEffect(() => {
    var query = {
      "query": {
        "match_all":{}
      },
      "aggs": {
        "level2_feilds": {
          "terms": {
            "field": "Level2.keyword","size":20
          }
        }
      }
    }
    axios.post(url, query)
		.then( d => {
			if(d.status === 200 ){
				var level3 = d.data.aggregations.level2_feilds.buckets
        var list = level3.map(s => {return {"value" : s.key}})
        setlist(list)
				
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
  }, [])  
    


  const Listcreate = (item) => {
    
    const [data, setData] = useState([])
    useEffect(() => {
    var query2 = {
      "query": {
      "match": {
        "Level2.keyword": item.value
      }
      },
      "aggs": {
      "level3_feilds": {
        "terms": {
        "field": "Level3.keyword"
        }
      }
      },
      "size": 0
    }
    axios.post(url, query2)
      .then( d => {
        if(d.status === 200 ){
          var level3 = d.data.aggregations.level3_feilds.buckets
          var data = level3.map(s => {return {"value" : s.key}})
          setData(data)
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
    }, [item.value])
    var l = []
    let i=0
    for(i in data){
      
      l.push(<Link to={`${browserURL}/${item.value+"/"+data[i].value}`}>{data[i].value}</Link>)
      l.push(<br></br>)
      if(i>7)
      {
      l.push(<a className = "homepagecss" href={item.value}>more..</a>)
      break;
      }
    }

    return l;
  }
var count = 1;
var counta = 1;
var countb =1;
return (<div>
  <div className="ttle">
    <div className="lin1">
    <hr />
</div>
<div className="titl">
    TABLES
</div>
<div className="lin2">
    <hr />
</div>
</div>
  <div className="all-div">
    <div classaName="don" style={{listStyleType:"none"}}>
    <div className = "div1">
      {list.map(item => (
        count < 5 ?
        count++ &&
      <div className="div1-1">
      <li className = "homepagecss" key={item.value} style={{listStyleType:"none"}}>
        <h3 className = "homepagecss"><Link to={`${browserURL}/${item.value}`} style={{textDecoration:"none", fontSize:"larger"}}>{item.value}</Link></h3>
        <Listcreate value={item.value}/>
      </li>
      </div>
      :null
      ))}
      </div>
    <div className = "div2">
      {list.map(item => (
         ( counta >= 5 && counta < 10 ?
        counta++ &&
      <div className="div1-2">
      <li key={item.value}>
      <h3 className = "homepagecss" style={{color:"black"}} ><Link to={`${browserURL}/${item.value}`} style={{textDecoration:"none", fontSize:"larger"}}>{item.value}</Link></h3>
        <Listcreate value={item.value}/>
      </li>
      </div>
      :counta++ &&  counta<10
      )))}
      </div>
    </div>
  </div>
  </div>
)
}
export default Homepage;
