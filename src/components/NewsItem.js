import React, { Component } from 'react'

export class NewsItem extends Component {

    render() {
        let { title, description, imageUrl, newsUrl, author, date, source } = this.props;
        return (
            <div className="my-3">
                <div className="card">
                    <span class="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left: "86%", zIndex: "1"}}>
                        {source.name}
                    </span>
                    <img src={!imageUrl ? "https://images.hindustantimes.com/img/2022/11/16/1600x900/elon_musk_twitter_rehires_sacked_employees_tweet_1668572478140_1668572478382_1668572478382.JPG" : imageUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}...</h5>
                        <p className="card-text">{description}...</p>
                        <a rel="noopener noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
                        <p className="card-text my-3"><small className="text-muted">By {!author ? "Unknown" : author} on {new Date(date).toGMTString
                            ()} </small></p>

                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem