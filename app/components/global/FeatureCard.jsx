import Image from 'next/image'
import styles from "../../styles/common/featureCard.module.scss";

const FeatureCard = ({icon, title, subtitel}) => {
  return (
    <div className={styles.container}>
        <img src={icon} alt={title} width={24} height={24}  />
        <div className={styles.featureText}>
            <h3>{title}</h3>
            <p>{subtitel}</p>
        </div>
    </div>
  )
}

export default FeatureCard