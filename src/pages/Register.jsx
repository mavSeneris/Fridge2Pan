import React from "react";
import {
  useLoaderData,
  Form,
  redirect,
  useActionData,
  useNavigation,
  Link,
} from "react-router-dom";
// import { loginUser } from "../api";
import {getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../firebase";

const auth = getAuth()

export async function action({ request }) {
    const formData = await request.formData();
    const email = formData.get("email");
    const password = formData.get("password");
    const pathname =
      new URL(request.url).searchParams.get("redirectTo") || "/saved-recipes";
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("Successfully logged in!");
      localStorage.setItem("loggedin", true);
      return redirect(pathname);
    } catch (err) {
      const errorCode = err.code;
      const errorMessage = err.message;
      if(errorMessage === "Firebase: Password should be at least 6 characters (auth/weak-password)."){
        return "Weak password."
      }
      console.log(errorMessage);
      return err.message;
    }
  }

export default function Register() {
  const errorMessage = useActionData();
  const message = useLoaderData();
  const navigation = useNavigation();

  return (
    <div className="register-container">
      <h1>Sign in to your account</h1>
      {message && <h3 className="red">{message}</h3>}
      {errorMessage && <h3 className="red">{errorMessage}</h3>}

      <Form method="post" className="register-form" replace>
        <input name="email" type="email" placeholder="Email address" />
        <input name="password" type="password" placeholder="Password" />
        <button
          className="register-button"
          type="submit"
          disabled={navigation.state === "submitting"}
        >
          {navigation.state === "submitting" ? "Logging in..." : "Submit"}
        </button>
      </Form>
      <p>
        Registered? login <Link to="/login">here</Link>.
      </p>
    </div>
  );
}
