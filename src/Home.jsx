import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import Footer from "./Footer";
import { FaCut, FaBath, FaMagic, FaBrush, FaUserTie } from "react-icons/fa";
import Navbar from "../src/Navbar";

const Home = () => {
  const [shop, setShop] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const nav = useNavigate();
  const baseUrl = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/usershop/usershopview?page=${page}`);
        if (response.data.data.length === 0) {
          setHasMore(false);
        } else {
          setShop(prev => [...prev, ...response.data.data]);
        }
      } catch (error) {
        console.log("error", error);
      }
    };
    if (search === "") fetchShops();
  }, [page, search]);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        if (search.trim() !== "") {
          const response = await axios.get(`${baseUrl}/api/usershop/usershopsearch?locations=${search}`);
          setShop(response.data.shops || []);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (search) {
      setHasMore(false);
      fetchLocation();
    } else {
      setPage(1);
      setShop([]);
      setHasMore(true);
    }
  }, [search]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 &&
        hasMore &&
        search === ""
      ) {
        setPage(prev => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, search]);

  const chunkArray = (arr, chunkSize) => {
    return Array.from({ length: Math.ceil(arr?.length / chunkSize) }, (_, index) =>
      arr?.slice(index * chunkSize, index * chunkSize + chunkSize)
    );
  };

  const chunkedShops = chunkArray(shop, 4);

  const services = [
    {
      icon: <FaCut size={40} className="text-blue-500" />,
      title: "Shave & Haircut",
      description:
        "High-quality scissors designed for precision and comfort, ensuring a clean and sharp cut every time.",
    },
    {
      icon: <FaBath size={40} className="text-blue-500" />,
      title: "Cream & Shampoo",
      description:
        "Durable and flexible combs for easy detangling and styling of hair, perfect for all hair types.",
    },
    {
      icon: <FaMagic size={40} className="text-blue-500" />,
      title: "Mustache Expert",
      description:
        "Classic straight razor for a close and smooth shave, providing a traditional barbershop experience.",
    },
    {
      icon: <FaUserTie size={40} className="text-blue-500" />,
      title: "Haircut Styler",
      description:
        "Professional-grade hair spray for holding styles in place, adding volume and shine to hair.",
    },
    {
      icon: <FaSearch size={40} className="text-blue-500" />,
      title: "Razor For Beards",
      description:
        "Comfortable and adjustable barber chair designed for both barber and client convenience during grooming sessions.",
    },
    {
      icon: <FaBrush size={40} className="text-blue-500" />,
      title: "Haircomb",
      description:
        "Powerful and precise hair clippers for quick and efficient haircuts, featuring multiple length settings.",
    },
  ];

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-r from-blue-200 to-purple-200 mt-[-220px]">
        <div className="w-3/4 mx-auto text-center pt-[70px]">
          <h1 className="text-6xl font-extrabold text-black mb-4">Salon Booking Platform</h1>
          <p className="text-xl text-gray-800 font-medium">
            Book appointments with the best local salons near you.
          </p>
        </div>

        <div className="relative">
          <div className="w-2/4 mx-auto mt-5 mb-56 relative flex items-center z-10">
            <div className="relative flex w-full">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <FaSearch className="text-gray-400 mt-8" />
              </span>
              <input
                type="text"
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-10 pl-10 pr-4 border border-solid rounded-l-lg mt-8"
                placeholder="Search for shops..."
              />
              <button className="bg-black text-white h-10 px-4 rounded-r-lg flex items-center justify-center mt-8">
                Search
              </button>
            </div>
          </div>

          <div className="container mx-auto -mt-20">
            {chunkedShops.map((row, rowIndex) => (
              <div key={rowIndex} className="flex flex-wrap justify-center">
                {row.map((item) => (
                  <div
                    key={item._id}
                    className="w-full sm:w-1/2 md:w-1/4 lg:w-1/4 xl:w-1/4 mb-4 px-2 mt-[40px]"
                  >
                    <div className="border rounded-lg overflow-hidden shadow-lg bg-white transform transition-transform hover:scale-105 opacity-90 hover:opacity-100">
                      <div className="w-full h-40 overflow-hidden">
                        <img
                          src={item.image}
                          className="w-full h-full object-cover cursor-pointer"
                          alt={item.shopname}
                          onClick={() => nav(`/singlepage/${item._id}`)}
                        />
                      </div>
                      <div className="p-4 bg-gradient-to-r from-gray-50 via-gray-100 to-gray-200 shadow-lg">
                        <h2 className="text-lg font-bold mb-2">{item.shopname}</h2>
                        {item.phone && (
                          <p className="text-sm text-gray-600 flex items-center">
                            <FaPhoneAlt className="mr-2" /> {item.phone}
                          </p>
                        )}
                        {item.location && (
                          <p className="text-sm text-gray-600 flex items-center">
                            <FaMapMarkerAlt className="mr-2" /> {item.location}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="min-h-screen bg-gray-100 py-10 mb-[50px] mt-[100px]">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Barber Features</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="bg-white shadow-md rounded-lg p-6 text-center transform transition-transform hover:scale-105 hover:shadow-lg"
                >
                  <div className="mb-4">{service.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default Home;
