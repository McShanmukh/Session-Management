import React, {useState, useEffect} from 'react';
import {getNews,getGoogleNews,getGNews} from './newsApi'
import DatatablePage from './sun';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
function News(){
    const [list,setNews] = useState([]);
    const params=useParams()
    let lev5=params.lev5

    useEffect(() => {
        const fetchNewsOrgAPI = async (q) => {
            let news_data = await getNews(q);
            setNews(news_data)
        }

        const fetchGoogleAPI = async (q) => {
            let news_data = await getGoogleNews(q);
            setNews(news_data)
        }

        const fetchGNewsAPI = async (q) => {
            let news_data = await getGNews(q);
            setNews(news_data)
        }

        // fetchNewsOrgAPI("Rice Production");
        // fetchGoogleAPI("Rice Production")
        fetchGNewsAPI({lev5})
        // getNews()
        
      },[])
      var columns= [
        {
          label: 'Title',
          field: 'Title',
          sort: 'asc',
          width: 150
        },
        {
          label: 'Url',
          field: 'Url',
          sort: 'asc',
          width: 150
        },
        {
            label: 'Source',
            field: 'Source',
            sort: 'asc',
            width: 80
          }
      ]
      let rows=[]
      console.log(list)
      for(let i in list)
      {
        rows.push({"Title":list[i].Title,"Url":<a href={list[i].Url} target="_blank" style={{color:"green"}}>{list[i].Url}</a>,"Source":list[i].Source})
      }
      var data={columns,rows}
      console.log(data)

    
    return (
    <div>
        
        <div>
            <h1>news</h1>
            <DatatablePage data={data} xscrolling={true} yscrolling={true} />
        </div>
        
        
    </div>
    )
}

export default News;