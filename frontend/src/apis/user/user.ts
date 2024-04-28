import { api } from "../index";
import Cookies from "js-cookie";

const REGISTER_URL = "/users/update";
const PROFILE_COMPLETE = "/users/profile-complete";
const GET_RECOMMENDATIONS = "/users/recommendations";
const LIKE_URL = "/users/like";

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

interface IUpdateUser {
  username: string;
  interests: string[];
  university: string;
  image: string;
  gender: string;
  genderInterested: string;
  distance: number;
}

export const apiUpdateUser = async ({
  username,
  university,
  interests,
  image,
  gender,
  genderInterested,
  distance,
}: IUpdateUser) => {
  try {
    const data = {
      username,
      university,
      interests,
      image,
      gender,
      genderInterested,
      distance,
    };
    const res = await api.post(REGISTER_URL, data, {
      headers: {
        ...headers,
        Authorization: "Bearer " + Cookies.get("auth_token"),
      },
      withCredentials: true,
    });
    return {
      data: res.data.message,
      error: null,
    };
  } catch (error: any) {
    let errorMessage;
    if (Array.isArray(error?.response?.data?.message)) {
      errorMessage = error?.response?.data?.message
        ?.map((item: any) => item.msg)
        ?.join(", ");
    } else if (typeof error?.response?.data?.message === "string") {
      errorMessage = error?.response?.data?.message;
    }
    return {
      data: null,
      error: errorMessage || error.message,
    };
  }
};

export const apiProfileComplete = async () => {
  try {
    const res = await api.get(PROFILE_COMPLETE, {
      headers: {
        ...headers,
        Authorization: "Bearer " + (Cookies.get("auth_token") || ""),
      },
    });

    return {
      data: res.data,
      error: null,
    };
  } catch (error: any) {
    let errorMessage;
    if (Array.isArray(error?.response?.data?.message)) {
      errorMessage = error?.response?.data?.message
        ?.map((item: any) => item.msg)
        ?.join(", ");
    } else if (typeof error?.response?.data?.message === "string") {
      errorMessage = error?.response?.data?.message;
    }
    return {
      data: null,
      error: errorMessage || error.message,
    };
  }
};

export const apiGetRecommendations = async () => {
  try {
    const res = await api.get(GET_RECOMMENDATIONS, {
      headers: {
        ...headers,
        Authorization: "Bearer " + Cookies.get("auth_token"),
      },
    });

    return {
      data: res.data,
      error: null,
    };
  } catch (error: any) {
    let errorMessage;
    if (Array.isArray(error?.response?.data?.message)) {
      errorMessage = error?.response?.data?.message
        ?.map((item: any) => item.msg)
        ?.join(", ");
    } else if (typeof error?.response?.data?.message === "string") {
      errorMessage = error?.response?.data?.message;
    }
    return {
      data: null,
      error: errorMessage || error.message,
    };
  }
};

export const apiLiked = async (like: boolean, id: string) => {
  try {
    const res = await api.get(`${LIKE_URL}/${like}/${id}`, {
      headers: {
        ...headers,
        Authorization: "Bearer " + Cookies.get("auth_token"),
      },
    });

    return {
      data: res.data,
      error: null,
    };
  } catch (error: any) {
    let errorMessage;
    if (Array.isArray(error?.response?.data?.message)) {
      errorMessage = error?.response?.data?.message
        ?.map((item: any) => item.msg)
        ?.join(", ");
    } else if (typeof error?.response?.data?.message === "string") {
      errorMessage = error?.response?.data?.message;
    }
    return {
      data: null,
      error: errorMessage || error.message,
    };
  }
};
