const passWordErrorMessage =
  "Password must be at least 6 characters long, one uppercase letter, one lowercase letter, one number";

const useValidation = () => {
  const validatePassword = (password: string) => {
    if (password.length < 6) {
      return true;
    }
    if (!/[A-Z]/.test(password)) {
      return true;
    }
    if (!/[a-z]/.test(password)) {
      return true;
    }
    if (!/\d/.test(password)) {
      return true;
    }
    return false;
  };

  return {
    passWordErrorMessage,
    validatePassword,
  };
};

export default useValidation;
