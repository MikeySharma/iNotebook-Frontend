import React,{useState} from 'react';
import { useNavigate } from "react-router-dom";
import AlertContext from '../context/alert/AlertContext';

const SignUp = () => {
  
  const [credentials, setCredentials] = useState({name: '', email: '', password:'', cpassword: ''})
  let navigate = useNavigate();
  const alertContext = React.useContext(AlertContext);
  const {useAlert} = alertContext;

  const handleSubmit = async (e)=>{
    e.preventDefault();
    const {name, email, password} = credentials;
    const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
          },
          body: JSON.stringify({name, email, password}),
      });
      const json = await response.json();
      console.log(json)
      if(json.success){
        //save and redirect 
        localStorage.setItem('token', json.authToken);
        navigate('/');
        useAlert('Successfully! Created A new Account', 'Success')
      }else{
        useAlert(json.error, 'Error')
      }
}
const onChange = (e) =>{
    setCredentials({...credentials, [e.target.name] : e.target.value})
}
  return (
    <div className="container my-4">

    <form  onSubmit={handleSubmit}>
        <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" id="name" name="name" value={credentials.name} onChange={onChange} aria-describedby="emailHelp"/>
              
        </div>
        <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" name="email" value={credentials.email} onChange={onChange} aria-describedby="emailHelp"/>
        </div>
        <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChange} id="password" required/>
        </div>
        <div className="mb-3">
            <label htmlFor="cpassword" className="form-label">Conform Password</label>
            <input type="password" className="form-control" name='cpassword' value={credentials.cpassword} onChange={onChange} id="cpassword" required/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
    </form>

</div>
  )
}

export default SignUp
