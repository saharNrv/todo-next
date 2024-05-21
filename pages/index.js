import Link from 'next/link';
import React, { useEffect, useState } from 'react';

export default function Home() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {

    const userAuth = async () => {
      const res = await fetch('/api/auth/me')
      if (res.status === 200) {
        setIsLoggedIn(true)
      }

    }

    userAuth()
  }, [])



  return (
    <div className='home'>
      <div className="sidebar">
        <ul>

          {
            !isLoggedIn ? (
              <>
                <li>
                  <Link href='/signin'>
                    Signin
                  </Link>
                </li>
                <li>
                  <Link href='/signup'>
                    Signup
                  </Link>
                </li>

              </>
            ) : (
              <>
                <li>
                  <Link href='/dashboard'>
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link href='/todos'>
                    Todo
                  </Link>
                </li>

              </>)

          }
          <li>Signout</li>

        </ul>
      </div>
      <div>
        <h1 className='home-title'>Welcome To My Todo App</h1>
      </div>
    </div>
  );
}

