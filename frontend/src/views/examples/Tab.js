import React, {useState, useEffect} from 'react'
import axios from 'axios'
// import { forceCenter } from 'd3'
import "./Tab.css"
import DatatablePage from './sun'
// import { makeStyles } from '@material-ui/core/styles';
// import Paper from '@material-ui/core/Paper';
// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TableContainer from '@material-ui/core/TableContainer';
// import TableHead from '@material-ui/core/TableHead';
// import TablePagination from '@material-ui/core/TablePagination';
// import TableRow from '@material-ui/core/TableRow';
// import { Table } from 'semantic-ui-react'


function Tab({level3_key,level2_key}){
  const url = 'http://159.65.150.184:9200/ai_economics_v1_1/_search'
  

  const [temp, setData] = useState([])
  const [list, setlist]=useState([])

  useEffect(() => {
    console.log("data ---",level3_key)
  var query = Qur(level3_key,level2_key)


    axios.post(url, query)
		.then( d => {
			if(d.status === 200 ){
				let data = d.data.hits.hits
				var temp = {}
				for(var x in data){
					let dataobject = data[x]._source
					let key = dataobject.Level4
					if( dataobject.Level5 !== null){
					let l = [dataobject.Level5,dataobject.data]
					temp[key] = temp[key] || [];
          temp[key].push(l)
          }
				}
				
				// console.log("data",data)
        let level4 = d.data.aggregations.level4_feilds.buckets
        console.log(level4)
				let list = level4.map(s => {return {"label" : s.key ,"value" : s.key}})
				
				//console.log(list,"list")
				setlist(list)
        setData(temp)
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
  }, [level3_key])


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
        "level4_feilds": {
          "terms": {
            "field": "Level4.keyword"
          }
        }
      },
      "size":10000
    }
    return query;
  }

  

  const Tablecreate = (k) => {
    var columns= [
      {
        label: 'Year',
        field: 'Year',
        sort: 'dsc',
        width: 150
      }
    ]
    var cc=[]
    for(let i in temp[k])
    {
     let xy=(temp[k][i][0]);
     cc.push({"label":xy,"field":xy,"sort":'asc',"width":150})
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
    <DatatablePage data={tabledata}/>
    )
  }
  return (
    <div>
        <h2>{level3_key}</h2>
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
export default Tab;
