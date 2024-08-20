import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaHome,
  FaShopify,
  FaCalendarCheck,
  FaInfoCircle,
  FaUser,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";

const SideNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(true);
  const nav = useNavigate();
  const id = localStorage.getItem("ownerId");

  const logout = () => {
    localStorage.clear();
    nav("/");
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div>
      <button
        onClick={toggleMenu}
        className="fixed top-4 left-4 z-10 p-3 bg-teal-500 text-white rounded-full shadow-lg hover:bg-teal-600 transition duration-300"
        title={menuOpen ? "Close Menu" : "Open Menu"}
      >
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>
      <div
        className={`fixed top-0 left-0 h-full bg-white text-black flex flex-col items-start py-6 mt-[72px] shadow-lg rounded-r-lg transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } ${menuOpen ? "w-64" : "w-16"}`}
      >
        <div
          className={`flex items-center mb-6 px-4 ${
            menuOpen ? "block" : "hidden"
          }`}
        >
          <h1 className="text-2xl font-bold">Shop Panel</h1>
        </div>
        <nav className="flex flex-col w-full">
          <button
            onClick={() => nav("/shophome")}
            className="w-full px-4 py-3 flex items-center text-left text-black bg-white rounded-lg transition duration-300 hover:bg-gray-200"
            title="Dashboard"
          >
            <FaHome className="text-xl" />
            <span className={`ml-2 text-lg ${menuOpen ? "block" : "hidden"}`}>
              Dashboard
            </span>
          </button>
          <button
            onClick={() => nav("/addshop")}
            className="w-full px-4 py-3 flex items-center text-left text-black bg-white rounded-lg transition duration-300 hover:bg-gray-200"
            title="Add Shop Details"
          >
            <FaShopify className="text-xl" />
            <span className={`ml-2 text-lg ${menuOpen ? "block" : "hidden"}`}>
              Add Shop Details
            </span>
          </button>
          <button
            onClick={() => nav("/bookingdetails")}
            className="w-full px-4 py-3 flex items-center text-left text-black bg-white rounded-lg transition duration-300 hover:bg-gray-200"
            title="Booking Details"
          >
            <FaCalendarCheck className="text-xl" />
            <span className={`ml-2 text-lg ${menuOpen ? "block" : "hidden"}`}>
              Booking Details
            </span>
          </button>
          <button
            onClick={() => nav("/viewshops")}
            className="w-full px-4 py-3 flex items-center text-left text-black bg-white rounded-lg transition duration-300 hover:bg-gray-200"
            title="Shop Details"
          >
            <FaInfoCircle className="text-xl" />
            <span className={`ml-2 text-lg ${menuOpen ? "block" : "hidden"}`}>
              Shop Details
            </span>
          </button>
          <button
            onClick={() => nav(`/ownerviewpending/${id}`)}
            className="w-full px-4 py-3 flex items-center text-left text-black bg-white rounded-lg transition duration-300 hover:bg-gray-200"
            title="Booking Confirmation"
          >
            <FaCalendarCheck className="text-xl" />
            <span className={`ml-2 text-lg ${menuOpen ? "block" : "hidden"}`}>
              Booking Confirmation
            </span>
          </button>
          <button
            onClick={() => nav(`/ownerprofile/${id}`)}
            className="w-full px-4 py-3 flex items-center text-left text-black bg-white rounded-lg transition duration-300 hover:bg-gray-200"
            title="Profile"
          >
            <FaUser className="text-xl" />
            <span className={`ml-2 text-lg ${menuOpen ? "block" : "hidden"}`}>
              Profile
            </span>
          </button>
          <button
            onClick={logout}
            className="w-full px-4 py-3 flex items-center text-left text-black bg-white rounded-lg transition duration-300 hover:bg-gray-200"
            title="Logout"
          >
            <FaSignOutAlt className="text-xl" />
            <span className={`ml-2 text-lg ${menuOpen ? "block" : "hidden"}`}>
              Logout
            </span>
          </button>
        </nav>
      </div>
      <div
        className={`flex-1 p-4 transition-all duration-300 ${
          menuOpen ? "ml-64" : "ml-16"
        }`}
      ></div>
    </div>
  );
};

export default SideNavbar;
