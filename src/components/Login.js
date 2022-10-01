import React , {useState } from 'react'
import { useNavigate } from 'react-router-dom';
const Login = (props) => {
  const [credential, setcredential] = useState({email : "" , password : ""});

  let history = useNavigate();

  const HandleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch( `http://localhost:5000/api/auth/login`, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      
      headers : {
        'Content-Type': 'application/json',

        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body : JSON.stringify({email : credential.email , password : credential.password}) 
    });
    const json = await response.json(); // parses JSON response into native JavaScript objects

    if(json.success){
      localStorage.setItem('token'  , json.authToken);
      // console.log(localStorage.setItem);
      history("/");
      props.showAlert("Logged In successfully" , "success");  
    }
    else{
      alert("User Not Found");
      props.showAlert("User Not Found" , "danger")
    }

  }

  const onChange = (e) =>{
    setcredential({...credential , [e.target.name] : e.target.value});
  }
  document.title = "LOG-In";
  return (
    <>
    <h3>Login to continue</h3>
    <p style={{"fontWeight" : "bolder"}}>If you are new here then GO-TO SignUP</p>
    <form onSubmit={HandleSubmit}>

      <div className="mb-3 row">
        <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Email</label>
        <div className="col-sm-10">
          <input type="text" className="form-control" id="staticEmail" placeholder="email@example.com" name = "email" value = {credential.email} onChange = {onChange}/>
        </div>
      </div>
      <div className="mb-3 row">
        <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Password</label>
        <div className="col-sm-10">
          <input type="password" className="form-control" id="inputPassword" name = "password" value={credential.password} onChange = {onChange} />
        </div>
      
      </div>
      <button className="btn btn-success">Done</button>


    </form>
    </>
  )
}

export default Login