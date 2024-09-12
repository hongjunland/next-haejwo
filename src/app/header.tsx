import React from "react";
import styles from "./header.module.css"; // CSS 모듈 import
import Link from "next/link";
import Image from "next/image";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <Link href={"/"}>
          <Image
            src={"/brand.svg"}
            alt={"Brand Logo"}
            width={40}
            height={40}
            className={styles.brandStyle}
          />
        </Link>
      </div>
    </header>
  );
};

export default Header;
