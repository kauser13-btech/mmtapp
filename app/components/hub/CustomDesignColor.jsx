"use client";
import React, { useState } from "react";
import styles from "../../styles/hub/customDesignColor.module.scss";
import { HexColorPicker } from "react-colorful";

const CustomDesignColor = () => {
  const [color, setColor] = useState("#FFFFFF");
  const [hide, setHide] = useState(true);
  const openColorPicker = () => {
    setHide(!hide);
  };
  return (
    <div className={styles.container}>
      <p>Choose Your Design Color</p>
      <div className={styles.content}>
        <p>Primary Layer</p>
        <div className={styles.colorContent}>
          <div className={styles.round} style={{ background: color }}></div>
          <div
            className={styles.round + " " + styles.rainbow}
            onClick={openColorPicker}
          >
            <div className={hide ? styles.hide : styles.show}>
              <HexColorPicker color={color} onChange={setColor} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomDesignColor;
