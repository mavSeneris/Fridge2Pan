import React from "react";
import {
  useLoaderData,
  Form,
  redirect,
  useActionData,
  useNavigation,
  Link,
} from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../api";

export async function action({ request }) {
    const formData = await request.formData();
    const email = formData.get("email");
    const password = formData.get("password");
    const pathname =
      new URL(request.url).searchParams.get("redirectTo") || "/saved-recipes";
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log(user);
      localStorage.setItem("loggedin", true);
      return redirect(pathname);
    } catch (err) {
      const errorCode = err.code;
      const errorMessage = err.message;
      if(errorMessage === "Firebase: Error (auth/user-not-found)."){
        return "User not found :("
      }
      console.log(errorMessage);
      return err.message;
    }
  }

export default function Login() {
  const errorMessage = useActionData();
  const message = useLoaderData();
  const navigation = useNavigation();

  return (
    <div className="login-container">
      <h1>Login in to your account</h1>
      {message && <h3 className="red">{message}</h3>}
      {errorMessage && <h3 className="red">{errorMessage}</h3>}

      <Form method="post" className="login-form" replace>
        <input name="email" type="email" placeholder="Email address" />
        <input name="password" type="password" placeholder="Password" />
        <button
          className="login-button"
          type="submit"
          disabled={navigation.state === "submitting"}
        >
          {navigation.state === "submitting" ? "Logging in..." : "Submit"}
        </button>
      </Form>
      <p>
        Don't have an account? Sign in <Link to="/register">here</Link>.
      </p>
    </div>
  );
}
