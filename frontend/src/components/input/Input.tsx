import { ChangeEvent } from "react";
import styles from "./Input.module.css";

interface IInputProps {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  id?: string;
  type: string;
  placeholder: string;
  labelName: string;
  value?: string;
}

const Input: React.FC<IInputProps> = ({ onChange, labelName, ...rest }) => {
  return (
    <label className={styles.label}>
      {labelName}
      <input
        required
        onChange={(e) => onChange(e)}
        className={styles.input}
        {...rest}
      />
    </label>
  );
};

export default Input;
