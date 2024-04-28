import styles from "./Nav.module.css";
import Button from "../button/Button";

interface INavProps {
  isLoggedIn: boolean;
  navAction?: () => void;
}

const Nav: React.FC<INavProps> = ({ isLoggedIn, navAction }) => {
  return (
    <div className={styles.container}>
      <div className={styles.btnContainer}>
        <Button onClick={navAction} name={isLoggedIn ? "Log out" : "Log in"} />
      </div>
    </div>
  );
};

export default Nav;
