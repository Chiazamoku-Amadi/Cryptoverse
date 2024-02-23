import { Avatar, Button, Menu, Typography } from "antd";
import {
  BulbOutlined,
  FundOutlined,
  HomeOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

import icon from "../images/cryptocurrency.png";
import { useEffect, useState } from "react";

const { Title } = Typography;

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(null);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (screenSize < 768) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  const items = [
    {
      label: <Link to="/">Home</Link>,
      icon: <HomeOutlined />,
      key: "home",
    },
    {
      label: <Link to="/cryptocurrencies">Cryptocurrencies</Link>,
      icon: <FundOutlined />,
      key: "cryptocurrencies",
    },
    {
      label: <Link to="/news">News</Link>,
      icon: <BulbOutlined />,
      key: "news",
    },
  ];

  return (
    <div className="nav-container">
      <div className="logo-container">
        <Avatar src={icon} size="large" />
        <Title level={2} className="logo">
          <Link to="/">Cryptoverse</Link>
        </Title>
        <Button
          className="menu-control-container"
          onClick={() => setActiveMenu(!activeMenu)}
        >
          <MenuOutlined />
        </Button>
      </div>

      {activeMenu && <Menu mode="vertical" theme="dark" items={items} />}
    </div>
  );
};

export default Navbar;
