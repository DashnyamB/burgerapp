import axios from "axios";

const instance = axios.create({
  baseURL: "https://burgerappmn.firebaseio.com/",
});

export default instance;
