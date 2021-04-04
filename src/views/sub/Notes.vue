<template>
  <div id="wrapper">
    <div id="left">
      <!-- If dashboards list is empty -->
      <div v-if="this.$store.state.user.dashboards.length == 0">
        <h1>You have no dashboards :(</h1>
        <h1>Add one and start organizing stuff</h1>
      </div>

      <!-- if there is no selected dashboard -->
      <div v-else-if="this.$store.getters.getSelectedDashboardID == 0">
        <h1>Please, select a dashboard or add one</h1>
      </div>

      <!-- If the selected dashboard has no notes -->
      <div
        v-else-if="this.$store.getters.getSelectedDashboard.notes.length == 0"
      >
        <h1>
          You have no notes in the dashboard
          {{ this.$store.getters.getSelectedDashboard.title }} :(
        </h1>
      </div>

      <!-- {{ this.$store.getters.getSelectedDashboard.notes.length }}
      {{ JSON.stringify(this.$store.getters.getSelectedDashboard.notes) }} -->
      <div v-else>
        <ul>
          <li
            v-for="(note, index) in this.$store.getters.getSelectedDashboard
              .notes"
            v-bind:key="note.id"
          >
            <a href="#">
              <b-button
                @click="populateNoteToEdit(note, index)"
                icon-right="pencil"
              />

              <b-button
                @click="deleteNote(note, index)"
                type="is-danger"
                icon-right="delete"
              />
              <h2>{{ note.title }}</h2>
              <h4>{{ note.text }}</h4>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div id="right">
      <div v-if="this.$store.getters.getSelectedDashboardID != 0">
        <b-field label="Title">
          <b-input v-model="form.title"></b-input>
        </b-field>

        <b-field label="Text">
          <b-input
            maxlength="200"
            id="text"
            type="textarea"
            v-model="form.text"
          ></b-input>
        </b-field>
        <div v-if="currentAction == `insert`">
          <b-button
            v-bind:disabled="inputIsEmpty"
            type="is-success"
            @click="addNote"
            >Insert</b-button
          >
          <b-button type="is-info" @click="clearFields">Clear fields</b-button>
        </div>
        <div v-if="currentAction == `edit`">
          <b-button
            v-bind:disabled="inputIsEmpty"
            type="is-primary"
            @click="editNote"
            >Edit</b-button
          >
          <b-button type="is-info" @click="clearFields">Clear fields</b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getLoggedUserInfo } from "../../utils/auth";
import {
  insertNoteOnDB,
  deleteNoteOnDB,
  editNoteOnDB,
} from "../../actions/Notes";
export default {
  name: "Notes",
  components: {},
  data() {
    return {
      user: getLoggedUserInfo(),
      currentAction: "insert",
      dashboard: this.$store.getters.getSelectedDashboard,
      noteId: 0,
      noteIndex: 0,
      form: {
        title: "",
        text: "",
      },
    };
  },
  methods: {
    addNote() {
      // this.$store.getters.getSelectedDashboard.notes.push({
      //   title: this.form.title,
      //   text: this.form.text,
      // });
      insertNoteOnDB(
        this.$store.getters.getSelectedDashboardID,
        this.form.title,
        this.form.text
      );
      this.clearFields();
    },
    async populateNoteToEdit(note, index) {
      this.form.title = note.title;
      this.form.text = note.text;
      this.noteId = note.id;
      this.noteIndex = index;
      this.currentAction = "edit";
    },
    deleteNote: function (note, index) {
      console.log("note.id", note.id);
      console.log(
        "this.$store.getters.getSelectedDashboard.notes[index]",
        this.$store.getters.getSelectedDashboard.notes[index]
      );
      console.log(
        "this.$store.getters.getSelectedDashboard.notes[index].id",
        this.$store.getters.getSelectedDashboard.notes[index].id
      );
      deleteNoteOnDB(note.id);
      // this.$store.getters.getSelectedDashboard.notes.splice(index, 1);
    },
    editNote: function () {
      editNoteOnDB(
        this.$store.getters.getSelectedDashboard.notes[this.noteIndex].id,
        this.form.title,
        this.form.text
      );

      this.$store.getters.getSelectedDashboard.notes[this.noteIndex] = {
        title: this.form.title,
        text: this.form.text,
      };
      this.clearFields();
    },
    clearFields() {
      this.form.title = "";
      this.form.text = "";
      this.currentAction = "insert";
    },
  },
  computed: {
    inputIsEmpty() {
      return this.form.title.length == 0 || this.form.text.length == 0;
    },
  },
};
</script>

<style scoped>
#wrapper {
  display: flex;
}

#left {
  flex: 0 0 65%;
}

#right {
  flex: 1;
}

body {
  margin: 20px auto;
  font-family: "Lato";
  background: #666;
  color: #fff;
}

* {
  margin: 0;
  padding: 0;
}

h2 {
  font-weight: bold;
  font-size: 2rem;
}
p {
  font-family: "Reenie Beanie";
  font-size: 2rem;
}
ul,
li {
  list-style: none;
}
ul {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
ul li a {
  text-decoration: none;
  color: #000;
  background: #ffc;
  display: block;
  height: 13em;
  width: 13em;
  padding: 1em;
  box-shadow: 5px 5px 7px rgba(33, 33, 33, 0.7);
  transform: rotate(-6deg);
  transition: transform 0.15s linear;
}

ul li:nth-child(even) a {
  transform: rotate(4deg);
  position: relative;
  top: 5px;
  background: #cfc;
}
ul li:nth-child(3n) a {
  transform: rotate(-3deg);
  position: relative;
  top: -5px;
  background: #ccf;
}
ul li:nth-child(5n) a {
  transform: rotate(5deg);
  position: relative;
  top: -10px;
}

ul li a:hover,
ul li a:focus {
  box-shadow: 10px 10px 7px rgba(0, 0, 0, 0.7);
  transform: scale(1.25);
  position: relative;
  z-index: 5;
}

ul li {
  margin: 1em;
}

/* ########################################################## */
body {
  padding: 2em;
}
label {
  display: block;
}
div + div {
  margin-top: 1em;
}
.error-message {
  display: none;
  color: red;
}
</style>
