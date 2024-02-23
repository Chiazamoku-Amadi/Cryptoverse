/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useGetCryptosQuery } from "../services/cryptoApi";
import { Card, Col, Input, Row } from "antd";
import { Link } from "react-router-dom";
import millify from "millify";
import Loader from "./Loader";

const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptosList, isFetching, error } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const filteredData = cryptosList?.data?.coins.filter((coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setCryptos(filteredData);
  }, [cryptosList, searchTerm]);

  if (isFetching) {
    return <Loader />;
  } else if (error) {
    console.error("Something went wrong:", error);
    return "Oops!!! Something went wrong 😓";
  }

  console.log(cryptos);

  return (
    <>
      {!simplified && (
        <div className="search-crypto">
          <Input
            placeholder="Search Cryptocurrency"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}
      <Row gutter={[16, 16]} className="crypto-card-container">
        {cryptos?.map((currency) => (
          <Col
            xs={24}
            sm={12}
            lg={6}
            className="crypto-card"
            key={currency?.uuid}
          >
            <Link to={`/crypto/${currency?.uuid}`}>
              <Card
                title={`${currency?.rank}. ${currency?.name}`}
                extra={<img className="crypto-image" src={currency?.iconUrl} />}
                hoverable
              >
                <p className="crypto-card-text">
                  Price: {millify(currency?.price)}
                </p>
                <p className="crypto-card-text">
                  Market Cap: {millify(currency?.marketCap)}
                </p>
                <p className="crypto-card-text">
                  Daily Change: {millify(currency?.change)}%
                </p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Cryptocurrencies;
