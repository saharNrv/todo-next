import React from 'react';

export default function signIn() {
  return (
    <div className='form-container'>
       <div className='form-wrap'>
        <h1 className='form-title'>SignIn Form</h1>
        <form>
           
            <div className="input-box">
                <input type="text" placeholder='Username | Email' />
                <label>username | Email</label>
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
