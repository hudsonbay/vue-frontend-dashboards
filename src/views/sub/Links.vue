<template>
  <div id="wrapper">
    <div id="left">
      <div v-if="user.links.length == 0">
        <h1>You have no links :(</h1>
        <h1>Add one and start organizing stuff</h1>
      </div>
      <div v-else>
        <ul>
          <li v-for="item in user.links" v-bind:key="item.id">
            <a href="#">
              <h3>{{ item.title }}</h3>
              <h4>{{ item.url }}</h4>
            </a>
          </li>
        </ul>
      </div>

    </div>
    <div id="right">

       <b-field label="Title">
        <b-input id="title" v-model="form.title"></b-input>
      </b-field>

       <b-field label="URL">
        <b-input id="url" v-model="form.url"></b-input>
      </b-field>

      <div>
        <b-button type="is-success" @click="addLink">Add</b-button>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

import { getLoggedUserInfo } from "../../utils/auth";

import { insertURLOnDB } from "../../actions/Links";
export default {
  name: "Profile",
  components: {},
  data() {
    return {
      user: getLoggedUserInfo(),
      form: {
        title: "",
        url: "",
      },
    };
  },
  methods: {
    addLink() {
      this.user.links.push({
        title: this.form.title,
        url: this.form.url,
      });
      insertURLOnDB(this.user.id, this.form.title, this.form.url);
      this.form.title = "";
      this.form.url = "";
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
  height: 10em;
  width: 10em;
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
