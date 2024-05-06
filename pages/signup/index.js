import React from 'react';

export default function signUp() {
  return (
    <div className='form-container'>
      <div className='form-wrap'>
        <h1 className='form-title'>SignUp Form</h1>
        <form>
            <div className="input-box">
                <input type="text" placeholder='Name' />
                <label>name</label>
            </div>
            <div className="input-box">
                <input type="text" placeholder='Username' />
                <label>username</label>
            </div>
            <div className="input-box">
                <input type="text" placeholder='Email' />
                <label>email</label>
            </div>
            <div className="input-box">
                <input type="password" placeholder='Password' />
                <label>password</label>
            </div>
            <input type="submit" className='register-btn' />
        </form>
      </div>
    </div>
  );
}
