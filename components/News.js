import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setarticles] = useState([])
  const [totalResults, settotalResults] = useState(0)
  const [loading, setLoading] = useState(false)
  const [page, setpage] = useState(1)

  const updateNews = async () => {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page}&pagesize=${props.pageSize}`;
    setLoading({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    setarticles(parsedData.articles);
    settotalResults(parsedData.totalResults)
    setLoading(false)
    props.setProgress(100)
  };
  // const handleNextPage = async () => {
  //   setpage(page + 1,);
  //   updateNews();
  // };
  // const handlePrevPage = async () => {
  //   setpage(page - 1);
  //   updateNews();
  // };
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page + 1}&pagesize=${props.pageSize}`;
    setpage(page + 1);
    let data = await fetch(url);
    let parsedData = await data.json();
    setarticles(articles.concat(parsedData.articles))
    settotalResults(parsedData.totalResults);
  };
  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)} - Fake news`;
    updateNews();
    // eslint-disable-next-line
  }, [])
  return (
    <>
      <h1 className="text-center" style={{ margin: "30px", marginTop: "90px" }}>
        News Today-Top {capitalizeFirstLetter(props.category)}{" "}
        HeadLines{" "}
      </h1>
      {loading && <Spinner />}
      <InfiniteScroll style={{ height: "auto;/*", overflow: "auto; */" }}
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="container" >
          <div className="row">
            {articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title.slice(0, 45) : ""}
                    description={
                      element.description ? element.description : ""
                    }
                    imgUrl={
                      element.urlToImage
                        ? element.urlToImage
                        : "https://th.bing.com/th/id/OIP.RBeXsiliJ3p1HWrEL24skQHaEo?rs=1&pid=ImgDetMain"
                    }
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
}
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};
News.defaultProps = {
  country: "in",
  pageSize: 8,
  category: "general"
};
export default News;
