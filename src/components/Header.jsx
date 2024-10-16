import React from "react";
import styles from "../Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>One Hundred Checkboxes Challenge</h1>
      <hr className={styles.divisor} />
      <p className={styles.description}>
        Welcome to the One Hundred Checkboxes Challenge! Do you have what it
        takes to check all the boxes? This real-time game tests your speed and
        coordination as you interact with a board of 100 checkboxes that you can
        check or uncheck. Plus, all players can see your changes live, so
        collaborate or compete with others to complete the board.
      </p>
    </header>
  );
};

export default Header;
