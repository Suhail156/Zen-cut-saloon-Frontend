
import saloons from './assets/saloons'
import Card from 'react-bootstrap/Card';

const Home = () => {
  return (
     <div>
        <div style={{width:'600px',height:'200px',marginLeft:'350px',marginTop:'180px'}}>
            <h1 style={{fontSize:'40px',fontFamily:'sans-serif'}}>Transform yourself with the <br/> best local beauty experts.<br/> Book now!</h1>
        </div>
         <div>
            <input type="text" style={{width:'500px',height:'30px',marginBottom:'300px',marginLeft:'350px',borderRadius:"20px",border:'solid  1px'}} />
         </div>
    <div className='d-flex' style={{ flexWrap: 'wrap' }}>
        {saloons.map((item) => (
          <div key={item.id} > 
            <Card style={{display:'flex',float:'left',marginLeft:'40px'}}>
              <Card.Img 
                variant="top" 
                src={item.image} 
                style={{height:"250px"}}
              />
            </Card>
          </div>
        ))}
      </div>
      </div>
  )
}

export default Home
