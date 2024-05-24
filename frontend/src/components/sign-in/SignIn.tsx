import { FormEvent, useState, ChangeEvent } from "react";
import Cookies from "js-cookie";
import { apiLogIn } from "../../apis/auth/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Button from "../button/Button";
import Input from "../input/Input";
import styles from "./SignIn.module.css";

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  //---------------------------- Form actions ----------------------------//
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    apiLogIn(state.email, state.password).then((res) => {
      if (res?.data) {
        Cookies.set("auth_token", res.data.token);
        navigate("/profile");
      } else if (res?.error) {
        toast.error(res.error, {
          position: "bottom-right",
        });
      }
    });
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>, type: string) => {
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
            onChange={(e) => handleChange(e, "email")}
            labelName="email"
            id="signIn-email"
            type="email"
            placeholder="Email"
          />
        </div>
        <div className={styles.inputWrapper}>
          <Input
            labelName="password"
            onChange={(e) => handleChange(e, "password")}
            id="signIn-password"
            type="password"
            placeholder="Password"
          />
        </div>
        <div className={styles.btn__modalCreateAccount}>
          <Button type="submit" name="Log In" />
        </div>
      </form>
    </>
  );
};

export default SignIn;
