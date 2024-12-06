import React from "react";
import styles from "./index.module.css";

interface MaskProps {
  children: React.ReactNode;
}

const Mask: React.FC<MaskProps> = ({ children }) => {
  return <div className={styles.mask}>{children}</div>;
};

export default Mask;
