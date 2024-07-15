import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer style={{backgroundColor:'#152238'}} className=" text-white py-8 mt-[-50px] ">
      <div className="container mx-auto text-center  ">
        <div className="flex justify-center mb-4">
          <a href="https://facebook.com" className="mx-2 text-white hover:text-blue-500">
            <FaFacebook size={30} />
          </a>
          <a href="https://twitter.com" className="mx-2 text-white hover:text-blue-400">
            <FaTwitter size={30} />
          </a>
          <a href="https://instagram.com" className="mx-2 text-white hover:text-pink-500">
            <FaInstagram size={30} />
          </a>
        </div>
        <div className="mb-4">
          <nav className="flex justify-center space-x-4">
            <Link to="/services" className="text-white hover:text-gray-400">
              Services
            </Link>
            <Link to="/about" className="text-white hover:text-gray-400">
              About Us
            </Link>
            <Link to="/contact" className="text-white hover:text-gray-400">
              Contact
            </Link>
            <Link to="/privacy-policy" className="text-white hover:text-gray-400">
              Privacy Policy
            </Link>
          </nav>
        </div>
        <p>&copy; {new Date().getFullYear()} Your Salon. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
