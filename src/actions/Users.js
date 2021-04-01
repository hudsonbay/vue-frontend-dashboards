import axios from "axios";

const REST_ENDPOINT = "http://localhost:4000/";

export function registerUser(email, password) {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await axios({
        url: `${REST_ENDPOINT}api/users/register`,
        method: "POST",
        data: {
          user: {
            email,
            password,
          },
        },
      });
      resolve();
    } catch (err) {
      console.error("Caught an error during register:", err);
      reject(err);
    }
  });
}
