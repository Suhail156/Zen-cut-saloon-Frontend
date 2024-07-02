import  { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const nav = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3205/api/users/login', {
                email,
                password
            });
            console.log(response.data.data);
            if (response.status === 200) {
                console.log(response.status);
                const token = response.data.data.token;
                const name = response.data.data.username;

                localStorage.setItem('token', token);
                localStorage.setItem('name', name);
                nav('/');
            }
        } catch (error) {
            console.log(error);
        }
    };

    const styles = {
        container: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            backgroundColor: '#f0f0f0',
        },
        loginBox: {
            width: "60vh",
            height: "60vh",
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
                <form onSubmit={submitHandler} >
                    <input type="text" placeholder="Username" onChange={(e) => setEmail(e.target.value)} style={styles.input} />
                    <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} style={styles.input} />
                    <button type="submit" style={styles.button}>Login</button>
                </form>
                <h3> Dont you have any account?</h3>
                <Link to={'/usersignup'}>Create a New account</Link>
            </div>
        </div>
    );
};

export default Login;
