import axios from "axios";

export function registerUser(email, password) {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await axios({
        url: `${axios.defaults.baseURL}/users/register`,
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
