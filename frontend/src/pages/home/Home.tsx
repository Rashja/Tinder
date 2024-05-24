import { useState } from "react";
import styles from "./Home.module.css";
import Button from "../../components/button/Button";
import Nav from "../../components/nav/Nav";
import Modal from "../../components/modal/Modal";
import SignUp from "../../components/sign-up/SignUp";
import SignIn from "../../components/sign-in/SignIn";
import { ComponentWrapper } from "../../components/componentWrapper/ComponentWrapper";

const Home = () => {
  const [showModalSignUp, setShowModalSignUp] = useState(false);
  const [showModalSignIn, setShowModalSignIn] = useState(false);
  //-------------------------- Modal actions ------------------------//
  const handleOpenSignUp = () => {
    setShowModalSignUp(true);
  };

  const handleOpenSignIn = () => {
    setShowModalSignIn(true);
  };

  const handleCloseSignUp = () => {
    setShowModalSignUp(false);
  };
  //----------------------------------------------------------------//
  return (
    <div className={styles.home}>
      <Nav navAction={handleOpenSignIn} isLoggedIn={false} />
      <Modal showModal={showModalSignUp} setShowModal={setShowModalSignUp}>
        <SignUp closeModal={handleCloseSignUp} />
      </Modal>
      <Modal showModal={showModalSignIn} setShowModal={setShowModalSignIn}>
        <SignIn />
      </Modal>
      <div className={styles.content}>
        <h1>Sweep Right !</h1>
        <div className={styles.btn__createAccount}>
          <Button
            type="button"
            onClick={handleOpenSignUp}
            name="Create Account"
          />
        </div>
      </div>
    </div>
  );
};

export default ComponentWrapper(Home);
