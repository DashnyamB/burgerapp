import React, { Component } from "react";
import { connect } from "react-redux";
import css from "./style.module.css";
import Button from "../../components/General/Button";
import * as actions from "../../redux/action/signUpActions";
import Spinner from "../../components/General/Spinner";
import { Redirect } from "react-router-dom";
class SingUpPage extends Component {
  state = {
    email: "",
    password1: "",
    password2: "",
    error: "",
  };

  changeEmail = (e) => {
    this.setState({ email: e.target.value });
  };
  changePass1 = (e) => {
    this.setState({ password1: e.target.value });
  };
  changePass2 = (e) => {
    this.setState({ password2: e.target.value });
  };

  signUp = () => {
    if (this.state.password1 === this.state.password2) {
      this.setState({
        error: "",
      });
      this.props.singupUser(this.state.email, this.state.password1);
    } else {
      this.setState({
        error: "Баталгаажуулах нууц үг хоорондоо таарахгүй байна!",
      });
    }
  };

  render() {
    return (
      <div className={css.SignUp}>
        {this.props.userId && <Redirect to="/" />}
        <div>Та Имейл хаягаар бүртгүүлнэ үү ...</div>
        <input
          type="text"
          placeholder="Имейл хаяг"
          onChange={this.changeEmail}
        />
        <input
          onChange={this.changePass1}
          type="password"
          name="password"
          placeholder="Нууц үг"
        />
        <input
          type="password"
          name="password"
          onChange={this.changePass2}
          placeholder="Дахин нууц оруулна уу"
        />
        {this.state.error && (
          <div style={{ color: "red" }}>{this.state.error}</div>
        )}
        {this.props.firebaseError && (
          <div style={{ color: "red" }}>{this.props.firebaseError.message}</div>
        )}
        {this.props.saving && <Spinner />}
        <Button text="БҮРТГҮҮЛЭХ" clicked={this.signUp} buttonType="Success" />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    saving: state.signupLoginReducer.saving,
    firebaseError: state.signupLoginReducer.firebaseError,
    userId: state.signupLoginReducer.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    singupUser: (email, password) =>
      dispatch(actions.singupUser(email, password)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SingUpPage);
