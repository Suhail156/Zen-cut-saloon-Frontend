import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../Navbar";
import { format, addMinutes, startOfToday, addDays } from "date-fns";
import toast, { Toaster } from "react-hot-toast";

const SinglePage = () => {
  const [shop, setShop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState(startOfToday());
  const [selectedSlot, setSelectedSlot] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const userId = localStorage.getItem("id");

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
      const now = new Date();

      // Check if the selected date is today
      const isToday = format(selectedDate, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd");

      while (start < end) {
        // Filter out past time slots for today
        if (!isToday || start > now) {
          slots.push(format(start, "hh:mm a"));
        }
        start = addMinutes(start, 60);
      }

      setTimeSlots(slots);
    };

    fetchShop();
  }, [id, selectedDate]); // Added selectedDate to the dependency array

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedSlot(null); // Reset selected slot when date changes
  };

  const handleSlotClick = (slot) => {
    setSelectedSlot(slot);
  };

  const checkAvailability = async () => {
    const formattedDate = format(selectedDate, "yyyy-MM-dd");
    console.log("Selected values:", {
      id,
      formattedDate,
      selectedSlot,
    });

    try {
      const response = await axios.get(
        "http://localhost:3205/api/userbooking/checkavailability",
        {
          params: {
            shopId: id,
            date: formattedDate,
            startTime: selectedSlot,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Slot available for booking!");
      } else {
        toast.error("No available slots for the selected date and time.");
      }
    } catch (error) {
      console.error("Error checking availability:", error);
      toast.error(
        error.response?.data?.message || "Error checking availability."
      );
    }
  };

  const submitHandler = async () => {
    if (!selectedSlot) {
      toast.error("Please select a slot.");
      return;
    }

    if (!userId) {
      navigate("/userlogin");
      return;
    }
    navigate("/bookingpage", {
      state: { date: selectedDate, slot: selectedSlot, shops: shop },
    });
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

  let categories = [];
  try {
    categories = shop.category ? JSON.parse(shop.category) : [];
  } catch (error) {
    console.error("Error parsing categories:", error);
  }

  return (
    <>
      <Navbar />
      <Toaster />
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
                <h2 className="text-3xl md:text-4xl font-bold mb-2">
                  {shop.shopname}
                </h2>
                <p className="text-base md:text-lg text-gray-700 mb-1">
                  {shop.location}
                </p>
                <p className="text-base md:text-lg text-gray-700 mb-4">
                  {shop.phone}
                </p>

                <div className="mb-4">
                  <h3 className="text-lg md:text-xl font-semibold">
                    Categories:
                  </h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {categories.length > 0 ? (
                      categories.map((category, index) => (
                        <button
                          key={index}
                          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-full text-sm hover:bg-gray-300"
                        >
                          {category.name}
                        </button>
                      ))
                    ) : (
                      <span>No categories available</span>
                    )}
                  </div>
                </div>

                {shop.additionalDetails && (
                  <div>
                    <div className="text-lg md:text-xl font-semibold mt-4 mb-2">
                      Additional Details:
                    </div>
                    <p className="text-base md:text-lg text-gray-800">
                      {shop.additionalDetails}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/2">
            <div className="p-6 bg-white bg-opacity-30 backdrop-blur-lg rounded-lg shadow-xl border border-gray-300">
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-gray-800">
                Schedule Appointment
              </h2>

              <div className="flex flex-wrap gap-2 justify-center mb-4">
                {dates.map((date, index) => (
                  <button
                    key={index}
                    onClick={() => handleDateChange(date)}
                    className={`px-2 py-1 rounded border ${
                      format(selectedDate, "yyyy-MM-dd") ===
                      format(date, "yyyy-MM-dd")
                        ? "bg-blue-500 text-white border-blue-600"
                        : "bg-gray-200 text-gray-800 border-gray-400"
                    }`}
                  >
                    {format(date, "EEE dd")}
                  </button>
                ))}
              </div>

              <div>
                <h3 className="text-lg md:text-xl font-semibold mb-2">
                  Available Slots
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                  {timeSlots.length > 0 ? (
                    timeSlots.map((slot, index) => {
                      const slotTime = new Date(`1970-01-01T${slot}`);
                      const now = new Date();
                      const isToday =
                        format(selectedDate, "yyyy-MM-dd") ===
                        format(new Date(), "yyyy-MM-dd");
                      const isPastSlot = isToday && slotTime <= now;

                      return (
                        <button
                          key={index}
                          onClick={() => handleSlotClick(slot)}
                          className={`px-2 py-1 rounded border ${
                            selectedSlot === slot
                              ? "bg-green-500 text-white border-green-600"
                              : "bg-gray-200 text-gray-800 border-gray-400"
                          }`}
                          disabled={isPastSlot} // Disable past slots
                        >
                          {slot}
                        </button>
                      );
                    })
                  ) : (
                    <span>No slots available for the selected date</span>
                  )}
                </div>
              </div>

              <button
                onClick={checkAvailability}
                className="w-full mt-6 px-4 py-2 bg-black text-white rounded-lg hover:bg-black-600"
              >
                Check Availability
              </button>
              <button
                onClick={submitHandler}
                className="w-full mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                disabled={!selectedSlot}
              >
                Proceed to Booking
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SinglePage;