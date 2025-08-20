import React from "react";
import styles from "../../styles/hub/customPicker.module.scss";
import Link from "next/link";

const CustomPicker = ({ title, products }) => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <p>Pick Your {title}</p>
          <svg
            width="12"
            height="13"
            viewBox="0 0 12 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1 1L11 12" stroke="black" />
            <path d="M1 12L11 1" stroke="black" />
          </svg>
        </div>
        <input type="text" className={styles.search} placeholder="Search" />
        <div className={styles.content}>
          {products.map((product) => (
            <Link href="#" key={product.id} className={styles.item}>
              <img src={product.image} alt={product.description} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomPicker;
