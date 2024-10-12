import React from "react";
import { Layout, Row, Col } from "antd";
import Navigation from "./Navigation";
import UserMenu from "./UserMenu";

const { Header } = Layout;

const HeaderComponent = () => {
  return (
    <Header className="header">
      <Row align="middle">
        <Col span={4}>
          <div className="logo">
            <a href="/">MyCompany</a>
          </div>
        </Col>
        <Col span={16}>
          <Navigation />
        </Col>
        <Col span={4}>
          <UserMenu />
        </Col>
      </Row>
    </Header>
  );
};

export default HeaderComponent;
