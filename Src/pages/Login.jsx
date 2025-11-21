import React,{useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [form,setForm] = useState({email:"",password:""});
  const hc = e =>setForm({...form,[e.target.name]:e.target.value});
  const navigate = useNavigate();
  const hs =async(e) => {
    e.preventDefault();
    const res =await axios.post('http://localhost:3000/api/auth/login',form);
    localStorage.setItem("token",res.data.token);
    navigate('/home');
  }
  return <>
  <form onSubmit={hs}>
   
   <input name='email' placeholder='email' onChange={hc}/>
   <br></br>
   <input name='password'  type="password" placeholder='password' onChange={hc}/>
   <br></br>
   <button>Login</button>
  </form>

  </>
}

export default Login