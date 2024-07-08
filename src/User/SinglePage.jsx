import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from 'react-bootstrap/Card';

const SinglePage = () => {
    const [shop, setShop] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchShop = async () => {
            try {
                const response = await axios.get(`http://localhost:3205/api/shop/shopbyid/${id}`);
                setShop(response.data.data);
                console.log(response.data.data, "re");
            } catch (error) {
                console.log(error);
            }
        }
        fetchShop();
    }, [id]);

    if (!shop) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {/* <h1>{shop.shopname}</h1>
            <p>{shop.phone}</p>
            <p>{shop.email}</p>
            <img src={shop.image} alt={shop.shopname} />
            <p>{shop.location}</p>
            <p>{shop.category}</p> */}

            <div className="col-md-4 mb-4">
              <Card >
                <Card.Img variant="top" src={shop.image} style={{ height: '350px' }}  />
                <Card.Body>
                  <Card.Title style={{fontSize:'larger', fontWeight:'bolder'}}>{shop.shopname}</Card.Title>
                  <Card.Title style={{fontSize:'larger', fontWeight:'bolder'}}>{shop.location}</Card.Title>
                  <Card.Title style={{fontSize:'larger', fontWeight:'bolder'}}>{shop.phone}</Card.Title>
                  {/* <Card.Text style={{fontSize:'larger'}} >{item.category.category}</Card.Text> */}
                </Card.Body>
              </Card>
            </div>
            <div style={{marginLeft:"780px",display:"flex",marginTop:"-400px"}}>
                <h2>Book an Appointment</h2>
            </div>
        </div>
    );
}

export default SinglePage;
