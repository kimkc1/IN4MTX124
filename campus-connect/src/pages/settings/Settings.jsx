import React from 'react';
import Navbar from '../../components/navbar/Navbar'; 
import './Settings.css'; 

function Settings() {
    return (
        <div>
            <Navbar />
            <h1 style={{ textAlign: 'left' }}>Settings</h1>
            <div className="settings-container">
                <div className="profile-card">
                    <div className="profile-img"></div>
                    <button className='settings-button'>Change Profile Photo</button>
                </div>
                <div className="settings">
                    <h2>Notifications</h2>
                    <div className="switch-wrapper">
                        <label className="switch">
                            <span className="switch-label">Email</span>
                            <input type="checkbox" />
                            <span className="slider"></span>
                        </label>
                        <label className="switch">
                            <span className="switch-label">SMS</span>
                            <input type="checkbox" />
                            <span className="slider"></span>
                        </label>
                    </div>
                
                    <h2>Privacy</h2>
                    <label className="switch">
                        <span className="switch-label">Location Sharing</span>
                        <input type="checkbox" />
                        <span className="slider"></span>
                    </label>
                    <label className="switch">
                        <span className="switch-label">Data Sharing</span>
                        <input type="checkbox" />
                        <span className="slider"></span>
                    </label>
                </div>   
            </div>
        </div>
    );
}
export default Settings;