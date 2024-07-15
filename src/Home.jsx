import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa'; // Import icons
import Footer from './Footer';
import { FaCut, FaBath, FaMagic, FaBrush, FaUserTie } from 'react-icons/fa';

const Home = () => {
  const [shop, setShop] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const response = await axios.get('http://localhost:3205/api/usershop/usershopview');
        setShop(response.data.data);
      } catch (error) {
        console.log('error', error);
      }
    };
    fetchShops();
  }, []); 

  // Function to chunk the array into smaller arrays with 4 items each
  const chunkArray = (arr, chunkSize) => {
    return Array.from({ length: Math.ceil(arr.length / chunkSize) }, (_, index) =>
      arr.slice(index * chunkSize, index * chunkSize + chunkSize)
    );
  };

  const chunkedShops = chunkArray(shop, 4);
  const services = [
    { icon: <FaCut size={40} className="text-orange-500" />, title: 'Shave & Haircut', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Corrupti, assumenda rem nulla odio iure animi repellat voluptates ullam omnis enim?' },
    { icon: <FaBath size={40} className="text-orange-500" />, title: 'Cream & Shampoo', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Corrupti, assumenda rem nulla odio iure animi repellat voluptates ullam omnis enim?' },
    { icon: <FaMagic size={40} className="text-orange-500" />, title: 'Mustache Expert', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Corrupti, assumenda rem nulla odio iure animi repellat voluptates ullam omnis enim?' },
    { icon: <FaUserTie size={40} className="text-orange-500" />, title: 'Haircut Styler', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Corrupti, assumenda rem nulla odio iure animi repellat voluptates ullam omnis enim?' },
    { icon: <FaSearch size={40} className="text-orange-500" />, title: 'Razor For Beards', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Corrupti, assumenda rem nulla odio iure animi repellat voluptates ullam omnis enim?' },
    { icon: <FaBrush size={40} className="text-orange-500" />, title: 'Haircomb', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Corrupti, assumenda rem nulla odio iure animi repellat voluptates ullam omnis enim?' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-200 to-purple-200 mt-[-200px]">
      <div className="w-3/4 mx-auto text-center pt-[190px]">
        <h1 className="text-6xl font-bold italic text-black mt-32">
          Transform yourself with the <br /> 
          <span className="font-bold italic">best local beauty experts.</span><br /> 
          <span className="font-bold italic">Book now!</span>
        </h1>
      </div>  

      <div className="w-1/2 mx-auto mt-5 mb-56 relative">
        <input
          type="text"
          className="w-full h-12 rounded-lg border border-solid px-4 pl-10" // Adjust height for better UI
          placeholder="Search for shops..."
        />
        <FaSearch className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
      </div>

      <div className="container mx-auto ">
        {chunkedShops.map((row, rowIndex) => (
          <div key={rowIndex} className="flex flex-wrap justify-center">
            {row.map((item) => (
              <div key={item.id} className="w-full sm:w-1/2 md:w-1/4 lg:w-1/4 xl:w-1/4 mb-4 px-2 mt-[40px]">
                <div className="border rounded-lg overflow-hidden shadow-lg bg-white transform transition-transform hover:scale-105 opacity-90 hover:opacity-100">
                  <div className="w-full h-40 overflow-hidden">
                    <img
                      src={item.image}
                      className="w-full h-full object-cover cursor-pointer"
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

      <div className="min-h-screen bg-gray-100 py-10 mb-[50px] mt-[100px] ">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Barber Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div 
                key={index} 
                className="bg-white shadow-md rounded-lg p-6 text-center transform transition-transform hover:scale-105 hover:shadow-lg"
              >
                <div className="mb-4">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer/>
    </div>
  );
};

export default Home;
