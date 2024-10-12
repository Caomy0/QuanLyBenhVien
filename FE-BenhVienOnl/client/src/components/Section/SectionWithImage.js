import React from "react";
import { Image } from "antd";

const SectionWithImage = () => {
  return (
    <div className="section-image text-center">
      <Image
        width={400}
        src="https://diag.vn/wp-content/uploads/2024/07/eb6b9a9a-product-panels_wellness-496x310--diag-thumb.png" // Đặt đường dẫn đến hình ảnh của bạn
        alt="Family Wellness Checkup"
      />
    </div>
  );
};

export default SectionWithImage;
