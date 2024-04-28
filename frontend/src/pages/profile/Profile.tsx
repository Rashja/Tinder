import { ChangeEvent, FormEvent, useState } from "react";
import Input from "../../components/input/Input";
import styles from "./Profile.module.css";
import Button from "../../components/button/Button";
import profileImage from "../../assets/images/profile.png";
import { apiUpdateUser } from "../../apis/user/user";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ComponentWrapper } from "../../components/componentWrapper/ComponentWrapper";

enum Gender {
  FEMALE = "FEMALE",
  MALE = "MALE",
}

interface IProfileState {
  username: string;
  university: string;
  image: string;
  gender: Gender;
  interests: string[];
  distance: number;
  genderInterested: string;
}

const interestsOptions = [
  "HIKING",
  "SKI",
  "LEARNING",
  "DRAWING",
  "DANCE",
  "PAINTING",
];

const Profile = () => {
  const navigate = useNavigate();
  const [state, setState] = useState<IProfileState>({
    username: "",
    university: "",
    image: profileImage,
    gender: Gender.MALE,
    interests: [],
    distance: 0,
    genderInterested: Gender.FEMALE,
  });
  /* -------------------- Profile image -------------------- */
  const renderProfileImage = (): JSX.Element => (
    <div className={styles.imgWrapper}>
      <img src={state.image} alt="profile-image" />
    </div>
  );
  /* ------------------------ Forms ------------------------ */
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const {
      username,
      university,
      image,
      interests,
      gender,
      genderInterested,
      distance,
    } = state;
    apiUpdateUser({
      username,
      university,
      image,
      interests,
      gender,
      genderInterested,
      distance,
    }).then((res) => {
      if (res.data) {
        navigate("/explore");
      } else if (res.error) {
        toast.error(res.error, {
          position: "bottom-right",
        });
      }
    });
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    type: string
  ): void => {
    setState({
      ...state,
      [type]: e.target.value,
    });
  };

  const renderUsernameAndUni = (): JSX.Element => (
    <div className={styles.wrapper}>
      <div className={styles.inputWrapper}>
        <Input
          onChange={(e) => handleChange(e, "username")}
          labelName="Username"
          id="username"
          type="Text"
          placeholder="Enter your Username"
        />
      </div>
      <div className={styles.inputWrapper}>
        <Input
          labelName="university"
          onChange={(e) => handleChange(e, "university")}
          id="university"
          type="text"
          placeholder="Enter your university"
        />
      </div>
    </div>
  );

  const renderInputImageAndGender = (): JSX.Element => (
    <div className={styles.imageGenderWrapper}>
      <div className={styles.inputWrapper}>
        <Input
          labelName="Image Url"
          onChange={(e) => handleChange(e, "image")}
          id="image"
          type="text"
          placeholder="Enter your image url"
        />
      </div>
      <label className={styles.genderLabel}>
        Gender
        <select
          className={styles.dropdown}
          value={state.gender}
          onChange={(e) => handleChange(e, "gender")}
          id="gender"
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </label>
    </div>
  );

  const renderGenderInterestsAndLocationRange = (): JSX.Element => (
    <div className={styles.imageGenderWrapper}>
      <div className={styles.inputWrapper}>
        <Input
          labelName="Enter your Range"
          onChange={(e) => handleChange(e, "distance")}
          id="distance"
          type="text"
          placeholder="EX: 50"
        />
      </div>
      <label className={styles.genderLabel}>
        interested in
        <select
          className={styles.dropdown}
          value={state.genderInterested}
          onChange={(e) => handleChange(e, "genderInterested")}
          id="genderInterested"
        >
          <option value="female">Female</option>
          <option value="male">Male</option>
        </select>
      </label>
    </div>
  );
  /* ------------------------ Interests ------------------------ */
  const handleInterest = (value: string): void => {
    if (state.interests.includes(value)) {
      setState({
        ...state,
        interests: state.interests.filter((item) => item !== value),
      });
    } else {
      setState({
        ...state,
        interests: [...state.interests, value],
      });
    }
  };

  const renderInterests = (): JSX.Element => (
    <>
      <p>interests</p>
      <div className={styles.gridContainer}>
        {interestsOptions.map((interest) => (
          <div
            onClick={() => handleInterest(interest.toUpperCase())}
            className={
              state.interests.includes(interest)
                ? styles.interestsSelected
                : styles.gridItem
            }
            key={interest}
          >
            {interest}
          </div>
        ))}
      </div>
    </>
  );

  /* ------------------------------------------------------- */
  return (
    <div className={styles.container}>
      <h1 className={styles.header}>
        Complete your profile for better matches
      </h1>
      <form onSubmit={handleSubmit}>
        {renderProfileImage()}
        {renderUsernameAndUni()}
        {renderInputImageAndGender()}
        {renderGenderInterestsAndLocationRange()}
        {renderInterests()}
        <div className={styles.btn__profile}>
          <Button type="submit" name="Confirm" />
        </div>
      </form>
    </div>
  );
};

export default ComponentWrapper(Profile);
