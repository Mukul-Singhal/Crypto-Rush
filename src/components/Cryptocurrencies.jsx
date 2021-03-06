import React, { useState, useEffect } from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import { Card, Col, Row, Input } from "antd";

import { useGetCryptosQuery } from "../services/cryptoApi";

import Loader from "./Loader";

const Cryptocurrencies = ({ simplified, globalCoins }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setCryptos(cryptosList?.data?.coins);

    const filteredData = cryptosList?.data?.coins.filter((item) =>
      item.name.toLowerCase().includes(searchTerm)
    );

    setCryptos(filteredData);
  }, [cryptosList, searchTerm]);

  if (isFetching) return <Loader />;

  return (
    <>
      {!simplified && (
        <div className="search-crypto">
          <Input
            placeholder="Search Cryptocurrency"
            onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
          />
        </div>
      )}
      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos?.map((currency) => (
          <Col xs={24} sm={12} lg={6} className="crypto-card" key={currency.id}>
            <Link key={currency.id} to={`/crypto/${currency.id}`}>
              <Card
                title={`${currency.rank}. ${currency.name}`}
                extra={
                  <img
                    className="crypto-image"
                    src={currency.iconUrl}
                    alt="cryptocurrency Logo"
                  />
                }
                hoverable
              >
                <p>
                  <span className="crypto-card-info">Price</span>:{" "}
                  {millify(currency.price)}
                </p>
                <p>
                  {" "}
                  <span className="crypto-card-info">Market Cap</span>:{" "}
                  {millify(currency.marketCap)}
                </p>
                <p>
                  {" "}
                  <span className="crypto-card-info">Daily Change</span>:{" "}
                  {currency.change}%
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
