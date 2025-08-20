import React from "react";
import MoreInThisCollectionCard from "./moreDesignInCollection/MoreInThisCollectionCard";
import styles from "../../styles/collection/moreInThisCollection.module.scss";

const MoreInThisCollection = () => {
  return (
    <div className={styles.moreInThisCollection}>
      <h3>More design in this collection</h3>
      <MoreInThisCollectionCard />
      <h3>More design in this collection</h3>
      <MoreInThisCollectionCard />
    </div>
  );
};

export default MoreInThisCollection;
