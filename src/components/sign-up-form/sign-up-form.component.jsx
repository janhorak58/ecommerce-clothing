import React, { useContext, useState } from "react";
import { UserContext } from "../../contexts/user.context";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import "./sign-up-form.styles.scss";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};
const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const [message, setMessage] = useState("");

  const { setCurrentUser } = useContext(UserContext);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setMessage("The Passwords do not match");
    } else {
      try {
        const { user } = await createAuthUserWithEmailAndPassword(
          email,
          password
        );
        const userDocRef = await createUserDocumentFromAuth(user, {
          displayName,
        });

        setCurrentUser(user);

        setFormFields(defaultFormFields);
      } catch (error) {
        if (error.code === "auth/email-already-in-use") {
          setMessage("The Email is already being used by another user");
          console.log("The Email is already being used by another user", error);
        } else if (error.code === "auth/weak-password") {
          setMessage("The password should contain at least 6 characters");
          console.log(
            "The password should contain at least 6 characters",
            error
          );
        } else {
          setMessage("User creation error \n", error);
          console.log("User creation error \n", error);
        }
      }
    }
  };
  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Name"
          name="displayName"
          value={displayName}
          required
          type="text"
          id="displayName"
          onChange={handleChange}
        />
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
        <FormInput
          label="Confirm Password"
          name="confirmPassword"
          value={confirmPassword}
          required
          type="password"
          id="confirmPassword"
          onChange={handleChange}
        />
        {message && <p>{message}</p>}
        <Button buttonType="default" type="submit">
          Sign Up
        </Button>
      </form>
    </div>
  );
};

export default SignUpForm;
