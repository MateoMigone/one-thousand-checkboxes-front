import React from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import styles from "../Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>Thank you for playing the One Hundred Checkboxes Challenge!</p>
      <p>
        Developed by
        <a href="https://github.com/MateoMigone" target="blank">
          <GitHubIcon /> MateoMigone
        </a>
      </p>
    </footer>
  );
};

export default Footer;
