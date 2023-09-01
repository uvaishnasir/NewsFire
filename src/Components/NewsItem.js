import React from 'react'

const NewsItem = (props)=>{
    let { title, description, imgUrl, newsUrl, author, date, source } = props;
    return (
        <div className="my-3">
            <div className="card">
            <span className="badge text-dark bg-light">{source}</span>
                <img style={{height:'170px'}} src={imgUrl ? imgUrl:"https://play-lh.googleusercontent.com/8LYEbSl48gJoUVGDUyqO5A0xKlcbm2b39S32xvm_h-8BueclJnZlspfkZmrXNFX2XQ"} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{title?title.slice(0,35):"No title"}...</h5>
                    <p className="card-text">{description?description.slice(0,50):"No Description"}....</p>
                    <p className="card-text"><small className="text-muted">By {author?author:"Unknown"} on  {new Date(date).toGMTString()}</small></p>
                    <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
                </div>
            </div>
        </div>
    )
}
export default NewsItem;