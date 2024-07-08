import { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const Home = () => {
  const [shop, setShop] = useState([]);
   const{id}=useParams()
  const nav=useNavigate()

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const response = await axios.get('http://localhost:3205/api/shop/viewshops');
        setShop(response.data.data);
      } catch (error) {
        console.log('error', error);
      }
    };
    fetchShops();
  }, []);
  
  return (
    <div>
      <div style={{ width: '600px', height: '200px', marginLeft: '350px', marginTop: '180px' }}>
        <h1 style={{ fontSize: '40px', fontFamily: 'sans-serif' }}>
          Transform yourself with the <br /> best local beauty experts.<br /> Book now!
        </h1>
      </div>
      <div>
        <input
          type="text"
          style={{
            width: '500px',
            height: '30px',
            marginBottom: '230px',
            marginLeft: '350px',
            borderRadius: '20px',
            border: 'solid 1px',
          }}
          placeholder="Search for shops..."
        />
      </div>
      <div className="container">
        <div className="row" style={{display:'flex', flexWrap:'wrap'}}>
          {shop.map((item) => (
            <div key={item.id} className="col-md-4 mb-4">
              <Card style={{marginLeft:'50px'}}>
                <Card.Img variant="top" src={item.image} style={{ height: '250px' }} onClick={()=>nav(`/singlepage/${item._id}`)} />
                <Card.Body>
                  <Card.Title style={{fontSize:'larger', fontWeight:'bolder'}}>{item.shopname}</Card.Title>
                  {/* <Card.Text style={{fontSize:'larger'}} >{item.category.category}</Card.Text> */}
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
