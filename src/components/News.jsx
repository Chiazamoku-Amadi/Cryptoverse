/* eslint-disable react/prop-types */
import { Card, Col, Row, Select, Typography } from "antd";
import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";
import { useGetCryptosQuery } from "../services/cryptoApi";
import moment from "moment";

import { useState } from "react";
import Loader from "./Loader";

const { Text, Title } = Typography;
const { Option } = Select;

const demoImage =
  "http://coinrevolution.com/wp-content/uploads/2020/06/cryptonews.jpg";

const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState("cryptocurrency");
  const {
    data: cryptoNews,
    isFetching,
    error,
  } = useGetCryptoNewsQuery({
    newsCategory,
    count: simplified ? 6 : 100,
  });
  const { data } = useGetCryptosQuery(100);

  if (isFetching) {
    return <Loader />;
  } else if (error) {
    console.error("Something went wrong:", error);
    return "Oops!!! Something went wrong 😓";
  }

  console.log(cryptoNews.articles);

  return (
    <div>
      <Row gutter={[24, 24]}>
        {!simplified && (
          <Col span={24}>
            <Select
              showSearch
              className="select-news"
              placeholder="Select a Crypto"
              optionFilterProp="children"
              onChange={(value) => setNewsCategory(value)}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              <Option value="cryptocurrency">Cryptocurrency</Option>
              {data?.data?.coins.map((coin) => (
                <Option value={coin?.name} key={coin?.uuid}>
                  {coin?.name}
                </Option>
              ))}
            </Select>
          </Col>
        )}
        {cryptoNews.articles.map((news, index) => (
          <Col xs={24} sm={12} lg={8} key={index}>
            <Card hoverable className="news-card">
              <a href={news?.url} target="_blank" rel="nonreferrer">
                <div className="news-image-container">
                  <img
                    style={{
                      maxWidth: "30%",
                      maxHeight: "100%",
                    }}
                    src={news?.urlToImage || demoImage}
                    alt="news"
                  />
                  <Title className="news-title" level={4}>
                    {news?.title.length > 40
                      ? `${news?.title.substring(0, 40)}...`
                      : news?.title}
                  </Title>
                </div>
                <p>
                  {news.description?.length > 100
                    ? `${news?.description.substring(0, 100)}...`
                    : news?.description}
                </p>
                <div className="source-container">
                  <Text>{news?.author}</Text>
                  <Text>{moment(news?.publishedAt).fromNow()}</Text>
                </div>
              </a>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default News;
