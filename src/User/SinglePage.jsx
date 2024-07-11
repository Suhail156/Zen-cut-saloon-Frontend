import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const SinglePage = () => {
    const [shop, setShop] = useState(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    useEffect(() => {
        const fetchShop = async () => {
            try {
                const response = await axios.get(`http://localhost:3205/api/usershop/usershopid/${id}`);
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
        <div className="bg-gradient-to-r from-gray-700 via-gray-900 to-black min-h-screen py-10">
            <div className="container mx-auto flex flex-col items-center justify-center gap-8 p-4">
                {/* Combined Card */}
                <div className="flex flex-col md:flex-row items-center max-w-5xl rounded-lg overflow-hidden shadow-lg bg-white transform hover:scale-105 transition duration-500">
                    <div className="relative flex-1 h-[500px]">
                        <img src={shop.image} alt={shop.shopname} className="w-full h-full object-cover" />
                        <div className="absolute bottom-0 w-full bg-white bg-opacity-75 p-4">
                            <h2 className="text-3xl font-bold text-gray-800">{shop.shopname}</h2>
                            <h3 className="text-xl font-semibold text-gray-600">{shop.location}</h3>
                            <p className="text-lg text-gray-700">{shop.phone}</p>
                        </div>
                    </div>
                    <div className="flex-1 h-[500px] p-6 bg-white">
                        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Book an Appointment</h2>
                        <form className="space-y-6">
                            <div className="relative">
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder="Name"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition duration-300"
                                />
                            </div>
                            <div className="relative">
                                <input
                                    type="text"
                                    id="address"
                                    name="address"
                                    placeholder="Address"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition duration-300"
                                />
                            </div>
                            <div className="relative">
                                <input
                                    type="tel"
                                    id="number"
                                    name="number"
                                    placeholder="Phone Number"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition duration-300"
                                />
                            </div>
                            <div className="relative">
                                <input
                                    type="date"
                                    id="date"
                                    name="date"
                                    placeholder="Date"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition duration-300"
                                />
                            </div>
                            <div className="relative">
                                <input
                                    type="time"
                                    id="time"
                                    name="time"
                                    placeholder="Time"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition duration-300"
                                />
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
        </div>
    );
};

export default SinglePage;
