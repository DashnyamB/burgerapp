import React from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import Burger from "../../components/Burger";
import ContactData from "../../components/ContactData";
import Button from "../../components/General/Button";
import css from "./style.module.css";

class ShippingPage extends React.Component {
  cancelOrder = () => {
    this.props.history.goBack();
  };

  showContactData = () => {
    this.props.history.replace("/ship/contact");
  };
  render() {
    return (
      <div className={css.ShippingPage}>
        <p>
          <stront style={{ fontSize: "28px" }}>
            Таны захиалга амттай болно гэж найдаж байна...
          </stront>
        </p>
        <p>
          <strong style={{ fontSize: "28px" }}>
            Үнэ : ₮{this.props.price}
          </strong>
        </p>
        <Burger />
        <Button
          clicked={this.cancelOrder}
          buttonType="Danger"
          text="ЗАХИАЛГЫГ ЦУЦЛАХ"
        />
        <Button
          clicked={this.showContactData}
          buttonType="Success"
          text="ХҮРГЭЛТИЙН МЭДЭЭЛЭЛ ОРУУЛАХ"
        />
        {/* <Route
          path="/ship/contact"
          render={() => (
            <ContactData
              ingridients={this.state.ingridients}
              price={this.state.price}
            />
          )}
        /> */}
        <Route path="/ship/contact">
          <ContactData />
        </Route>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    price: state.burgerReducer.totalPrice,
  };
};

export default connect(mapStateToProps)(ShippingPage);
