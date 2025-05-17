import Link from "next/link";
import styles from "./Header.module.scss";
import Select from "../select/Select";

const languageOptions = [
  { label: "English", value: "en" },
  { label: "Español", value: "es" },
  { label: "Italiano", value: "it" },
];

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.header__inner}>
          <Link className={styles.logo} href="/">
            Piksta
          </Link>
          <div className={styles.header__actions}>
            <Select options={languageOptions} />
            <div className={styles.registration}>
              <div className="login">login</div>
              <div className="signup">signup</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;
