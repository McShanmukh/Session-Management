import React, { useEffect, useState } from "react";
import axios from "axios";
import {useParams, Link,useLocation,useRouteMatch} from "react-router-dom"


function Leftdivision(props) {
	const browserHistory = useRouteMatch()
	const browserURL = browserHistory.url
const params = useParams()
const level2key=params.level2key
const [list, setData] = useState([]);

  useEffect(() => {
    var url ='http://159.65.150.184:9200/ai_economics_v1_1/_search';

	var query = {
	  "query": {
		"match": {
		  "Level2.keyword": level2key
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
	
	axios.post(url, query)
		.then( d => {
			if(d.status === 200 ){
				var level3 = d.data.aggregations.level3_feilds.buckets
				var list = level3.map(s => {return {"label" : s.key ,"value" : s.key}})
				
        console.log(list)
        setData (list)
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
    
  }, [level2key]);
  console.log(list)

  return (
    <div>
		<Link to={`/AI-Economics/${level2key}`} style={{textDecoration:"none",fontSize:30}}>{level2key}<br></br></Link>
      {console.log(list)}
      
        {list.map(item => (
		 <Link to={`${browserURL}/${item.value}`}>{item.value}<br>
		 </br></Link>
        ))}
      
    </div>
  );
}
export default Leftdivision