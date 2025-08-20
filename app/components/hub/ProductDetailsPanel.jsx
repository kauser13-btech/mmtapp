import React from "react";
import styles from "../../styles/hub/productDetailsPanel.module.scss";
const ProductDetailsPanel = () => {
  return (
    <div className={styles.my-container}>
      <p className={styles.title}>Product Details</p>
      <div className={styles.content}>
        <ul>
          <li>
            <p>
              Design: <span></span>
            </p>
          </li>
          <li>
            <p>
              Sneaker: <span></span>
            </p>
          </li>
          <li>
            <p>
              Product: <span>T-shirt</span>
            </p>
          </li>
          <li>
            <p>
              Color: <span>White</span>
            </p>
          </li>
          <li>
            <p>
              Size: <span>Adult Large</span>
            </p>
          </li>
          <li>
            <p>
              Quanity:{"   "}
              <span className={styles.qContainer}>
                <span>
                  <svg
                    width="10"
                    height="2"
                    viewBox="0 0 10 2"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="10" height="2" fill="#474747" />
                  </svg>
                </span>
                <span>1</span>
                <span>
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      y="4.44446"
                      width="10"
                      height="1.11111"
                      fill="#474747"
                    />
                    <rect
                      x="4.44531"
                      y="10"
                      width="10"
                      height="1.11111"
                      transform="rotate(-90 4.44531 10)"
                      fill="#474747"
                    />
                  </svg>
                </span>
              </span>
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProductDetailsPanel;
