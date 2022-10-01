import React , { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
  const [credential, setcredential] = useState({name : "" , email : "" , password : ""})
  let history = useNavigate();

  const HandleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch( `http://localhost:5000/api/auth/createuser`, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
     
      headers : {
        'Content-Type': 'application/json'

        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body : JSON.stringify({name : credential.name , email : credential.email , password : credential.password}) 
    });
    const json = await response.json(); // parses JSON response into native JavaScript objects
    console.log(json);
   if(json.success){ 
    localStorage.setItem('token'  , json.authToken);
    history("/");
    props.showAlert("Account created successfully" , "success");  
   }
   else{
    alert(" Already exist");
   }

  }

  const onChange = (e) =>{
    setcredential({...credential , [e.target.name] : e.target.value});
  }
  document.title = "SIGN-Up"
  return (
    <>
    
    <h3>Create new account</h3>
    <p style={{"fontWeight" : "bolder"}}>If you are already a user then GO-TO LogIN</p>
      <form onSubmit={HandleSubmit}>

        <div className="mb-3 row">
          <label htmlFor="name" className="col-sm-2 col-form-label">Name</label>
          <div className="col-sm-10">
            <input type="text" className="form-control" id="name" placeholder="here..." name="name" value={credential.name} onChange={onChange} />
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Email</label>
          <div className="col-sm-10">
            <input type="email" className="form-control" id="staticEmail" placeholder="email@example.com" name="email" value={credential.email} onChange={onChange} />
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Password</label>
          <div className="col-sm-10">
            <input type="password" className="form-control" id="inputPassword" placeholder = "here..."name="password" value={credential.password} onChange={onChange} minLength = {8} required />
          </div>

        </div>
        <button className="btn btn-success">Done</button>


      </form>
    </>
  )
}

export default Signup