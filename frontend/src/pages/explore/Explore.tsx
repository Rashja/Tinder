import { useEffect, useState } from "react";
import TinderCard from "react-tinder-card";
import styles from "./Explore.module.css";
import Card from "../../components/card/Card";
import { ComponentWrapper } from "../../components/componentWrapper/ComponentWrapper";
import { apiGetRecommendations, apiLiked } from "../../apis/user/user.js";
import { toast } from "react-toastify";
import Nav from "../../components/nav/Nav.js";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export interface IUser {
  username: string;
  gender: string;
  location: number;
  university: string;
  interests: string[];
  image: string;
  _id: string;
}

function Explore() {
  const [disabledSwipe, setDisabledSwipe] = useState(["up", "down"]);
  const [users, setUsers] = useState<IUser[]>([]);

  const navigate = useNavigate();

  //------------------------- lifecycle ------------------------//
  useEffect(() => {
    apiGetRecommendations().then((res) => {
      if (res.data) {
        if (res.data.message) {
          toast.error(res.data.message, {
            position: "bottom-right",
          });
        } else {
          setUsers(res.data.users);
        }
      } else if (res.error) {
        toast.error(res.error, {
          position: "bottom-right",
        });
      }
    });
  }, []);

  const logOut = () => {
    Cookies.remove("auth_token");
    navigate("/");
  };
  //---------------------------- swipe --------------------------//
  const swiped = (direction: string, id: any) => {
    setDisabledSwipe(["up", "right", "down", "left"]);

    if (direction === "right") {
      apiLiked(true, id).then((res) => {
        if (res.data) {
          if (res?.data?.limited) {
            setDisabledSwipe(["up", "right", "down", "left"]);
            toast.error("You are out of likes", {
              position: "bottom-right",
            });
          } else {
            setDisabledSwipe(["up", "down"]);
          }
        }
      });
    } else if (direction === "left") {
      apiLiked(false, id).then((res) => {
        if (res.data) {
          setDisabledSwipe(["up", "down"]);
        }
      });
    }
  };
  //--------------------------------------------------------------//
  return (
    <>
      <Nav navAction={logOut} isLoggedIn={true} />
      <div className={styles.cardContainer}>
        {users?.map((user: IUser) => (
          <TinderCard
            preventSwipe={disabledSwipe}
            className={styles.swipe}
            key={user._id}
            onSwipe={(dir) => swiped(dir, user._id)}
          >
            <Card user={user}>
              <Card.Image />
              <Card.Title />
              <Card.Gender />
              <Card.University />
              <Card.Interests />
            </Card>
          </TinderCard>
        ))}
      </div>
    </>
  );
}

export default ComponentWrapper(Explore);
