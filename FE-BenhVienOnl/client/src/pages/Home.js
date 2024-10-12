import React from "react";
import { Layout } from "antd";
import HeaderComponent from "../components/Header/Header";
import SectionComponent from "../components/Section/Section";
import FooterComponent from "../components/component/Footer";

const { Content } = Layout;

const Home = () => {
  return (
    <Layout className="layout">
      <HeaderComponent />
      <Content style={{ padding: "0 50px" }}>
        <div className="site-layout-content" style={{ padding: "50px 0" }}>
          <SectionComponent />
        </div>
      </Content>
      <FooterComponent />
    </Layout>
  );
};

export default Home;
