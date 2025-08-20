import React from "react";
import styles from "../../styles/hub/customOutFit.module.scss";
const CustomOutFit = () => {
  return (
    <div className={styles.container}>
      <p>Choose Your Outfits</p>
      <select
        id="outfit"
        className={styles.selection}
        onfocus="this.size=6;"
        onblur="this.size=0;"
        onchange="this.size=1; this.blur()"
      >
        <option value="White" className={styles.option}>
          White T-shirt
        </option>
        <option value="Blue" className={styles.option}>
          Blue T-shirt
        </option>
        <option value="Green" className={styles.option}>
          Green T-shirt
        </option>
        <option value="Yellow" className={styles.option}>
          Yellow T-shirt
        </option>
      </select>

      <select id="outfit" className={styles.selection}>
        <option value="AL" className={styles.option}>
          Adult Large
        </option>
        <option value="AS" className={styles.option}>
          Adult Small
        </option>
        <option value="AXL" className={styles.option}>
          Adult Double XL
        </option>
        <option value="ATXL" className={styles.option}>
          Adult Triple XL
        </option>
      </select>
    </div>
  );
};

export default CustomOutFit;
