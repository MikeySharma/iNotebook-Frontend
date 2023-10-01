import React,{useState} from 'react';
import { useNavigate } from "react-router-dom";
import AlertContext from '../context/alert/AlertContext';

const Login = () => {
    const [credentials, setCredentials] = useState({email: '', password:''})
    let navigate = useNavigate();
    const alertContext = React.useContext(AlertContext);
    const {useAlert} = alertContext;

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: 'POST',
            headers: {
              "Content-Type": "application/json"
              },
              body: JSON.stringify({email: credentials.email, password: credentials.password}),
          });
          const json = await response.json();
          if(json.success){
            //save and redirect 
            localStorage.setItem('token', json.authToken);
            navigate('/');
            useAlert('Logged In Successfully', 'Success')
          }else{
            useAlert(json.error, 'Error')
            
          }
    }
    const onChange = (e) =>{
        setCredentials({...credentials, [e.target.name] : e.target.value})
    }
    return (
        <div className="container my-4">
            <h1 className='my-3'>Login First To Get Access To Your Notes</h1>

            <form  onSubmit={handleSubmit}>
                
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" value={credentials.email} onChange={onChange} aria-describedby="emailHelp"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChange} id="password"/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>

        </div>
    )
}

export default Login
