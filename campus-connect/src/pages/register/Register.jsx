import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

function Register(){
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword){
            alert('Passwords do not match.');
            return;}
        try {
            const response = await fetch('http://localhost:3000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, username, password })
            });
            if (response.ok){
                alert('Account created successfully!');
                navigate('/login');}
             else {
                const errorData = await response.json();
                alert('Error: ${errorData.message}');}
        }
            catch (error){
                console.error('Error:', error.message);
                alert('An error occurred while creating your account.');
            }
    };

    return (
        <div className="register-app-container">
            <div className="register-container"> 
                <h1>Create Account</h1>
                <form className="register-form" onSubmit={handleRegister}>
                    <div> 
                        <label htmlFor="name">Name: </label>
                        <input
                            type="text"
                            id="name"
                            className="register-input"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div> 
                        <label htmlFor="email">Email: </label>
                        <input
                            type="text"
                            id="email"
                            className="register-input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div> 
                        <label htmlFor="username">Username: </label>
                        <input
                            type="text"
                            id="username"
                            className="register-input"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password: </label>
                        <input
                            type="password"
                            id="password"
                            className="register-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="confirmPassword">Confirm Password: </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            className="register-input"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="register-button">Create Account</button>
                    <p>Already have an account? <a href="/">Login here.</a></p>
                </form>
            </div>
        </div>
    );
}

export default Register;