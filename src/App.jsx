import { Layout, Space, Typography } from "antd";
import { Link, Route, Routes } from "react-router-dom";

import "./App.css";
import {
  Navbar,
  HomePage,
  Cryptocurrencies,
  CryptoDetails,
  News,
} from "./components";

const { Title } = Typography;

function App() {
  return (
    <div className="app">
      <div className="navbar">
        <Navbar />
      </div>

      <div className="main">
        <Layout>
          <div className="routes">
            <Routes>
              <Route exact path="/" element={<HomePage />} />
              <Route
                exact
                path="/cryptocurrencies"
                element={<Cryptocurrencies />}
              />
              <Route exact path="/crypto/:coinId" element={<CryptoDetails />} />
              <Route exact path="/news" element={<News />} />
            </Routes>
          </div>
        </Layout>

        <div className="footer">
          <Title level={5} style={{ color: "white", textAlign: "center" }}>
            Cryptoverse <br />
            All Rights Reserved
          </Title>
          <Space>
            <Link to="/">Home</Link>
            <Link to="/cryptocurrencies">Cryptocurrencies</Link>
            <Link to="/news">News</Link>
          </Space>
        </div>
      </div>
    </div>
  );
}

export default App;
