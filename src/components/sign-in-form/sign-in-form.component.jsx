import { SignInContainer, ButtonsContainer } from "./sign-in-form.styles";

import { useState } from "react";

import {
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

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
    try {
      await signInWithGooglePopup();
    } catch (error) {
      alert(error.code);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await signInAuthUserWithEmailAndPassword(email, password);
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
    <SignInContainer>
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

        <ButtonsContainer>
          <Button>Sign In</Button>
          <Button
            buttonType={BUTTON_TYPE_CLASSES.google}
            type="button"
            onClick={signInWithGoogle}
          >
            Google Sign In
          </Button>
        </ButtonsContainer>
      </form>
    </SignInContainer>
  );
};

export default SignInForm;
