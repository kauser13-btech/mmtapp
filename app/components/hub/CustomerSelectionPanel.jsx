import React from "react";
import CustomOutFit from "./CustomOutFit";
import CustomDesignColor from "./CustomDesignColor";
import ProductDetailsPanel from "./ProductDetailsPanel";
import styles from "../../styles/hub/customerSelectionPanel.module.scss";
const CustomerSelectionPanel = () => {
  return (
    <div className={styles.container}>
      <CustomOutFit />
      <CustomDesignColor />
      <ProductDetailsPanel />
    </div>
  );
};

export default CustomerSelectionPanel;
