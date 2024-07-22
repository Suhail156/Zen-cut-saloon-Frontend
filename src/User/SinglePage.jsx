import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const SinglePage = () => {
  const [shop, setShop] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchShop = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3205/api/usershop/usershopid/${id}`
        );
        setShop(response.data.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchShop();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-black text-white">
        <div className="text-2xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-200">
      {/* Top Section with Image Carousel */}
      <div className="container mx-auto p-4">
        <div className="w-full">
          <div className="h-[500px] mb-8 relative">
            <img
              src={shop.image}
              alt={shop.shopname}
              className="w-full h-full object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>

      {/* Bottom Section with Shop Details and Booking Form */}
      <div className="container mx-auto flex flex-col md:flex-row gap-8 p-4">
        <div className="w-full max-w-5xl mx-auto flex flex-col md:flex-row gap-8 p-4 bg-white rounded-lg shadow-lg">
          {/* Left Side: Shop Details */}
          <div className="w-full md:w-2/3">
            <div className="max-w-full mb-8 relative">
              <div className="p-4">
                <h2 className="text-4xl font-bold">{shop.shopname}</h2>
                <p className="text-lg">{shop.location}</p>
                <p className="text-lg">{shop.phone}</p>
                {shop.additionalDetails && (
                  <div>
                    <div className="text-xl font-semibold mt-4 mb-2">
                      Additional Details:
                    </div>
                    <p className="text-lg">{shop.additionalDetails}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Side: Date and Time Pickers */}
          <div className="w-full md:w-1/3">
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
                Book Now
              </h2>
              <form className="space-y-6">
                <div className="relative">
                  <label htmlFor="booking-date" className="block mb-2 text-gray-700">
                    Booking Date
                  </label>
                  <input
                    type="date"
                    id="booking-date"
                    name="booking-date"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition duration-300"
                  />
                </div>
                <div className="relative">
                  <label htmlFor="booking-time" className="block mb-2 text-gray-700">
                    Booking Time
                  </label>
                  <input
                    type="time"
                    id="booking-time"
                    name="booking-time"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition duration-300"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-4 py-3 bg-gradient-to-r from-black via-gray-800 to-gray-900 text-white rounded-lg hover:bg-gray-800 transition duration-300"
                >
                  Confirm Booking
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePage;
