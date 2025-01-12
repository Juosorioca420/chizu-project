import React from 'react';
import { useAuth } from 'payload/components/utilities'
import { User } from '../payload-types';

const ProfilePicture: React.FC = () => {
    const { user } = useAuth<User>();
    return (
        <div
            style={{
                width: '2.5em',
                height: '2.5em',
                borderRadius: '50%',
                overflow: 'hidden',
                backgroundColor: 'red',
            }}
        >
            <img src={user.profilePicture.url}/>
        </div>
    );
};

export default ProfilePicture;