'use client'

import React, { useState } from 'react';

const page = () => {
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);

  const correctPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === correctPassword) {
      setAuthenticated(true);
    } else {
      alert('Incorrect password');
    }
  };

  if (!authenticated) {
    return (
      <div>
        <form onSubmit={handlePasswordSubmit}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }

  return (
    <div>woah admin control things</div>
  );
};

export default page;