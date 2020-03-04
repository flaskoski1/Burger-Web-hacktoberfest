import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";

class ContactData extends Component {
  state = {
    // name: "",
    // email: "",
    // address: {
    //   street: "",
    //   postalCode: ""
    // },
    orderForm: {
      // customer: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name"
        },
        value: ""
      },
      // }"Max Schwarzmuller",
      // address: {
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street"
        },
        value: ""
      },
      // "Teststreet 1",
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "ZIP Code"
        },
        value: ""
      },
      // "41351",
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country"
        },
        value: ""
      },
      //  "Germany",
      // },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your E-Mail"
        },
        value: ""
      },
      // "test@test.com",
      // },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" }
          ]
          // type: "text",
          // placeholder: "Your Name"
        },
        value: ""
      }
      // "fastest"
    },
    loading: false
  };
  orderHandler = event => {
    event.preventDefault();
    // console.log(this.props.ingredients);
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price
      // customer: {
      //   name: "Max Schwarzmuller",
      //   address: {
      //     street: "Teststreet 1",
      //     zipCode: "41351",
      //     country: "Germany"
      //   },
      //   email: "test@test.com"
      // },
      // deliveryMethod: "fastest"
    };
    axios
      .post("/orders.json", order)
      .then(response => {
        this.setState({ loading: false });
        this.props.history.push("/");
      })
      .catch(error => this.setState({ loading: false }));
  };
  render() {
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }
    // console.log(this.props.price, "price");
    console.log(formElementsArray, "element");
    let form = (
      <form>
        {/* <Input
          // inputtype="input"
          // type="text"
          // name="name"
          // placeholder="Your Name"
          elementType="..."
          elementConfig="..."
          value="..."
        ></Input> */}
        {formElementsArray.map(formElement => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
          />
        ))}

        {/* <Input
          inputtype="input"
          type="email"
          name="email"
          placeholder="Your Mail"
        ></Input>
        <Input
          inputtype="input"
          type="text"
          name="street"
          placeholder="Street"
        ></Input>
        <Input
          inputtype="input"
          type="text"
          name="postal"
          placeholder="Postal Code"
        ></Input> */}
        <Button btnType="Success" clicked={this.orderHandler}>
          ORDER
        </Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;
