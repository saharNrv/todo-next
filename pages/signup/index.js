import { useRouter } from 'next/router';
import React, { useState } from 'react';

export default function signUp() {
  const route = useRouter()

  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const signupHandler = async (event) => {
    event.preventDefault()

    const res =await fetch('/api/auth/signup',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify({
        name,
        username,
        email,
        password
      })
    })
    console.log('RES :>> ', res);
    if(res.status === 201){
      setName('')
      setUsername('')
      setEmail('')
      setPassword('')

      route.push('/todos')

    }



  }

  return (
    <div className='form-container'>
      <div className='form-wrap'>
        <h1 className='form-title'>SignUp Form</h1>
        <form>
          <div className="input-box">
            <input type="text" placeholder='Name' value={name} onChange={e => setName(e.target.value)} />
            <label>name</label>
          </div>
          <div className="input-box">
            <input type="text" placeholder='Username' value={username} onChange={e => setUsername(e.target.value)} />
            <label>username</label>
          </div>
          <div className="input-box">
            <input type="text" placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} />
            <label>email</label>
          </div>
          <div className="input-box">
            <input type="password" placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} />
            <label>password</label>
          </div>
          <input type="submit" className='register-btn' onClick={signupHandler} />
        </form>
      </div>
    </div>
  );
}
