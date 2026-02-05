import axios from "./config";

export const create = async (url: string, payload: any) => {
  try {
    const res = await axios.post(url, payload);
    return res.data;
  } catch (error: any) {
    // Return the error response from the API
    if (error.response && error.response.data) {
      return error.response.data;
    }
    
    // Fallback for network or other errors
    return {
      status: false,
      error: error.message || "An error occurred"
    };
  }
};

export const get = async (url: string) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error: any) {
    console.log("error", error);
    // if (error?.status === 401 || error?.response?.status === 403) {
    //   console.warn("Token invalid or expired. Redirecting to login...");
    //   localStorage.removeItem("authToken"); 
    //   window.location.href = '/login'; // 👈 redirect if unauthorized
    // }

    // console.error("API error:", error?.response?.data || error.message);
    return error?.response?.data || { error: error.message, returnedStatus: 500 };
  }
};

export const getFilter = async (url: string, filter: any) => {
  try {
    const queryString = new URLSearchParams(filter).toString();
    const response = await axios.get(url + "?" + queryString);
    return response.data;
  } catch (error: any) {
    console.log("error", error);
    return error?.response?.data || { error: error.message, returnedStatus: 500 };
  }
};

export const getById = async (url: string) => {
  try {
    return axios
      .get(url)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return err.message;
      });
  } catch (error) {
    console.log("err::", error);
  }
};

export const update = async (url: string, payload: any) => {
  try {
    return axios
      .put(url, payload)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return err.message;
      });
  } catch (error) {
    console.log("err::", error);
  }
};

export const deleteData = async (url: string, id?:any) => {
  try {
    return axios
      .delete(url, id)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return err.message;
      });
  } catch (error) {
    console.log("err::", error);
  }
};

export const upload = async (url: string, payload: any, headers: any) => {
  try {
    return axios
      .post(url, payload, { headers: headers })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return err.message;
      });
  } catch (error) {
    console.log("err::", error);
  }
};
