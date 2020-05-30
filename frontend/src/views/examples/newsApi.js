import axios from 'axios';

export const getNews = async (q) => {

    // let q = 'Rice'
    let apiKey = 'f9b4e3aa84eb41b6bf8cbc070b959f1f'
    // let url =`https://newsapi.org/v2/top-headlines?country=in&apiKey=${apiKey}&q=${q}`;
    let url =`https://newsapi.org/v2/everything?apiKey=${apiKey}&q=${q}`;



    try {
        const {data} = await axios.get(url);
        if(data.status === "ok" ){
            let articles = data.articles
            let news_list = articles.map(article => {
                return {
                    Source : article.source.name,
                    Title : article.title,
                    Url : article.url
                }
            })

            return news_list
        }
    } 
    catch (err) {
        console.log(err)
    }
};

export const getGoogleNews = async (q) => {

    // let q = 'Rice'
    let apiKey = 'AIzaSyCfsyxlCdBE_yrvCj_4pfn6gWYC3-lJfNQ'
    let cx= '004856453172522822393:tnzydfphdjd'
    // let url =`https://www.googleapis.com/customsearch/v1?key=AIzaSyCfsyxlCdBE_yrvCj_4pfn6gWYC3-lJfNQ&cx=004856453172522822393:tnzydfphdjd&q=Rice`;
    let url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${q}`


    try {
        const {data,status} = await axios.get(url);
        if(status === 200 ){
            let articles = data.items
            let news_list = articles.map(article => {
                return {
                    Source : article.displayLink,
                    Title : article.title,
                    Url : article.link
                }
            })

            return news_list
        }
    } 
    catch (err) {
        console.log(err)
    }
};


export const getGNews = async (q) => {

    // let q = 'Rice'
    let apiKey = '3dfeeb4c2af8a8512f9ba96f380ce54b'
    let url= `https://gnews.io/api/v3/search?q=${q}&token=${apiKey}&lang=en&country=in&max=10`


    try {
        const {data,status} = await axios.get(url);
        if(status === 200 ){
            let articles = data.articles
            let news_list = articles.map(article => {
                return {
                    Source : article.source.name,
                    Title : article.title,
                    Url : article.url
                }
            })

            return news_list
            // console.log(articles)
        }
    } 
    catch (err) {
        console.log(err)
    }
};