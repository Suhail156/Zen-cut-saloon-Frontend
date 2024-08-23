import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Signup = () => {
  const baseUrl=import.meta.env.VITE_BASE_URL;
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
          `${baseUrl}/api/users/signup`,
          {
            username,
            password,
            email,
            phone,
          }
        );
        console.log(response);
        if (response.status === 200) {
          setIsOtpSent(true);
        }
      } catch (error) {
        console.log(error.response.data);
        alert(error.response.data.message);
      }
    } else {
      try {
        const response = await axios.post(
          `${baseUrl}/api/users/verifyotp`,
          {
            email,
            otp,
          }
        );
        if (response.status === 201) {
          toast.success("successfull");
          nav("/userlogin");
        }
      } catch (error) {
        console.log(error.response.data);
        alert(error.response.data.message);
      }
    }
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url('https://img.freepik.com/premium-photo/spray-bottle-hair-dryer_23-2148352946.jpg?w=740')`,
      }}
    >
      <div className="w-1/2 lg:w-1/3 bg-white p-8 rounded-lg shadow-lg opacity-70">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        <form onSubmit={submitHandler}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
            disabled={isOtpSent}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
            disabled={isOtpSent}
          />
          {!isOtpSent ? (
            <>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
              />
              <input
                type="text"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
              />
            </>
          ) : (
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
            />
          )}
          <button
            type="submit"
            className="w-full p-3 bg-black text-white rounded-lg font-semibold"
          >
            {isOtpSent ? "Verify OTP" : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
