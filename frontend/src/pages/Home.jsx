import axios from 'axios'
import React, { useEffect, useContext } from 'react'
import { useNavigate,Link } from 'react-router-dom'


const Home = () => {
  const navigate = useNavigate()
  const fetchUser = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get('http://localhost:3000/auth/home', {
        headers: {
          "Authorization" : `Bearer ${token}`
        }
      })
      if(response.status !== 201) {
        navigate('/login')
      }
    } catch(err){
      navigate('/login')
      console.log(err)
    }
  }

  useEffect(() => {
    fetchUser()
  }, [])

  
  return (
    <div>
      {/* <h1 className='text-3xl text-blue-500'>Home</h1> */}
      {/* <Upload /> */}
      <Link to="/upload" className="text-blue-500">Upload Photo</Link> {/* Add the link */}
    </div>
  );
}

export default Home