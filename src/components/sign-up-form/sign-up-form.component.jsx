import "./sign-up-form.styles.scss";

import { useState } from "react";

import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

const defaultFormFiedls = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFiels] = useState(defaultFormFiedls);

  const { displayName, email, password, confirmPassword } = formFields;

  const resetFormFields = () => {
    setFormFiels(defaultFormFiedls);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFiels({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("password didn't match!");
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );

      await createUserDocumentFromAuth(user, {
        displayName,
      });

      resetFormFields();
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("email already exists!");
      }
    }
  };

  return (
    <div className="sign-up-form-container">
      <h2>Don't have an account?</h2>
      <span>Sing up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          type="text"
          value={displayName}
          onChange={handleChange}
          name="displayName"
          required
        />

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

        <FormInput
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={handleChange}
          name="confirmPassword"
          required
        />

        <Button type="submit">Sign up</Button>
      </form>
    </div>
  );
};

export default SignUpForm;
