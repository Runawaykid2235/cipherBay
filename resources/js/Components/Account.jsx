import React, { useEffect, useState } from 'react';

function Account() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Fetch the authenticated user's details
        fetch('/api/account', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            credentials: 'include', // Include cookies for session authentication
        })
            .then((response) => {
                if (response.ok) return response.json();
                throw new Error('Failed to fetch user data');
            })
            .then((data) => setUser(data.user)) // Extract the `user` object from the API response
            .catch((error) => console.error(error));
    }, []);

    if (!user) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h1>Welcome, {user.username}!</h1>
            <p>Public Key: {user.public_key}</p>
        </div>
    );
}

export default Account;
