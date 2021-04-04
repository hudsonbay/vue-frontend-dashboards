import axios from "axios";
import store from "../store";

const REST_ENDPOINT = "http://localhost:4000/";

export function insertDashboardOnDB(user_id, title) {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await axios({
        url: `${REST_ENDPOINT}api/dashboards`,
        method: "POST",
        data: {
          dashboard: {
            user_id,
            title,
          },
        },
      });

      store.commit("addDashboard", {
        id: res.data.data.id,
        title: title,
      });
      
      console.log("number of dashboards", store.state.user.dashboards.length);
      console.log(store.state.user.dashboards);
      resolve();
    } catch (err) {
      console.error("Caught an error during insertion:", err);
      reject(err);
    }
  });
}

export function editDashboardOnDB(link_id, title, url) {
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

export function deleteDashboardOnDB(link_id) {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await axios({
        url: `${REST_ENDPOINT}api/links`,
        method: "DELETE",
        data: { link_id },
      });
      resolve();
    } catch (err) {
      console.error("Caught an error during delete:", err);
      reject(err);
    }
  });
}
