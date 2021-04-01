import axios from "axios";

const REST_ENDPOINT = "http://localhost:4000/";

export function insertURLOnDB(user_id, title, url) {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await axios({
        url: `${REST_ENDPOINT}api/links`,
        method: "POST",
        data: {
          link: {
            user_id,
            title,
            url,
          },
        },
      });
      resolve();
    } catch (err) {
      console.error("Caught an error during insertion:", err);
      reject(err);
    }
  });
}
