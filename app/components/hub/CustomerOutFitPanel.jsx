import React from "react";
import styles from "../../styles/hub/customerOutFitPanel.module.scss";
const CustomerOutFitPanel = () => {
  return (
    <div className={styles.container}>
      <img
        src="/images/hub/customerOutFit/image1.webp"
        className={styles.outfit}
        alt="T-shirt"
      />
      <img
        src="/images/hub/customerOutFit/image2.webp"
        className={styles.sneaker}
        alt="nike-shoe"
      />
    </div>
  );
};

export default CustomerOutFitPanel;
