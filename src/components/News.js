import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";



const News = (props) => {
    const [articles, setarticles] = useState([])
    const [loading, setloading] = useState(true)
    const [page, setpage] = useState(1)
    const [totalResults, settotalResults] = useState(0)
    // document.title = `${firstLetterCapitalization(props.category)}- The News Monkey App`;
    
    const updatedNews = async ()=> {
        props.setProgress(20);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pagesize=${props.pageSize}`
        setloading(true)
        let data = await fetch(url);
        props.setProgress(50);
        let parsedData = await data.json();
        props.setProgress(70);
        setarticles(parsedData.articles);
        settotalResults(parsedData.totalResults);
        setloading(false);
        props.setProgress(100);
    }

    useEffect(() => {
        updatedNews(); 
    }, [])


    // const firstLetterCapitalization = (e) => {
    //     return e.charAt(0).toUpperCase() + e.slice(1);
    // }

    const fetchMoreData = async () => {
        setpage(page+1)
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pagesize=${props.pageSize}`
        let data = await fetch(url);
        let parsedData = await data.json();
        setarticles(articles.concat(parsedData.articles))
        settotalResults(parsedData.totalResults)
    };

        return (
            <>
                <div className="container mx-3 my-3">
                    <h1 className='text-center'>NewsMonkey- Top Headlines</h1>
                    {loading && <Spinner />}

                    <InfiniteScroll style={{ overflow: "hidden" }}
                        dataLength={articles.length}
                        next={fetchMoreData}
                        hasMore={articles.length !== totalResults}
                        loader={<Spinner />}
                    >
                        <div className="container">
                            <div className="row">
                                {articles.map((element) => {
                                    return <div className="col-md-4" key={element.url} >
                                        <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source} />
                                    </div>
                                }
                                )}
                            </div>
                        </div>
                    </InfiniteScroll>
                </div>
            </>
        )
}

News.defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general"
}

News.PropType = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}


export default News