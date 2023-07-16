import React, { useContext } from "react";
import {
  useLoaderData,
  Form,
  redirect,
  useActionData,
  useNavigation,
  Link,
  useLocation,
} from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { AuthContext } from "../context/authContext";
import { auth } from "../firebase";

export async function action({ request }) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const pathname =
    new URL(request.url).searchParams.get("redirectTo") || "/";
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;
    console.log("Successfully logged in!");
    return redirect(pathname);
  } catch (err) {
    const errorCode = err.code;
    const errorMessage = err.message;
    if (errorMessage === "Firebase: Error (auth/user-not-found).") {
      return "User not found :(";
    } else if (errorMessage === "Firebase: Error (auth/wrong-password).") {
      return "Wrong username or password.";
    }
    console.log(errorMessage);
    return err.message;
  }
}

export default function Login() {
  const errorMessage = useActionData();
  const message = useLoaderData();
  const navigation = useNavigation();
  const location = useLocation();
  const authMessage = location.search.slice(9).replace(/%20/g, " ");
  const currentUser = useContext(AuthContext)

  console.log(currentUser)

  return (
    <div className="login-container">
      <h1>Login in to your account</h1>
      {message && <h3 className="red">{message}</h3>}
      {errorMessage && <h3 className="red">{errorMessage}</h3>}
      {authMessage && <h3 className="red">{authMessage}</h3>}

      <Form method="post" className="login-form" replace>
        <input name="email" type="email" placeholder="Email address" />
        <input name="password" type="password" placeholder="Password" />
        <button
          className="login-button"
          type="submit"
          disabled={navigation.state === "submitting"}
        >
          {navigation.state === "submitting" ? "Logging in..." : "Login"}
        </button>
      </Form>
      <p>
        Don't have an account? Sign in <Link to="/register">here</Link>.
      </p>
    </div>
  );
}
