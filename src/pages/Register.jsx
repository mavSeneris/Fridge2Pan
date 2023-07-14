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
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../api";

export async function action({ request }) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const pathname =
    new URL(request.url).searchParams.get("redirectTo") || "/fridge";
  try {
    // const data = await loginUser({ email, password });
    createUserWithEmailAndPassword(auth, email, password).then(
      (userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user)
      }
    );
    localStorage.setItem("loggedin", true);
    return redirect(pathname);
  } catch (err) {
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
