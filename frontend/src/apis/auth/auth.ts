import { api } from "../index";

const REGISTER_URL = "/auth/register";
const LOG_IN_URL = "/auth/login";

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

export const apiRegister = async (email: string, password: string) => {
  try {
    const data = {
      email,
      password,
    };
    const res: any = await api.post(REGISTER_URL, data, {
      headers,
    });

    if (res.status === 200) {
      return {
        data: res?.data?.message,
        error: null,
      };
    } else {
      return {
        data: null,
        error: res?.response?.data?.message,
      };
    }
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
      error: errorMessage || error?.message,
    };
  }
};

export const apiLogIn = async (email: string, password: string) => {
  try {
    const data = {
      email,
      password,
    };
    const res: any = await api.post(LOG_IN_URL, data, {
      headers,
      withCredentials: true,
    });
    if (res.status === 200) {
      return {
        data: res.data,
        error: null,
      };
    } else {
      return {
        data: null,
        error: res?.response?.data?.message,
      };
    }
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
