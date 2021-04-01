<template>
  <div class="flex-container">
    <div class="content-container">
      <div class="form-container">
        <form @submit.prevent="submit">
          <h1>
            Register
          </h1>
          <br />
          <br />
          <span class="subtitle">EMAIL:</span>
          <br />
          <input type="email" name="email" v-model="form.email" />
          <br />
          <span class="subtitle">PASSWORD:</span>
          <br />
          <input type="password" name="password" v-model="form.password" />
          <br /><br />
          <input
            type="submit"
            v-on:click="register"
            value="NEW USER"
            class="submit-btn"
          />

          <a v-on:click="login"> or login if you have an account</a>
        </form>
        <p v-if="showError" id="error">Email already exists</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { registerUser } from "../actions/Users";
export default {
  name: "Register",
  components: {},
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      showError: false,
    };
  },
  methods: {
    ...mapActions(["Register"]),
    async register() {
      try {
        await registerUser(this.form.email, this.form.password);
        this.$router.push("/signin");
      } catch (error) {
        this.showError = true;
      }
    },
    login() {
      this.$router.push("/signin");
    },
  },
};
</script>

<style scoped>
html {
  scroll-behavior: smooth;
  background-color: #1f1f1f;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  background: #121212; /* fallback for old browsers */
  overflow-x: hidden;

  height: 100%;

  /* code to make all text unselectable */
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -o-user-select: none;
  user-select: none;
}

/* Disables selector ring */
body:not(.user-is-tabbing) button:focus,
body:not(.user-is-tabbing) input:focus,
body:not(.user-is-tabbing) select:focus,
body:not(.user-is-tabbing) textarea:focus {
  outline: none;
}

/* ########################################################## */

h1 {
  color: white;

  font-size: 35px;
  font-weight: 800;
}

.flex-container {
  width: 100vw;

  margin-top: 60px;

  display: flex;
  justify-content: center;
  align-items: center;
}

.content-container {
  width: 500px;
  height: 350px;
}

.form-container {
  display: flex;
  justify-content: center;
  align-items: center;

  width: 500px;
  height: 350px;

  margin-top: 5px;
  padding-top: 20px;

  border-radius: 12px;

  display: flex;
  justify-content: center;
  flex-direction: column;

  background: #1f1f1f;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.199);
}

.subtitle {
  font-size: 11px;

  color: rgb(255, 255, 255);
}

input {
  border: none;
  border-bottom: solid rgb(143, 143, 143) 1px;

  margin-bottom: 30px;

  background: none;
  color: rgba(255, 255, 255, 0.555);

  height: 35px;
  width: 300px;
}

.submit-btn {
  cursor: pointer;

  border: none;
  border-radius: 8px;

  box-shadow: 2px 2px 7px #38d39f70;

  background: #38d39f;
  color: rgba(255, 255, 255, 0.8);

  width: 80px;

  transition: all 1s;
}

.submit-btn:hover {
  color: rgb(255, 255, 255);

  box-shadow: none;
}
</style>
