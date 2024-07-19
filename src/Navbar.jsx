import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const name = localStorage.getItem("name");
  const id = localStorage.getItem("id");

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="nav_container">
      <div className="flex flex-col md:flex-row items-center justify-between px-6 py-4">
        <h1
          className="text-xl font-bold cursor-pointer text-black hover:text-black transition duration-300 mb-4 md:mb-0"
          onClick={() => navigate("/")}
        >
          <span className="font-semibold">Zen</span>
          <span className="font-semibold">Cut</span>
        </h1>

        <div className="flex gap-4 md:hidden">
          <button
            className="px-4 py-2 text-gray-700 border border-gray-700 rounded-full hover:bg-gray-200 hover:text-gray-900 transition duration-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <FontAwesomeIcon icon={faUser} />
          </button>
        </div>
        <div
          className={`flex-col md:flex md:flex-row gap-4 ${
            isMenuOpen ? "flex" : "hidden"
          } md:flex`}
        >
          {!name ? (
            <>
              <button
                className="px-4 py-2 text-gray-700 border border-gray-700 rounded-full hover:bg-gray-200 hover:text-gray-900 transition duration-300"
                onClick={() => navigate("/shoplogin")}
              >
                For Business
              </button>
              <button
                className="px-4 py-2 text-gray-700 border border-gray-700 rounded-full hover:bg-gray-200 hover:text-gray-900 transition duration-300"
                onClick={() => navigate("/userlogin")}
              >
                Login
              </button>
            </>
          ) : (
            <>
              <button className="btn btn-solid-black rounded-full">
                {name}
              </button>
              <div className="relative inline-block text-left">
                <div>
                  <button
                    type="button"
                    className="inline-flex justify-center w-full rounded-full px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                    id="menu-button"
                    aria-expanded="true"
                    aria-haspopup="true"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                  >
                    <FontAwesomeIcon icon={faUser} />
                  </button>
                </div>
                {isMenuOpen && (
                  <div
                    className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="menu-button"
                    tabIndex="-1"
                  >
                    <div className="py-1" role="none">
                      <button
                        className="text-gray-700 block px-4 py-2 text-sm"
                        role="menuitem"
                        tabIndex="-1"
                        onClick={() => navigate(`/profile/${id}`)}
                      >
                        <FontAwesomeIcon icon={faUser} className="mr-2" />
                        Profile
                      </button>
                      <button
                        className="text-gray-700 block px-4 py-2 text-sm"
                        role="menuitem"
                        tabIndex="-1"
                        onClick={logout}
                      >
                        <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
