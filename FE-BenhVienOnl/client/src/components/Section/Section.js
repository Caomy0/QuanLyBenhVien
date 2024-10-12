import React from "react";
import { Row, Col } from "antd";
import SectionHeader from "./SectionHeader";
import SectionWithImage from "./SectionWithImage";

const Section = () => {
  return (
    <div className="section-container bg-gray-100 py-10 flex justify-center items-center">
      <div className="max-w-6xl w-full">
        <Row gutter={[16, 16]} align="middle" justify="center">
          <Col xs={24} md={12}>
            <SectionHeader />
          </Col>
          <Col xs={24} md={12}>
            <SectionWithImage />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Section;
