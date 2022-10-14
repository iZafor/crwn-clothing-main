import { AuthenticationContainer } from "./authentication.styles";

import SignInForm from "../../components/sign-in-form/sign-in-form.component";
import SignIUpForm from "../../components/sign-up-form/sign-up-form.component";

const Authentication = () => {
  return (
    <AuthenticationContainer>
      <SignInForm />
      <SignIUpForm />
    </AuthenticationContainer>
  );
};

export default Authentication;
