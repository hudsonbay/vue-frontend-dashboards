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
        v-else-if="this.$store.getters.getSelectedDashboard.links.length == 0"
      >
        <h1>
          You have no links in the dashboard
          {{ this.$store.getters.getSelectedDashboard.title }} :(
        </h1>
      </div>

      <div v-else>
        <ul>
          <li
            v-for="(item, index) in this.$store.getters.getSelectedDashboard
              .links"
            :key="item.id"
          >
            <a href="#">
              <b-button
                @click="populateLinkToEdit(item, index)"
                icon-left="pencil"
              />

              <b-button
                @click="deleteLink(item, index)"
                type="is-danger"
                icon-right="delete"
              />
              <h3>
                <b>{{ item.title }}</b>
              </h3>
              <h4>{{ item.url }}</h4>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div id="right">
      <div v-if="this.$store.getters.getSelectedDashboardID != 0">
        <form>
          <b-field label="Title">
            <b-input id="title" v-model.trim="form.title"></b-input>
          </b-field>

          <b-field label="URL">
            <b-input id="url" v-model.trim="form.url"></b-input>
          </b-field>

          <div v-if="currentAction == `insert`">
            <b-button
              v-bind:disabled="inputIsEmpty"
              type="is-success"
              @click="addLink"
              >Insert</b-button
            >
            <b-button type="is-info" @click="clearFields"
              >Clear fields</b-button
            >
          </div>
          <div v-if="currentAction == `edit`">
            <b-button
              v-bind:disabled="inputIsEmpty"
              type="is-primary"
              @click="editLink"
              >Edit</b-button
            >
            <b-button type="is-info" @click="clearFields"
              >Clear fields</b-button
            >
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

import { getLoggedUserInfo } from "../../utils/auth";

import {
  insertURLOnDB,
  editLinkOnDB,
  deleteLinkOnDB,
} from "../../actions/Links";
export default {
  name: "Profile",
  components: {},
  data() {
    return {
      user: getLoggedUserInfo(),
      currentAction: "insert",
      linkId: 0,
      linkIndex: 0,
      form: {
        title: "",
        url: "",
      },
    };
  },
  methods: {
    validURL: function (str) {
      var expression = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]|www\.[a-zA-Z0-9])/gi;
      var regex = new RegExp(expression);

      if (str.match(regex)) {
        return true;
      } else {
        return false;
      }
    },
    addLink() {
      if (!this.validURL(this.form.url)) {
        this.form.url = "http://".concat(this.form.url);
      }

      insertURLOnDB(
        this.$store.getters.getSelectedDashboardID,
        this.form.title,
        this.form.url
      );
      this.clearFields();
    },
    async populateLinkToEdit(link, index) {
      this.form.title = link.title;
      this.form.url = link.url;
      this.linkId = link.id;
      this.linkIndex = index;
      this.currentAction = "edit";
    },
    deleteLink: function (link, index) {
      deleteLinkOnDB(link.id);
    },
    editLink: function () {
      if (!this.validURL(this.form.url)) {
        this.form.url = "http://".concat(this.form.url);
      }

      editLinkOnDB(
        this.$store.getters.getSelectedDashboard.links[this.linkIndex].id,
        this.form.title,
        this.form.url
      );

      this.$store.getters.getSelectedDashboard.links[this.linkIndex] = {
        title: this.form.title,
        url: this.form.url,
      };
      this.clearFields();
    },
    clearFields() {
      this.form.title = "";
      this.form.url = "";
      this.currentAction = "insert";
    },
  },
  computed: {
    inputIsEmpty() {
      return this.form.title.length == 0 || this.form.url.length == 0;
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
  height: 11em;
  width: 15em;
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

/* ✨ The magic ✨ */
/* form.errors {
  :invalid {
    border-color: red;
  }
  .error-message {
    display: block;
  }
} */
</style>
