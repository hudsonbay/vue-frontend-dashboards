import axios from "axios";
import store from "../store";
const REST_ENDPOINT = "http://localhost:4000/";

export function insertURLOnDB(dashboard_id, title, url) {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await axios({
        url: `${REST_ENDPOINT}api/links`,
        method: "POST",
        data: {
          link: {
            dashboard_id,
            title,
            url,
          },
        },
      });

      store.commit("addLink", {
        id: res.data.data.id,
        title: title,
        url: url,
      });

      resolve();
    } catch (err) {
      console.error("Caught an error during insertion:", err);
      reject(err);
    }
  });
}

export function editLinkOnDB(link_id, title, url) {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await axios({
        url: `${REST_ENDPOINT}api/links/${link_id}`,
        method: "PUT",
        data: {
          link: {
            title,
            url,
          },
        },
      });
      resolve();
    } catch (err) {
      console.error("Caught an error during update:", err);
      reject(err);
    }
  });
}

export function deleteLinkOnDB(link_id) {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await axios({
        url: `${REST_ENDPOINT}api/links/${link_id}`,
        method: "DELETE",
        // data: { link_id },
      });

      store.commit("deleteLink", {
        id: link_id,
      });

      resolve();
    } catch (err) {
      console.error("Caught an error during delete:", err);
      reject(err);
    }
  });
}
