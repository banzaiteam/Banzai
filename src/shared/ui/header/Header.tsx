import Link from "next/link";
import styles from "./Header.module.scss";
import Select from "../select/Select";
import { FlagRussia, FlagUnitedKingdom } from "@/assets/icons/components";
import { useState } from "react";

const languageOptions = [
  { label: "English", value: "en", flag: <FlagUnitedKingdom /> },
  { label: "Russian", value: "ru", flag: <FlagRussia /> },
];

const Header: React.FC = () => {
  const [value, setValue] = useState(languageOptions[0].value);
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.header__inner}>
          <Link className={styles.logo} href="/">
            Piksta
          </Link>
          <div className={styles.header__actions}>
            <Select
              options={languageOptions}
              value={value}
              onValueChange={setValue}
            />
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
