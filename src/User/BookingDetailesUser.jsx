import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const BookingDetailesUser = () => {
  const [data, setData] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3205/api/users/userviewbookings/${id}`
        );
        setData(response.data.data.booking);
        console.log(response.data.data.booking);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

  const handleBackClick = () => {
    navigate('/'); 
  };

  return (
    <div className="w-full mt-10 p-6 bg-gradient-to-r from-blue-200 to-purple-200 shadow-md rounded-lg">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Booking Details
      </h1>

      <button 
        onClick={handleBackClick} 
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Back
      </button>

      {data.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full bg-white">
            <thead>
              <tr>
                <th className="text-left px-6 py-4 border-b font-medium text-gray-800">
                  Si No
                </th>
                <th className="text-left px-6 py-4 border-b font-medium text-gray-800">
                  Username
                </th>
                <th className="text-left px-6 py-4 border-b font-medium text-gray-800">
                  Phone
                </th>
                <th className="text-left px-6 py-4 border-b font-medium text-gray-800">
                  Date
                </th>
                <th className="text-left px-6 py-4 border-b font-medium text-gray-800">
                  Start Time
                </th>
                <th className="text-left px-6 py-4 border-b font-medium text-gray-800">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((booking, index) => (
                <tr key={booking._id}>
                  <td className="px-6 py-4 border-b text-gray-600">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 border-b text-gray-600">
                    {booking.username}
                  </td>
                  <td className="px-6 py-4 border-b text-gray-600">
                    {booking.phone}
                  </td>
                  <td className="px-6 py-4 border-b text-gray-600">
                    {new Date(booking.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 border-b text-gray-600">
                    {booking.startTime}
                  </td>
                  <td className="px-6 py-4 border-b">
                    <span
                      className={`${
                        booking.status === "accept"
                          ? "text-green-500"
                          : "text-red-500"
                      } font-semibold`}
                    >
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-500">No bookings found.</p>
      )}
    </div>
  );
};

export default BookingDetailesUser;
