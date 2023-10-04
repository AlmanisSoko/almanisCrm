import axios from "axios";
import Config from "./Config";
import { reactLocalStorage } from "reactjs-localstorage";

class AuthHandler {

  static login(email, password, callback) {
    axios
      .post(Config.loginUrl, { email: email, password: password })
      .then(function (response) {
        if (response.status === 200) {
          reactLocalStorage.set("token", response.data.access);
          reactLocalStorage.set("refresh", response.data.refresh);
  
          // Fetch user information after successful login
          axios
            .get(Config.userApiUrl, {
              headers: { Authorization: `Bearer ${response.data.access}` },
            })
            .then(function (userResponse) {
              const userInfo = userResponse.data; // Assuming the API response contains the user information
              
              // Store the user's name in the session
              reactLocalStorage.set("userName", userInfo.name);
  
              // Check if the user is an admin
              if (userInfo.role === "admin") {
                callback({ error: false, message: "Login Successful..." });
              } else {
                callback({ error: true, message: "Access Denied" });
              }
            })
            .catch(function (error) {
              callback({
                error: true,
                message: "Error during user information retrieval",
              });
            });
        }
      })
      .catch(function (error) {
        callback({
          error: true,
          message: "Error During Login Invalid Login Credentials..",
        });
      });
  }
  
  static loggedIn() {
    if (reactLocalStorage.get("token") && reactLocalStorage.get("refresh")) {
      return true;
    } else {
      return false;
    }
  }

  static getLoginToken() {
    return reactLocalStorage.get("token");
  }

  static getRefreshToken() {
    return reactLocalStorage.get("refresh");
  }

  static logoutUser() {
    reactLocalStorage.remove("token");
    reactLocalStorage.remove("refresh");
  }

  static checkTokenExpiry() {
    var expire = false;
    var token = this.getLoginToken();
    var tokenArray = token.split(".");
    var jwt = JSON.parse(atob(tokenArray[1]));
    if (jwt && jwt.exp && Number.isFinite(jwt.exp)) {
      expire = jwt.exp * 1000;
    } else {
      expire = false;
    }
  
    if (!expire) {
      return true; // Token is considered expired when the expiry time is not defined
    }
  
    return Date.now() > expire;
  }

  static getUserName() {
    return reactLocalStorage.get("name");
  }
  
}

export default AuthHandler;