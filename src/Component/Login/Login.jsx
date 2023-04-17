import React, { useRef, useState } from 'react';
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';
import './Login.css'
import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import app from '../../Firebase/firebase.config';
import { Link } from 'react-router-dom';

const auth = getAuth(app);

function Login() {
  const [error , setError] = useState('');
  const [success,setSuccess] = useState('');
  const emailRef = useRef()

  //handel login form
const handelLogin = event =>{
  event.preventDefault();
  const form = event . target
  const email = form.email.value
  const password = form.password.value
  console.log(email,password)

  //validation
  setError('');
  setSuccess('');
  if(!/(?=.*[A-Z])/.test(password)){
   setError('please enter the valid password')
   return;
  }

  else if(password.length <6){
    setError('must be added 6 character');
    return;
  }

  //sing in authentication 
  signInWithEmailAndPassword(auth,email,password)
  .then(result=>{
   const loggedUser = result.user
   console.log(loggedUser)
   if(!loggedUser.emailVerified){
     alert('please verify your mail')
   }
   setSuccess('login successful');
   setError('');
   form.reset();
  })

  .catch(error=>{
    setError(error.message)
  })

}

//forgot password function
const handelrecetpassword = ()=>{
 const email = emailRef.current.value
 if(!email){
  alert('enter your valid mail')
 }
 sendPasswordResetEmail(auth,email)
 .then(()=>{
   alert('please check your mail')
   return;
 })
 .catch(error=>{
  setError(error.message)
 })
}


  return (
    <MDBContainer fluid className="p-5 my-5 h-custom bg-success rounded text-white">

      <MDBRow>

        <MDBCol col='10' md='6'>
          <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" className="img-fluid" alt="Sample image" />
        </MDBCol>

        <MDBCol col='4' md='6'>
          <form onSubmit={handelLogin}>

            <div className="d-flex flex-row align-items-center justify-content-center">

              <p className="lead fw-normal mb-0 me-3">Sign in with</p>

              <MDBBtn floating size='md' tag='a' className='me-2'>
                <MDBIcon fab icon='facebook-f' />
              </MDBBtn>

              <MDBBtn floating size='md' tag='a' className='me-2'>
                <MDBIcon fab icon='twitter' />
              </MDBBtn>

              <MDBBtn floating size='md' tag='a' className='me-2'>
                <MDBIcon fab icon='linkedin-in' />
              </MDBBtn>

            </div>

            <div className="divider d-flex align-items-center my-4">
              <p className="text-center fw-bold mx-3 mb-0">Or</p>
            </div>
            {/*message show  */}
            <p className='text-success'>{success}</p>

            <MDBInput wrapperClass='mb-4' name='email' ref={emailRef} label='Email address' id='formControlLg' type='email' size="lg" required/>

            <MDBInput wrapperClass='mb-4' name='password' label='Password' id='formControlLg' type='password' size="lg" required/>
            {/* enter a validation password */}
            <p className='text-danger'>{error}</p>

            <div className="d-flex justify-content-between mb-4">
              <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
              <button className='border-0 btn btn-primary u' onClick={handelrecetpassword} href="!#"><u>Forgot password?</u></button>
            </div>

            <div className='text-center text-md-start mt-4 pt-2'>
              <MDBBtn className="mb-0 px-5" size='lg'>Login</MDBBtn>
              <p className="small fw-bold mt-2 pt-1 mb-2">Don't have an account? <Link to="/register" className="link-danger">Register</Link></p>
            </div>
          </form>

        </MDBCol>

      </MDBRow>

      {/* <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">

        <div className="text-white mb-3 mb-md-0">
          Copyright © 2020. All rights reserved.
        </div>

        <div>

          <MDBBtn tag='a' color='none' className='mx-3' style={{ color: 'white' }}>
            <MDBIcon fab icon='facebook-f' size="md"/>
          </MDBBtn>

          <MDBBtn tag='a' color='none' className='mx-3' style={{ color: 'white'  }}>
            <MDBIcon fab icon='twitter' size="md"/>
          </MDBBtn>

          <MDBBtn tag='a' color='none' className='mx-3' style={{ color: 'white'  }}>
            <MDBIcon fab icon='google' size="md"/>
          </MDBBtn>

          <MDBBtn tag='a' color='none' className='mx-3' style={{ color: 'white'  }}>
            <MDBIcon fab icon='linkedin-in' size="md"/>
          </MDBBtn>

        </div>

      </div> */}

    </MDBContainer>
  );
}

export default Login;