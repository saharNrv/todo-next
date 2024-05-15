import React, { useState } from 'react';

export default function signIn() {

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');

  const signinHandler = async (event) => {
    event.preventDefault()
    const res = await fetch('/api/auth/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }, body: JSON.stringify({ identifier, password })
    })

    console.log('RES :>> ', res);
  }
  return (
    <div className='form-container'>
      <div className='form-wrap'>
        <h1 className='form-title'>SignIn Form</h1>
        <form>

          <div className="input-box">
            <input type="text" placeholder='Username | Email' value={identifier}
              onChange={e => setIdentifier(e.target.value)} />
            <label>username | Email</label>
          </div>

          <div className="input-box">
            <input type="password" placeholder='Password' value={password}
              onChange={e => setPassword(e.target.value)} />
            <label>password</label>
          </div>
          <input type="submit" className='register-btn' onClick={signinHandler} />
        </form>
      </div>
    </div>
  );
}
