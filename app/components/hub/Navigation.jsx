import React from "react";
import styles from "../../styles/hub/navigation.module.scss";
import Link from "next/link";
const Navigation = () => {
  return (
    <>
      <header className={styles.container}>
        <div className={styles.subLogo}>
          <img src="/images/subLogo.svg" alt="matchmytees.com" />
        </div>
        <div className={styles.header}>
          <div className={styles.mainLogo}>
            <img src="/images/matchMyTeesBlack.png" alt="matchmytees.com" />
          </div>
        </div>
      </header>
   
    </>
  );
};

export default Navigation;
