import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const Profile = () => {
    const { user } = useContext(AuthContext);

    return (
        <div>
            {user ? (
                <p>Welcome, {user.username}!</p>
            ) : (
                <p>YOU'RE NOT LOGGED IN!</p>
            )}
        </div>
    );
};

export default Profile;
