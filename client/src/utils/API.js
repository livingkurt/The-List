import axios from "axios";

export default {
  // Project Routes
  post_note: function (note_data) {
    return axios.post("/api/note", note_data);
  },
  get_notes: function () {
    return axios.get("/api/notes");
  },
  get_note: function (id) {
    return axios.get("/api/note/" + id);
  },
  update_note: function (id, note_data) {
    return axios.patch("/api/note/" + id, note_data);
  },
  delete_note: function (id, note_data) {
    return axios.delete("/api/note/" + id, note_data);
  },

}


