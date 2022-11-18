import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

export class News extends Component {

    static defaultProps = {
        country: "in",
        pageSize: 8,
        category: "general"
    }

    static PropType = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }
        document.title = `${this.firstLetterCapitalization(this.props.category)}- The News Monkey App`;
    }

    async updatedNews(page){
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=af97a709ba8f4e67a578c8e873cf141e&page=${this.state.page}&pagesize=${this.props.pageSize}`
        this.setState({loading: true})
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults,
        loading: false })
    }

    async componentDidMount() {
        this.updatedNews();
    }

    handlePrevClick = async () => {
    }

    handleNextClick = async () => {
        this.setState({page: this.state.page + 1});
        this.updatedNews()
    }

    firstLetterCapitalization = (e) =>{
        return e.charAt(0).toUpperCase() +e.slice(1);
    }

    render() {
        return (
            <div className="container mx-3 my-3">
                <h1 className='text-center'>NewsMonkey- Top Headlines</h1>
                {this.state.loading && <Spinner />}
                <div className="row">
                    {!this.state.loading && this.state.articles.map((element) => {
                        return <div className="col-md-4" key={element.url} >
                            <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source} />
                        </div>

                    }
                    )}
                </div>
                <div className="container my-2 d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}> &larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next&rarr;</button>
                </div>
            </div>

        )
    }
}

export default News