import React, { useState } from "react";
import {
  createUserDocumentFromAuth,
  SignInAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
} from "../../utils/firebase/firebase.utils";
import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import "./sign-in-form.styles.scss";

const defaultFormFields = {
  email: "",
  password: "",
};
const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      console.log(email, password);
      const response = await SignInAuthUserWithEmailAndPassword(
        email,
        password
      );
      setFormFields(defaultFormFields);
    } catch (error) {
      if (error.code === "auth/wrong-password") {
        setMessage("Wrong Password");
        console.log("Wrong Password\n", error);
      } else if (error.code === "auth/user-not-found") {
        setMessage("User with this email was not found");
        console.log("User with this email was not found\n", error);
      } else {
        setMessage("User login error \n", error);
        console.log("User login error \n", error);
      }
    }
  };

  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
  };

  return (
    <div className="sign-in-container">
      <h2>Already have an account?</h2>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          name="email"
          value={email}
          required
          type="email"
          id="email"
          onChange={handleChange}
        />
        <FormInput
          label="Password"
          name="password"
          value={password}
          required
          type="password"
          id="password"
          onChange={handleChange}
        />
        {message && <p>{message}</p>}

        <div className="buttons-container">
          <Button buttonType="default" type="submit">
            Sign In
          </Button>{" "}
          <Button buttonType="google" type="button" onClick={signInWithGoogle}>
            Google Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
