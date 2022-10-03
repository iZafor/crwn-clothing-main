import "./sign-in-form.styles.scss";

import { useState } from "react";

import {
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

const defaultFormFiedls = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFiels] = useState(defaultFormFiedls);

  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFiels(defaultFormFiedls);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFiels({ ...formFields, [name]: value });
  };

  const signInWithGoogle = async (event) => {
    event.preventDefault();
    const { user } = await signInWithGooglePopup();
    await createUserDocumentFromAuth(user);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );
      console.log(response);
    } catch (error) {
      switch (error.code) {
        case "auth/user-not-found":
          alert("user not found!");
          break;
        case "auth/wrong-password":
          alert("incorrect password!");
          break;
        default:
          alert(error.message);
      }
    }
    resetFormFields();
  };

  return (
    <div className="sign-in-form-container">
      <h2>Alreay have an account?</h2>
      <span>Sing in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          value={email}
          onChange={handleChange}
          name="email"
          required
        />

        <FormInput
          label="Password"
          type="password"
          value={password}
          onChange={handleChange}
          name="password"
          required
        />

        <div className="buttons-container">
          <Button>Sign In</Button>
          <Button buttonType="google" type="button" onClick={signInWithGoogle}>
            Google Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
