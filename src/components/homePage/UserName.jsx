import React, { useState, useEffect } from 'react';
import { get, auth, database, ref } from '../../FirebaseConfig';

const UserName = () => {
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const fetchUserName = async (user) => {
            
            const userId = user.uid;
            const userDatabaseRef = ref(database, `users/${userId}`);
            const userSnapshot = await get(userDatabaseRef);

            if (userSnapshot.exists()) {
                const userData = userSnapshot.val();
                setUserName(userData.fullName || 'User');
            } else {
                setUserName("Guest")
            }
        
        };

        const unsubscribe = auth.onAuthStateChanged((user) => {
            fetchUserName(user);
        });
        return () => unsubscribe();

    }, []);

    return (
        <p className="my-3" style={{ color: '#90AEAD', fontSize: '20px' }}>
            Welcome <b>{userName}</b>,
        </p>
    );
}

export default UserName;