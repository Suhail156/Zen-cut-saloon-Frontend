import { useEffect, useState } from "react";
import axios from "axios";
import { TextField } from "@mui/material";
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
    <div className="min-h-screen bg-gray-200 to-purple-200 ">
      <div className="container mx-auto flex flex-col md:flex-row gap-8 p-4">
        {/* Combined Layout: Image, Shop Details, and Booking Form */}
        <div className="w-full max-w-5xl mx-auto flex flex-col md:flex-row gap-8 p-4 bw-full max-w-5xl mx-auto flex flex-col md:flex-row gap-8 p-4 bg-gray-200 to-purple-200 rounded-lg ">
          {/* Left Side: Image and Shop Details */}
          <div className="w-full md:w-1/2">
            <div className="max-w-full h-[500px] mb-8 relative mt-[40px] ml-[20px] ">
              <img
                src={shop.image}
                alt={shop.shopname}
                className="w-full h-full object-cover rounded-lg shadow-lg"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-white text-center">
                  <h2 className="text-4xl font-bold">{shop.shopname}</h2>
                  <p className="text-lg">{shop.location}</p>
                  <p className="text-lg">{shop.phone}</p>
                  {/* Additional Details if needed */}
                  {shop.additionalDetails && (
                    <div>
                      <div className="text-xl font-semibold text-gray-600 mt-4 mb-2">
                        Additional Details:
                      </div>
                      <p className="text-lg text-gray-700">
                        {shop.additionalDetails}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Booking Form */}
          <div className="w-full md:w-1/2">
            <div className="p-6">
              <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
                Book an Appointment
              </h2>
              <form className="space-y-6">
                <div className="relative">
                  <TextField
                    className="w-full"
                    type="text"
                    id="name"
                    name="name"
                    label="Name"
                    variant="outlined"
                    InputProps={{ style: { background: "white" } }}
                  />
                </div>
                <div className="relative">
                  <TextField
                    className="w-full"
                    id="address"
                    name="address"
                    label="Address"
                    variant="outlined"
                    InputProps={{ style: { background: "white" } }}
                  />
                </div>
                <div className="relative">
                  <TextField
                    className="w-full"
                    type="tel"
                    id="number"
                    name="number"
                    label="Number"
                    variant="outlined"
                    InputProps={{ style: { background: "white" } }}
                  />
                </div>

                <div className="relative">
                  <input
                    type="date"
                    id="date"
                    name="date"
                    placeholder="Date"
                    className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition duration-300"
                  />
                </div>
                <div className="relative">
                  <input
                    type="time"
                    id="time"
                    name="time"
                    placeholder="Time"
                    className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition duration-300"
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
