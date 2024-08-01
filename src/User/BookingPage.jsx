import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import axios from 'axios';
import toast from 'react-hot-toast';

const BookingPage = () => {
  const location = useLocation();
  const { date, slot, shops } = location.state || {};
  const id = localStorage.getItem('id');
  const nav = useNavigate();
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  // const [owner,setOwner] = useState('')

  const ownerId = shops.ownerId
  const booking = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:3205/api/userbooking/booking/${id}/shop/${shops._id}/${ownerId}`, {
        username,
        phone,
        startTime: slot,
        date: date
      });
      toast.success(response.data.message)
      nav('/');
      console.log(response, 'sdfghj');
    } catch (error) {
      console.error('Error booking appointment:', error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-200 flex justify-center items-center">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl flex">
          {/* Image Section */}
          <div className="w-1/2 relative rounded-lg overflow-hidden">
            <div >
              <img
                src={shops.image}
                alt={shops.shopname}
                className="absolute top-0 left-0 w-full h-full object-cover"
              />
            </div>
          </div>
          {/* Details Section */}
          <div className="w-1/2 p-8 flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Booking Details</h2>
            <p className="text-lg mb-2"><span className="font-semibold">Selected Date:</span> {date && date.toDateString()}</p>
            <p className="text-lg mb-4"><span className="font-semibold">Selected Time:</span> {slot}</p>
            <p className="text-lg mb-4"><span className="font-semibold">Phone:</span> {shops.phone}</p>
            <form onSubmit={booking} className="mt-4">
              <div className="mb-6">
                <label htmlFor="username" className="block text-lg font-semibold mb-2">Client Name</label>
                <input
                  type="text"
                  id="username"
                  className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-gray-900 placeholder-gray-500 transition duration-300 ease-in-out"
                  placeholder="Enter your name"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="mb-6">
                <label htmlFor="phone" className="block text-lg font-semibold mb-2">Phone Number</label>
                <input
                  type="text"
                  id="phone"
                  className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-gray-900 placeholder-gray-500 transition duration-300 ease-in-out"
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="w-full py-3 bg-blue-500 text-white rounded-full font-semibold hover:bg-blue-600 transition duration-300">Book Appointment</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingPage;
