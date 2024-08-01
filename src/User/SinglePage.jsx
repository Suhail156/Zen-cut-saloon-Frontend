import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../Navbar";
import { format, addMinutes, startOfToday, addDays } from 'date-fns';

const SinglePage = () => {
  const [shop, setShop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState(startOfToday());
  const [selectedSlot, setSelectedSlot] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchShop = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3205/api/usershop/usershopid/${id}`
        );
        const shopData = response.data.data;
        setShop(shopData);
        setLoading(false);
        generateTimeSlots(shopData.startTime, shopData.endTime);
      } catch (error) {
        console.error("Error fetching shop data:", error);
      }
    };

    const generateTimeSlots = (startTime, endTime) => {
      const slots = [];
      let start = new Date(`1970-01-01T${startTime}:00`);
      let end = new Date(`1970-01-01T${endTime}:00`);

      while (start < end) {
        slots.push(format(start, 'hh:mm a'));
        start = addMinutes(start, 60); 
      }

      setTimeSlots(slots);
    };

    fetchShop();
  }, [id]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
  };

  const submitHandler = () => {
    navigate("/bookingpage", { state: { date: selectedDate, slot: selectedSlot, shops: shop } });
  };

  const goBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-black text-white">
        <div className="text-2xl">Loading...</div>
      </div>
    );
  }

  const dates = Array.from({ length: 7 }, (_, i) => addDays(startOfToday(), i));

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-r from-blue-200 to-purple-200">
        <div className="container mx-auto p-4">
          <button
            onClick={goBack}
            className="mb-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Back
          </button>
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

        <div className="container mx-auto flex flex-col md:flex-row gap-8 p-4">
          <div className="w-full md:w-1/2">
            <div className="max-w-full mb-8 relative">
              <div className="p-4">
                <h2 className="text-4xl font-bold mb-2">{shop.shopname}</h2>
                <p className="text-lg text-gray-700 mb-1">{shop.location}</p>
                <p className="text-lg text-gray-700 mb-4">{shop.phone}</p>
                {shop.additionalDetails && (
                  <div>
                    <div className="text-xl font-semibold mt-4 mb-2">
                      Additional Details:
                    </div>
                    <p className="text-lg text-gray-800">{shop.additionalDetails}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/2">
            <div className="p-6 bg-white bg-opacity-30 backdrop-blur-lg rounded-lg shadow-xl border border-gray-300">
              <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
                Schedule Appointment
              </h2>
              
              <div className="flex justify-between mb-4">
                {dates.map((date, index) => (
                  <button
                    key={index}
                    onClick={() => handleDateChange(date)}
                    className={`px-2 py-1 rounded border ${
                      format(selectedDate, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
                        ? 'bg-blue-500 text-white border-blue-600'
                        : 'bg-gray-200 text-gray-800 border-gray-400'
                    }`}
                  >
                    {format(date, 'EEE dd')}
                  </button>
                ))}
              </div>

              <div>
                <div><h1>Available Slots</h1></div>
                <div className="grid grid-cols-3 gap-2">
                  {timeSlots.map((slot, index) => (
                    <button
                      key={index}
                      onClick={() => handleSlotSelect(slot)}
                      className={`px-2 py-1 rounded border ${
                        selectedSlot === slot
                          ? 'bg-blue-500 text-white border-blue-600'
                          : 'bg-gray-200 text-gray-800 border-gray-400'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex justify-center gap-4">
                <button onClick={goBack} className="px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-600">
                  Cancel
                </button>
                <button onClick={submitHandler} className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600">
                  Proceed
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SinglePage;
