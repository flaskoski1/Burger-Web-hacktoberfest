import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "ZIP Code"
        },
        value: "",
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5
        },
        valid: false,
        touched: false
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your E-Mail"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" }
          ]
        },
        validation: {},
        value: "",
        valid: true
      }
    },
    formIsValid: false,
    loading: false
  };

  orderHandler = event => {
    event.preventDefault();
    // console.log(this.props.ingredients);
    this.setState({ loading: true });
    const formData = {};
    for (let formElementIdentifier in this.state.orderForm)
      formData[formElementIdentifier] = this.state.orderForm[
        formElementIdentifier
      ].value;
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderData: formData
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
  checkValidity(value, rules) {
    //console.log(rules, "rules");
    let isValid = true;
    if (!rules) {
      return true;
    }
    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }
    if (rules.maxLength) {
      isValid = value.length <= rules.minLength && isValid;
    }
    return isValid;
  }
  inputChangedHandler = (event, inputIdentifier) => {
    console.log(event.target.value, "(event target value)");

    const updatedOrderForm = {
      ...this.state.orderForm
    };
    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifier]
    };

    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );

    updatedFormElement.touched = true;
    updatedOrderForm[inputIdentifier] = updatedFormElement;
    let formIsValid = true;
    for (let inputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }
    this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
    // console.log(updatedFormElement, "updatedFormElement");

    // console.log(event.target.value, "value");
    // console.log(updatedOrderForm, "update");
  };
  // inputChangedHandler = (event, inputIdentifier) => {
  //   const updatedOrderForm = {
  //     ...this.state.orderForm
  //   };
  //   const updatedFormElement = {
  //     ...updatedOrderForm[inputIdentifier]
  //   };
  //   updatedFormElement.value = event.target.value;
  //   updatedOrderForm[inputIdentifier] = updatedFormElement;
  //   this.setState({ orderForm: updatedOrderForm });
  // };
  render() {
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }
    // console.log(this.props.price, "price");
    // console.log(formElementsArray, "element");
    let form = (
      <form onSubmit={this.orderHandler}>
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
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={event => this.inputChangedHandler(event, formElement.id)}
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
        <Button btnType="Success" disabled={!this.state.formIsValid}>
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
// class ContactData extends Component {
//   state = {
//     // name: "",
//     // email: "",
//     // address: {
//     //   street: "",
//     //   postalCode: ""
//     // },
//     orderForm: {
//       // customer: {
//       name: {
//         elementType: "input",
//         elementConfig: {
//           type: "text",
//           placeholder: "Your Name"
//         },
//         value: ""
//       },
//       // }"Max Schwarzmuller",
//       // address: {
//       street: {
//         elementType: "input",
//         elementConfig: {
//           type: "text",
//           placeholder: "Street"
//         },
//         value: ""
//       },
//       // "Teststreet 1",
//       zipCode: {
//         elementType: "input",
//         elementConfig: {
//           type: "text",
//           placeholder: "ZIP Code"
//         },
//         value: ""
//       },
//       // "41351",
//       country: {
//         elementType: "input",
//         elementConfig: {
//           type: "text",
//           placeholder: "Country"
//         },
//         value: ""
//       },
//       //  "Germany",
//       // },
//       email: {
//         elementType: "input",
//         elementConfig: {
//           type: "email",
//           placeholder: "Your E-Mail"
//         },
//         value: ""
//       },
//       // "test@test.com",
//       // },
//       deliveryMethod: {
//         elementType: "select",
//         elementConfig: {
//           options: [
//             { value: "fastest", displayValue: "Fastest" },
//             { value: "cheapest", displayValue: "Cheapest" }
//           ]
//           // config: {}
//           // type: "text",
//           // placeholder: "Your Name"
//         },
//         value: ""
//       }
//       // "fastest"
//     },
//     loading: false
//   };
