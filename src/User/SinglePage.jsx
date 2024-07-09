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
            <div className="flex justify-center items-center min-h-screen bg-black text-white  ">
                <div>Loading...</div>
            </div>
        );
    }

    return (
        <div className="bg-black min-h-screen">
            <div className="flex justify-center items-center mx-auto my-20">
                {/* Shop Card */}
                <div className="flex-1 max-w-sm rounded-lg overflow-hidden shadow-lg">
                    <img src={shop.image} alt={shop.shopname} className="w-full h-64 object-cover" />
                    <div className="p-4">
                        <h2 className="text-2xl font-bold mb-2">{shop.shopname}</h2>
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">{shop.location}</h3>
                        <p className="text-sm text-gray-600 mb-4">{shop.phone}</p>
                    </div>
                </div>

                {/* Booking Form */}
                <div className="flex-1 max-w-sm ml-8 p-4 bg-white rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold text-center mb-4">Book an Appointment</h2>
                    <form>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-sm font-semibold mb-1">Name:</label>
                            <input type="text" id="name" name="name" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="address" className="block text-sm font-semibold mb-1">Address:</label>
                            <input type="text" id="address" name="address" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="number" className="block text-sm font-semibold mb-1">Phone Number:</label>
                            <input type="tel" id="number" name="number" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="date" className="block text-sm font-semibold mb-1">Date:</label>
                            <input type="date" id="date" name="date" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="time" className="block text-sm font-semibold mb-1">Time:</label>
                            <input type="time" id="time" name="time" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" />
                        </div>
                        <button
                            type="submit"
                            className="w-full px-4 py-2 bg-black text-white rounded-lg hover:bg-blue-500 transition duration-300"
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
