import axios from "axios";

const REST_ENDPOINT = "http://localhost:4000/";

export function insertNoteOnDB(user_id, title, text) {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await axios({
        url: `${REST_ENDPOINT}api/notes`,
        method: "POST",
        data: {
          note: {
            user_id,
            title,
            text,
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

export function editNoteOnDB(note_id, title, text) {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await axios({
        url: `${REST_ENDPOINT}api/notes/${note_id}`,
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
        url: `${REST_ENDPOINT}api/notes`,
        method: "DELETE",
        data: { note_id },
      });
      resolve();
    } catch (err) {
      console.error("Caught an error during delete:", err);
      reject(err);
    }
  });
}
