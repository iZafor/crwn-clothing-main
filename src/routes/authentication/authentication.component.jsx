import "./authentication.styles.scss";

import SignInForm from "../../components/sign-in-form/sign-in-form.component";
import SignIUpForm from "../../components/sign-up-form/sign-up-form.component";

const Authentication = () => {
  return (
    <div className="authentication-container">
      <SignInForm />
      <SignIUpForm />
    </div>
  );
};

export default Authentication;
