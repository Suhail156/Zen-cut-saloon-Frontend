import { useNavigate } from "react-router-dom";

const ShopOwnerNavbar = () => {
  const navigate = useNavigate();

  const ownername = localStorage.getItem("name");

  return (
    <div className="nav_container owner_logged_in">
      <div className="flex flex-col md:flex-row items-center justify-between px-6 py-4">
        <h1
          className="text-4xl font-extrabold cursor-pointer text-black hover:text-blue-500 transition duration-300 mb-4 md:mb-0 ml-10"
          onClick={() => navigate("/shophome")}
        >
          <span className="font-semibold">Zen</span>
          <span className="font-semibold text-blue-500">Cut</span>
        </h1>
        <div className="flex gap-4">
          <h1 className="px-4 py-2 text-gray-700    hover:bg-gray-200 hover:text-gray-900 hover:rounded-xl transition duration-300">
            {ownername}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default ShopOwnerNavbar;
