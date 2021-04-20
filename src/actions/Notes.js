import axios from "axios";
import store from "../store";

export function insertNoteOnDB(dashboard_id, title, text) {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await axios({
        url: `${axios.defaults.baseURL}/notes`,
        method: "POST",
        data: {
          note: {
            dashboard_id,
            title,
            text,
          },
        },
      });

      store.commit("addNote", {
        id: res.data.data.id,
        title: title,
        text: text,
      });

      resolve();
    } catch (err) {
      console.error("Caught an error during insertion:", err);
      reject(err);
    }
  });
}

export function editNoteOnDB(note_id, title, text) {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await axios({
        url: `${axios.defaults.baseURL}/notes/${note_id}`,
        method: "PUT",
        data: {
          note: {
            title,
            text,
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

export function deleteNoteOnDB(note_id) {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await axios({
        url: `${axios.defaults.baseURL}/notes/${note_id}`,
        method: "DELETE",
        // data: { note_id },
      });

      store.commit("deleteNote", {
        id: note_id,
      });

      resolve();
    } catch (err) {
      console.error("Caught an error during delete:", err);
      reject(err);
    }
  });
}
