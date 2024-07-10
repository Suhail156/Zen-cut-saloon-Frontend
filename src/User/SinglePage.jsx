import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const SinglePage = () => {
    const [shop, setShop] = useState(null);
    const [loading, setLoading] = useState(true); // State to manage loading indicator
    const { id } = useParams();

    useEffect(() => {
        const fetchShop = async () => {
            try {
                const response = await axios.get(`http://localhost:3205/api/shop/shopbyid/${id}`);
                setShop(response.data.data);
                setLoading(false); // Set loading to false after data is fetched
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
        <div className="bg-gray-600 min-h-screen py-10">
            <div className="container  mx-auto flex flex-col md:flex-row justify-center items-center gap-8">
                {/* Shop Card */}
                <div className="flex-1 max-w-lg rounded-lg overflow-hidden shadow-lg bg-white h-[600px]">
                    <img src={shop.image} alt={shop.shopname} className="w-full h-[400px] object-cover rounded-t-lg" />
                    <div className="p-6">
                        <h2 className="text-3xl font-bold mb-4 text-gray-800">{shop.shopname}</h2>
                        <h3 className="text-xl font-semibold text-gray-600 mb-2">{shop.location}</h3>
                        <p className="text-lg text-gray-700 mb-4">{shop.phone}</p>
                    </div>
                </div>

                {/* Booking Form */}
                <div className="flex-1 max-w-md p-8 bg-white rounded-lg shadow-lg ">
                    <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Book an Appointment</h2>
                    <form>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-sm font-semibold mb-2 text-gray-700">Name:</label>
                            <input type="text" id="name" name="name" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="address" className="block text-sm font-semibold mb-2 text-gray-700">Address:</label>
                            <input type="text" id="address" name="address" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="number" className="block text-sm font-semibold mb-2 text-gray-700">Phone Number:</label>
                            <input type="tel" id="number" name="number" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="date" className="block text-sm font-semibold mb-2 text-gray-700">Date:</label>
                            <input type="date" id="date" name="date" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="time" className="block text-sm font-semibold mb-2 text-gray-700">Time:</label>
                            <input type="time" id="time" name="time" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500" />
                        </div>
                        <button
                            type="submit"
                            className="w-full px-4 py-2 bg-gradient-to-r from-indigo-600 to-blue-500 text-white rounded-lg hover:bg-indigo-500 transition duration-300"
                        >
                            Confirm Booking
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SinglePage;
