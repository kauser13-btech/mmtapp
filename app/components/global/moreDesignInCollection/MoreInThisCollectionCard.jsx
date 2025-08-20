import React from "react";
import styles from "../../../styles/collection/moreInThisCollection.module.scss";
import Link from "next/link";

const data = [
  {
    id: 1,
    imageSrc: "/images/promotional/promotion.png",
    altText: "Out T-shirt Airlume Combed & Ring-Spun Cotton",
    title: "Out T-shirt Airlume Combed & Ring-Spun Cotton",
    link: "#",
  },
  {
    id: 2,
    imageSrc: "/images/promotional/promotion.png",
    altText: "Out T-shirt Airlume Combed & Ring-Spun Cotton",
    title: "Out T-shirt Airlume Combed & Ring-Spun Cotton",
    link: "#",
  },
  {
    id: 3,
    imageSrc: "/images/promotional/promotion.png",
    altText: "Out T-shirt Airlume Combed & Ring-Spun Cotton",
    title: "Out T-shirt Airlume Combed & Ring-Spun Cotton",
    link: "#",
  },
  // Add more data objects as needed
];

const MoreInThisCollectionCard = () => {
  return (
    <div className={styles.mainContainer}>
      <div>
        {data.map((item, index) => (
          <div
            key={item.id}
            className={styles.container}
            // Apply different styles for even and odd index items
          >
            <img
              className={styles.promotionalImages}
              src={item.imageSrc}
              alt={item.altText}
            />
            <div className={styles.contentRight}>
              <h3>{item.title}</h3>
            </div>
          </div>
        ))}
      </div>
      <Link href={"/#"} className={styles.buttonCard}>
        Load more
      </Link>
    </div>
  );
};

export default MoreInThisCollectionCard;
