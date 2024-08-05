"use client";
import { Button, Input } from "@nextui-org/react";
import { useState } from "react";

function LoginDokter() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch("/api/auth/loginDokter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (data.uid) {
        console.log("Dokter data:", data.dokterData);
        // Perform further actions such as storing user data or redirecting
      } else {
        console.error("Login failed:", data.message);
      }
    } catch (error) {
      console.error("Error logging in dokter:", error);
    }
  };

  return (
    <div>
      <h1>Login Dokter</h1>
      <Input type="email" label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />

      <Input type="password" label="Password" value={password} onChange={(e) => setPassword(e.target.value)} />

      <Button onClick={handleLogin} color="primary" disabled={email === "" || password === ""}>
        Login
      </Button>
    </div>
  );
}

export default LoginDokter;
