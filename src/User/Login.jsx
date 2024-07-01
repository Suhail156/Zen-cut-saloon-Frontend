// import React from 'react'
import { Link } from 'react-router-dom';

const Login = () => {
  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f0f0f0',
    },
    loginBox: {
        width:"60vh",
        height:"60vh",
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '2rem',
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    },
    input: {
      width: '100%',
      padding: '0.75rem',
      margin: '0.5rem 0',
      borderRadius: '4px',
      border: '1px solid #ccc',
    },
    button: {
      width: '100%',
      padding: '0.75rem',
      margin: '1rem 0',
      borderRadius: '4px',
      border: 'none',
      backgroundColor: 'black',
      color: 'white',
      fontSize: '1rem',
      cursor: 'pointer',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.loginBox}>
        <h2>Login</h2>
        <input type="text" placeholder="Username" style={styles.input} />
        <input type="password" placeholder="Password" style={styles.input} />
        <button type="submit" style={styles.button}>Login</button>
        <h3>Dont you have any account</h3>
         <Link to={'/usersignup'}>Create a New account</Link>
      </div>
    </div>
  );
};

export default Login;
