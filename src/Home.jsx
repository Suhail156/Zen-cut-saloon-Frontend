import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import Footer from "./Footer";
import {
  FaCut,
  FaBath,
  FaMagic,
  FaBrush,
  FaUserTie,
} from "react-icons/fa";
import Navbar from "../src/Navbar";

const Home = () => {
  const [shop, setShop] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [searchTimeout, setSearchTimeout] = useState(null);

  const nav = useNavigate();
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const fetchShops = async (isSearch = false, pageNum = 1) => {
    try {
      setLoading(true);
      const url = isSearch
        ? `${baseUrl}/api/usershop/usershopsearch?locations=${search}&page=${pageNum}`
        : `${baseUrl}/api/usershop/usershopview?page=${pageNum}`;

      const response = await axios.get(url);
      const fetched = isSearch ? response.data.shops : response.data.data;

      if (fetched.length === 0) {
        setHasMore(false);
      } else {
        setShop((prev) => (pageNum === 1 ? fetched : [...prev, ...fetched]));
      }
    } catch (error) {
      console.error("Error fetching shops:", error);
    } finally {
      setLoading(false);
    }
  };

  // Initial & paginated fetch
  useEffect(() => {
    fetchShops(!!search, page);
  }, [page]);

  // Debounced Search
  useEffect(() => {
    clearTimeout(searchTimeout);
    const timeout = setTimeout(() => {
      setPage(1);
      setShop([]);
      setHasMore(true);
      if (search.trim() !== "") {
        fetchShops(true, 1);
      } else {
        fetchShops(false, 1);
      }
    }, 500);

    setSearchTimeout(timeout);

    return () => clearTimeout(timeout);
  }, [search]);

  // Scroll-based lazy loading
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 100 &&
        hasMore &&
        !loading
      ) {
        setPage((prev) => prev + 1);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, loading]);

  const chunkArray = (arr, size) => {
    return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
      arr.slice(i * size, i * size + size)
    );
  };

  const chunkedShops = chunkArray(shop, 4);

  const services = [
    {
      icon: <FaCut size={40} className="text-blue-500" />,
      title: "Shave & Haircut",
      description:
        "High-quality scissors designed for precision and comfort.",
    },
    {
      icon: <FaBath size={40} className="text-blue-500" />,
      title: "Cream & Shampoo",
      description: "Flexible combs perfect for all hair types.",
    },
    {
      icon: <FaMagic size={40} className="text-blue-500" />,
      title: "Mustache Expert",
      description: "Classic razor for a traditional shave.",
    },
    {
      icon: <FaUserTie size={40} className="text-blue-500" />,
      title: "Haircut Styler",
      description: "Professional hair spray for lasting styles.",
    },
    {
      icon: <FaSearch size={40} className="text-blue-500" />,
      title: "Razor For Beards",
      description: "Adjustable chairs for grooming convenience.",
    },
    {
      icon: <FaBrush size={40} className="text-blue-500" />,
      title: "Haircomb",
      description: "Precise clippers with multiple settings.",
    },
  ];

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-r from-blue-200 to-purple-200 mt-[-220px]">
        <div className="w-3/4 mx-auto text-center pt-[120px]">
          <h1 className="text-5xl font-bold italic text-black mt-32">
            Book Your Style at the Best{" "}
            <span className="text-purple-700">Salon Booking</span> Platform!
          </h1>
        </div>

        {/* Search Bar */}
        <div className="w-2/4 mx-auto mt-5 mb-56 relative flex items-center z-10">
          <div className="relative flex w-full">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <FaSearch className="text-gray-400 mt-8" />
            </span>
            <input
              type="text"
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-10 pl-10 pr-4 border border-solid rounded-l-lg mt-8"
              placeholder="Search for salon shops..."
            />
            <button className="bg-black text-white h-10 px-4 rounded-r-lg flex items-center justify-center mt-8">
              Search
            </button>
          </div>
        </div>

        {/* Spinner */}
        {loading && (
          <div className="text-center mb-4">
            <div className="inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {/* Shop Grid */}
        <div className="container mx-auto -mt-20">
          {chunkedShops.map((row, rowIndex) => (
            <div key={rowIndex} className="flex flex-wrap justify-center">
              {row.map((item) => (
                <div
                  key={item._id}
                  className="w-full sm:w-1/2 md:w-1/4 px-2 mt-[40px]"
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
                    <div className="p-4 bg-gradient-to-r from-gray-50 via-gray-100 to-gray-200">
                      <h2 className="text-lg font-bold mb-2">
                        {item.shopname}
                      </h2>
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

        {/* Barber Features */}
        <div className="min-h-screen bg-gray-100 py-10 mb-[50px] mt-[100px]">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Salon Features</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="bg-white shadow-md rounded-lg p-6 text-center transform transition-transform hover:scale-105 hover:shadow-lg"
                >
                  <div className="mb-4">{service.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">
                    {service.title}
                  </h3>
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
