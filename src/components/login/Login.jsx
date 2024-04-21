import React, { useEffect } from 'react'
import { GoogleButton } from 'react-google-button'
import { UserAuth } from '../../context/AuthContext'
import './login.css'
import { useNavigate } from 'react-router-dom'
import picture from "../../assets/Illustration Export.png"

function Login() {
  const { googleSignIn, user } = UserAuth()
  const navigate = useNavigate()

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (user != null) {
      navigate('/todo')
    }
  }, [user])

  return (
    <div className='login'>
      <div className='container'>
        <h1>Login</h1>
        <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
            molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
            numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
            optio, eaque rerum! 
          </p>
        <div className='gbutton' >
          <GoogleButton onClick={handleGoogleSignIn} />
        </div>
      </div>
        <div className='design'>
          <img src={picture} alt="UI design"  />
        </div>
    </div>
  )
}

export default Login