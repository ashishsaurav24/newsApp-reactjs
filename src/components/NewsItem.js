import React  from 'react'

const NewsItem = (props)=> {
        let { title, description, imageUrl, link, creator, date, source } = props;
        return (
            <div className="my-3">
                <div className="card">
                    <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left: "86%", zIndex: "1"}}>
                        {source.name}
                    </span>
                    <img src={!imageUrl ? "https://www.shutterstock.com/image-vector/background-screen-saver-on-breaking-600w-723749530.jpg" : imageUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}...</h5>
                        <p className="card-text">{description}...</p>
                        <a rel="noopener noreferrer" href={link} target="_blank" className="btn btn-sm btn-dark">Read More</a>
                        <p className="card-text my-3"><small className="text-muted">By {!creator ? "Unknown" : creator} on {new Date(date).toGMTString
                            ()} </small></p>

                    </div>
                </div>
            </div>
        )
}

export default NewsItem