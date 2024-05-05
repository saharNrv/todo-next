import React from 'react';

export default function Home() {
  return (
    <div className='home'>
     <div className="sidebar">
      <ul>
        <li>Signin</li>
        <li>Dashboard</li>
        <li>Todo</li>
        <li>Signout</li>
      </ul>
     </div>
     <div>
      <h1 className='home-title'>Welcome To My Todo App</h1>
     </div>
    </div>
  );
}
