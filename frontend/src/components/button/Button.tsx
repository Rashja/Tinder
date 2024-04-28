import styles from "./button.module.css";

interface IButtonProps {
  name: string;
  onClick?: () => void;
  type?: "submit" | "button" | "reset";
}

const Button: React.FC<IButtonProps> = ({ name, ...rest }) => {
  return (
    <button {...rest} className={styles.btn}>
      {name}
    </button>
  );
};
export default Button;
