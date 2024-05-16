import React, { useState } from 'react';
import Navbar from '../../components/navbar/Navbar';
import './Settings.css'; 

function Settings() {
    const [profileImg, setProfileImg] = useState(null);

    const handleProfilePicChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImg(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div>
            <Navbar />
            <h1 style={{ textAlign: 'left' }}>Settings</h1>
            <div className="settings-container">
                <div className="profile-card">
                    <div className="profile-img">
                        {profileImg ? (
                            <img src={profileImg} alt="Profile" className="profile-photo" />
                        ) : (
                            <div className="default-img">No Image</div>
                        )}
                    </div>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleProfilePicChange}
                        className="file-input"
                    />
                    <button
                        className="settings-button"
                        onClick={() => document.querySelector('.file-input').click()}
                    >
                        Change Profile Photo
                    </button>
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