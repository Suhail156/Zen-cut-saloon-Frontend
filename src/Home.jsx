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
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();
  const baseUrl = import.meta.env.VITE_BASE_URL;

  // Fetch shops for infinite scroll pagination
  useEffect(() => {
    if (search !== "") return; // Only load paginated shops when not searching

    const fetchShops = async () => {
      try {
        setLoading(true);
        console.log(`Fetching shops for page: ${page}`);
        const response = await axios.get(`${baseUrl}/api/usershop/usershopview?page=${page}`);

        if (response.data.data.length === 0) {
          console.log("No more shops to fetch.");
          setHasMore(false);
        } else {
          setShop((prev) => [...prev, ...response.data.data]);
          setHasMore(true);
        }
      } catch (error) {
        console.log("Error fetching shops:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchShops();
  }, [page, search, baseUrl]);

  // Search shops by location
  useEffect(() => {
    const fetchLocation = async () => {
      try {
        setLoading(true);
        if (search.trim() !== "") {
          console.log(`Searching shops by location: ${search}`);
          const response = await axios.get(`${baseUrl}/api/usershop/usershopsearch?locations=${search}`);
          setShop(response.data.shops || []);
          setHasMore(false);
        } else {
          // Reset when search cleared
          setShop([]);
          setPage(1);
          setHasMore(true);
        }
      } catch (error) {
        console.log("Error searching shops:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLocation();
  }, [search, baseUrl]);

  // Infinite scroll with throttling
  useEffect(() => {
    let throttleTimer = null;

    const handleScroll = () => {
      if (throttleTimer) return;

      throttleTimer = setTimeout(() => {
        throttleTimer = null;

        const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;
        console.log(`Scroll: nearBottom=${nearBottom}, hasMore=${hasMore}, search='${search}'`);
        if (nearBottom && hasMore && search === "" && !loading) {
          setPage((prev) => prev + 1);
        }
      }, 250);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, search, loading]);

  // Divide shops into rows of 4
  const chunkArray = (arr, chunkSize) => {
    return Array.from({ length: Math.ceil(arr?.length / chunkSize) }, (_, index) =>
      arr?.slice(index * chunkSize, index * chunkSize + chunkSize)
    );
  };
  const chunkedShops = chunkArray(shop, 4);

  // Barber features list
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
        <div className="w-3/4 mx-auto text-center pt-[120px]">
          <h1 className="text-5xl font-bold italic text-black mt-32">
            Transform yourself with the <br />
            <span className="font-bold italic">best local beauty experts.</span>
            <br />
            <span className="font-bold italic">Book now!</span>
          </h1>
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
                placeholder="Search for shops by location..."
                value={search}
              />
              <button
                onClick={() => {
                  // Trigger search manually on button click (optional)
                  // Here, input's onChange already updates search state and triggers search useEffect.
                }}
                className="bg-black text-white h-10 px-4 rounded-r-lg flex items-center justify-center mt-8"
              >
                Search
              </button>
            </div>
          </div>

          {/* Loading spinner */}
          {loading && (
            <div className="text-center mb-4 text-blue-600 font-semibold">Loading...</div>
          )}

          <div className="container mx-auto -mt-20">
            {chunkedShops.length === 0 && !loading && (
              <p className="text-center text-gray-600">No shops found.</p>
            )}

            {chunkedShops.map((row, rowIndex) => (
              <div key={rowIndex} className="flex flex-wrap justify-center">
                {row.map((item) => (
                  <div
                    key={item._id}
                    className="w-full sm:w-1/2 md:w-1/4 lg:w-1/4 xl:w-1/4 mb-4 px-2 mt-[40px]"
                  >
                    <div className="border rounded-lg overflow-hidden shadow-lg bg-white transform transition-transform hover:scale-105 opacity-90 hover:opacity-100 cursor-pointer">
                      <div className="w-full h-40 overflow-hidden">
                        <img
                          src={item.image}
                          className="w-full h-full object-cover"
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
