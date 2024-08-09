import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
    let { setProgress, apiKey, country, pageSize, category } = props;

    const capitalize = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);

    const updateNews = async () => {
        setProgress(15);
        try {
            const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`;
            setLoading(true);
            let data = await fetch(url);
            setProgress(30);
            let parsedData = await data.json();
            setProgress(70);
            setArticles(parsedData.articles || []);  // Fallback to empty array if undefined
            setTotalResults(parsedData.totalResults || 0); // Fallback to 0 if undefined
            setProgress(100);
        } catch (error) {
            console.error("Error fetching news:", error);
            setProgress(100);
        } finally {
            setLoading(false);
        }
    }

    const fetchMoreData = async () => {
        const newPage = page + 1;
        setPage(newPage);
        try {
            const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${newPage}&pageSize=${pageSize}`;
            let data = await fetch(url);
            let parsedData = await data.json();
            setArticles((prevArticles) => prevArticles.concat(parsedData.articles || [])); // Fallback to empty array if undefined
            setTotalResults(parsedData.totalResults || 0); // Fallback to 0 if undefined
        } catch (error) {
            console.error("Error fetching more data:", error);
        }
    };

    useEffect(() => {
        updateNews();
        document.title = `${capitalize(category)} - NewsFire!`;
    }, [category, apiKey, country, pageSize]);

    return (
        <>
            <h1 style={{ marginTop: '70px' }} className="text-center">NewsFire! - Top {capitalize(category)} Headlines</h1>
            {loading && <Spinner />}
            <InfiniteScroll
                dataLength={articles?.length || 0}  // Safeguard against undefined
                next={fetchMoreData}
                hasMore={articles?.length !== totalResults}
                loader={<Spinner />}
            >
                <div className="container">
                    <div className="row">
                        {articles?.map((e) => {
                            return (
                                <div className="col-md-3" key={e.url}>
                                    <NewsItem title={e.title} description={e.description} imgUrl={e.urlToImage} newsUrl={e.url} author={e.author} date={e.publishedAt} source={e.source.name} />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </InfiniteScroll>
        </>
    );
}

export default News;

News.defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general',
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
    apiKey: PropTypes.string.isRequired,
    setProgress: PropTypes.func.isRequired,
}