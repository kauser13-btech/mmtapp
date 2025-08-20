import React from "react";
import styles from "../../styles/hub/sidebar.module.scss";
import Link from "next/link";

const sidebar = () => {
  return (
    <>
      <aside className={styles.sideMenu}>
        <div className={styles.wrapper}>
          <Link href="#">
            <div className={styles.content}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="22"
                viewBox="0 0 40 22"
                fill="none"
              >
                <path
                  d="M16.565 5.57772L18.815 4.96204L19.765 8.2701L17.5 8.89067L16.565 5.57772ZM12.5 10.425L11.5 7.14135L13.74 6.47192L14.77 9.75556L12.5 10.425Z"
                  fill="#878787"
                />
                <path
                  d="M39.055 6.04443L37.75 5.47273L37.25 5.65352C36.3154 5.97641 35.3313 6.14165 34.34 6.14216C30.695 6.14216 27.965 3.64034 27.7 1.30466L27.615 0.547273L26.34 0L25.84 0.141705C25.7 0.180796 12 4.16807 6.655 5.77568C0.435 7.6325 0.03 13.7942 0 14.0532V21.5H39.065V6.91421V6.04443H39.055ZM7.475 8.30682C11.825 6.99727 21.745 4.10455 25.32 3.06375C26.495 6.35227 30.215 8.79545 34.325 8.79545C34.9954 8.79419 35.6645 8.73698 36.325 8.62443V14.1705H2.73C2.78 13.6232 3.3 9.56261 7.475 8.30682ZM2.725 18.8418V16.814H36.335V18.8467L2.725 18.8418Z"
                  fill="#878787"
                />
              </svg>
              <p>Sneaker</p>
            </div>
          </Link>
        </div>
      </aside>
    </>
  );
};

export default sidebar;
