import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post("http://localhost:3205/api/users/login", { email, password })
        .then((response) => {
          const token = response.data.data.token;
          const name = response.data.data.username;
          const id = response.data.data._id;
          localStorage.setItem("token", token);
          localStorage.setItem("name", name);
          localStorage.setItem("id", id);

          toast.success(response.data.message);
          nav("/");
        })
        .catch((error) => {
          console.log(error);
          toast.error(error.response.data.message);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url('https://img.freepik.com/free-photo/scissors-hair-trimmer-copy-space_23-2148352943.jpg?w=740&t=st=1719986026~exp=1719986626~hmac=55a2e1d048b87a8356ae4af7282f22d038509ea2aa9ec83e33696424244252cf')`,
      }}
    >
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg opacity-90">
        <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={submitHandler}>
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full p-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black"
          >
            Login
          </button>
        </form>
        <h3 className="mt-4 text-center">Don t have an account?</h3>
        <Link
          to={"/usersignup"}
          className="text-blue-500 hover:underline text-center block mt-2"
        >
          Create a New Account
        </Link>
      </div>
    </div>
  );
};

export default Login;
