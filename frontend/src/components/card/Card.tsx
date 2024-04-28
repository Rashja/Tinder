// libraries
import React, { ReactNode, useContext } from "react";
import { IUser } from "../../pages/explore/Explore";
import styles from "./Card.module.css";

/* ---------------------- context configues -------------------- */

const cardContext = React.createContext<IUser>({
  username: "",
  gender: "",
  location: 0,
  university: "",
  interests: [],
  image: "",
  _id: "",
});

const useCardContext = () => {
  const context = useContext<IUser>(cardContext);
  if (!context) {
    throw new Error(
      `Card compound components cannot be rendered outside the card component`
    );
  }
  return context;
};

/* ------------------------ Card ------------------------ */
interface ICard {
  children: ReactNode;
  user: IUser;
}

const Card = ({ children, user }: ICard) => {
  const value = { ...user };

  return (
    <>
      <cardContext.Provider value={value}>
        <div className={styles.cardContainer}>{children}</div>
      </cardContext.Provider>
    </>
  );
};

/* ------------------------ Image ------------------------ */
const Image: React.FC = () => {
  const { image } = useCardContext();

  return (
    <div className={styles.imageTemplate}>
      <img className={styles.image} src={image} alt="Profile" />
    </div>
  );
};

/* ------------------------ Title ------------------------ */
const Title: React.FC = () => {
  const { username, location } = useCardContext();

  return (
    <div className={styles.title}>
      <h1 className={styles.cardName}>{username}</h1>
      <p>({location} miles away)</p>
    </div>
  );
};
/* ------------------------ University ------------------------ */
const University: React.FC = () => {
  const { university } = useCardContext();

  return <p className={styles.detail}>University: {university}</p>;
};
/* ------------------------ Gender ------------------------ */
const Gender: React.FC = () => {
  const { gender } = useCardContext();

  return <p className={styles.detail}>Gender: {gender}</p>;
};
/* ------------------------ Interests ------------------------ */
const Interests: React.FC = () => {
  const { interests } = useCardContext();

  return (
    <>
      <p className={styles.detail}>Interests</p>
      <div className={styles.gridContainer}>
        {interests.map((interest) => (
          <div className={styles.gridItem} key={interest}>
            {interest}
          </div>
        ))}
      </div>
    </>
  );
};

Card.Image = Image;
Card.Title = Title;
Card.Gender = Gender;
Card.Interests = Interests;
Card.University = University;

export default Card;
