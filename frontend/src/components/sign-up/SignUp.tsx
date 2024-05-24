import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import Button from "../button/Button";
import Input from "../input/Input";
import styles from "./SignUp.module.css";
import { FormEvent, useState, ChangeEvent } from "react";
import { apiRegister } from "../../apis/auth/auth";
import useValidation from "../../hooks/useValidation";

interface ISignUpProps {
  closeModal: () => void;
}

const SignUp: React.FC<ISignUpProps> = ({ closeModal }) => {
  const [state, setState] = useState({
    email: "",
    password: "",
    confirmPass: "",
  });

  const { validatePassword, passWordErrorMessage } = useValidation();
  //---------------------------- Form actions ----------------------------//
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (state.password !== state.confirmPass) {
      toast.error("password and confirm password does not match", {
        position: "bottom-right",
      });
    } else if (validatePassword(state.password)) {
      toast.error(passWordErrorMessage, {
        position: "bottom-right",
      });
    } else {
      apiRegister(state.email, state.password).then((res) => {
        if (res?.data) {
          toast.success("Congrats, please log in", {
            position: "bottom-right",
          });
          setState({ email: "", password: "", confirmPass: "" });
          closeModal();
        } else if (res?.error) {
          toast.error(res.error, {
            position: "bottom-right",
          });
        }
      });
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>,
    type: string
  ): void => {
    setState({
      ...state,
      [type]: e.target.value,
    });
  };
  //---------------------------------------------------------------------//
  return (
    <>
      <h2>Welcome To Tinder</h2>
      <form role="form" onSubmit={handleSubmit}>
        <div className={styles.inputWrapper}>
          <Input
            value={state.email}
            onChange={(e) => handleChange(e, "email")}
            labelName="email"
            id="signUp-email"
            type="email"
            placeholder="Email"
          />
        </div>
        <div className={styles.inputWrapper}>
          <Input
            value={state.password}
            labelName="password"
            onChange={(e) => handleChange(e, "password")}
            id="signUp-password"
            type="password"
            placeholder="Password"
          />
        </div>
        <div className={styles.inputWrapper}>
          <Input
            value={state.confirmPass}
            labelName="confirm password"
            onChange={(e) => handleChange(e, "confirmPass")}
            id="signUp-confirmPass"
            type="password"
            placeholder="Confirm Password"
          />
        </div>
        <div className={styles.btn__modalCreateAccount}>
          <Button type="submit" name="Create Account" />
        </div>
      </form>
    </>
  );
};

export default SignUp;
