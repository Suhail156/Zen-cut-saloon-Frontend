import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const nav = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!isOtpSent) {
      try {
        const response = await axios.post(
          "http://localhost:3205/api/users/signup",
          {
            username,
            password,
            email,
            phone,
          }
        );
        console.log(response);
        if (response.status === 201) {
          console.log(response.data.data);
          setIsOtpSent(true); // Show OTP input field and button
        }
      } catch (error) {
        console.log(error.response.data);
        alert(error.response.data.message);
      }
    } else {
      try {
        const response = await axios.post(
          "http://localhost:3205/api/users/verifyotp",
          {
            email,
            otp,
          }
        );
        console.log(response);
        if (response.status === 200) {
          console.log(response.data.data);
          nav("/userlogin");
        }
      } catch (error) {
        alert(error.response.data.message);
      }
    }
  };

  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundColor: "#f0f0f0",
    },
    signupBox: {
      width: "65vh",
      height: "65vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "2rem",
      backgroundColor: "white",
      borderRadius: "8px",
      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    },
    input: {
      width: "100%",
      padding: "0.75rem",
      margin: "0.5rem 0",
      borderRadius: "4px",
      border: "1px solid #ccc",
    },
    button: {
      width: "100%",
      padding: "0.75rem",
      margin: "1rem 0",
      borderRadius: "4px",
      border: "none",
      backgroundColor: "black",
      color: "white",
      fontSize: "1rem",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.signupBox}>
        <h2>Sign Up</h2>
        <form onSubmit={submitHandler}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
            disabled={isOtpSent}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            disabled={isOtpSent}
          />
          {!isOtpSent ? (
            <>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={styles.input}
              />
              <input
                type="text"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                style={styles.input}
              />
            </>
          ) : (
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              style={styles.input}
            />
          )}
          <button type="submit" style={styles.button}>
            {isOtpSent ? "Verify OTP" : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
