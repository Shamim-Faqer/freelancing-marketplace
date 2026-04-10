import React, { useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import { useNavigate } from "react-router-dom";

const User = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isLogin) {
        // ✅ LOGIN
        const result = await signInWithEmailAndPassword(auth, email, password);
        localStorage.setItem("user", JSON.stringify(result.user));
        alert("Login successful ✅");
        navigate("/home");
      } else {
        // ✅ REGISTER
        const result = await createUserWithEmailAndPassword(auth, email, password);

        const userData = {
          email: result.user.email,
          uid: result.user.uid,
        };

        await fetch("http://localhost:3000/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData),
        });

        localStorage.setItem("user", JSON.stringify(result.user));
        alert("Registration successful ✅");
        navigate("/home");
      }
    } catch (error) {
      console.log(error.code);

      if (error.code === "auth/email-already-in-use") {
        alert("এই email আগে থেকেই আছে। Login করুন।");
        setIsLogin(true);
      } else if (error.code === "auth/invalid-email") {
        alert("Invalid email format ❌");
      } else if (error.code === "auth/weak-password") {
        alert("Password খুব weak (কমপক্ষে 6 character দিন)");
      } else if (error.code === "auth/user-not-found") {
        alert("User পাওয়া যায়নি ❌ Register করুন");
      } else if (error.code === "auth/wrong-password") {
        alert("Wrong password ❌");
      } else {
        alert("Something went wrong ❌");
      }
    }
  };

  return (
    <div>
      <h2>{isLogin ? "Login" : "Register"}</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />

        <button type="submit">
          {isLogin ? "Login" : "Register"}
        </button>
      </form>

      <p
        style={{ cursor: "pointer", color: "blue" }}
        onClick={() => setIsLogin(!isLogin)}
      >
        {isLogin
          ? "Don't have an account? Register"
          : "Already have an account? Login"}
      </p>
    </div>
  );
};

export default User;