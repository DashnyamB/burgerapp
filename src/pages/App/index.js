import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import Style from "./style.module.css";
import Toolbar from "../../components/Toolbar";
import BurgerPage from "../BurgerPage";
import Sidebar from "../../components/Sidebar";
import OrderPage from "../OrderPage";
import ShippingPage from "../ShippingPage";
import LoginPage from "../loginPage";
import SingUpPage from "../SignUpPage";
import Logout from "../../components/Logout";
import * as actions from "../../redux/action/loginActions";

class App extends Component {
  state = {
    showSidebar: false,
  };

  toggleSidebar = () => {
    this.setState((prevState) => {
      return { showSidebar: !prevState.showSidebar };
    });
  };

  componentDidMount = () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const expireDate = localStorage.getItem("expireDate");
    const refreshToken = localStorage.getItem("refreshToken");
    if (token) {
      if (expireDate > new Date()) {
        // Хугацаа нь дуусаагүй токен байна
        this.props.autologin(token, userId);

        // Токен хүчингүй болоххд үлдэж байгаа хугацааг тооцож
        // тэр хугацааны дараа автоматаар logout хийнэ.

        this.props.autoLogoutAfterMillisec(
          expireDate.getTime() - new Date().getTime()
        );
      } else {
        // token хугацаань дууссан
        this.props.logout();
      }
    }
  };

  render() {
    return (
      <div>
        <Toolbar toggleSidebar={this.toggleSidebar} />
        <Sidebar
          showSidebar={this.state.showSidebar}
          toggleSidebar={this.toggleSidebar}
        />
        <main className={Style.Content}>
          {this.props.userId ? (
            <Switch>
              <Route path="/logout" component={Logout} />
              <Route path="/ship" component={ShippingPage} />

              <Route path="/orders" component={OrderPage} />
              <Route path="/" component={BurgerPage} />
            </Switch>
          ) : (
            <Switch>
              <Route path="/login" component={LoginPage} />
              <Route path="/signup" component={SingUpPage} />
              <Redirect to="/login" />
            </Switch>
          )}
          <Switch></Switch>
        </main>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    userId: state.signupLoginReducer.userId,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    autologin: (token, userId) => dispatch(actions.loginSuccess(token, userId)),
    logout: () => dispatch(actions.logout()),
    autoLogoutAfterMillisec: (ms) =>
      dispatch(actions.autoLogoutAfterMillisec(ms)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
