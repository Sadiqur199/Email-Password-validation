import React, { useState } from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBIcon,
  MDBCheckbox
}
  from 'mdb-react-ui-kit';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile } from "firebase/auth";
import app from '../../Firebase/firebase.config';
import { Link } from 'react-router-dom';


const auth = getAuth(app);



function Register() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handelRegister = (event) => {
    event.preventDefault();
    setSuccess('')
    setError('')
    const email = event.target.email.value
    const password = event.target.password.value
    const name = event.target.text.value
    console.log(email, password, name);

    if (!/(?=.*[A-Z])/.test(password)) {
      setError('Please enter a one upperCase');
      return;
    }

    // creat udser in firebase
    createUserWithEmailAndPassword(auth, email, password)
      .then(result => {
        const loggedUser = result.user;
        console.log(loggedUser)
        setError('')
        event.target.reset();
        setSuccess('user has been successfully register');
        sendMailVerification(result.user)
        updateUserName(result.user,name)
      })

      .catch(error => {
        console.log(error.message)
        setError(error.message)
      })
  }

  //email verification code

  const sendMailVerification = (user) => {
    sendEmailVerification(user)
      .then(result => {
        alert('please verify your mail')
      })
  }

  //update Name
  const updateUserName = (user,name) => {
    updateProfile(user,{
      displayName:name
    })
    .then(()=>{
      console.log('user name updated')
    })
    .catch(error=>{
      setError(error.message)
    })
  }

  //handel email working

  const handelemail = (event) => {
    console.log(event.target.value)
    setEmail(event.target.value)
  }
  return (
    <MDBContainer fluid>

      <MDBCard className=' m-5 bg-primary text-white' style={{ borderRadius: '25px' }}>
        <MDBCardBody>
          <MDBRow>
            <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>

              <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>
              <p className='text-danger'>{error}</p>
              <p className='text-primary'>{success}</p>

              <form onSubmit={handelRegister}>
                <div className="d-flex flex-row align-items-center mb-4 ">
                  <MDBIcon fas icon="user me-3" size='lg' />
                  <MDBInput label='Your Name' name='text' id='form1' type='text' className='w-100' required />
                </div>

                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="envelope me-3" size='lg' />
                  <MDBInput onChange={handelemail} name='email' label='Your Email' id='form2' type='email' required />
                </div>

                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="lock me-3" size='lg' />
                  <MDBInput label='Password' name='password' id='form3' type='password' required />
                </div>
                {/* 
              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="key me-3" size='lg'/>
                <MDBInput label='Repeat your password' id='form4' type='password'/>
              </div> */}

                <div className='mb-4'>
                  <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Subscribe to our newsletter' />
                </div>

                <MDBBtn className='mb-4' size='lg'>Register</MDBBtn>
                <p className="small fw-bold mt-2 pt-1 mb-2">Do have an account? <Link to="/login" className="link-danger">Login</Link></p>
              </form>
            </MDBCol>

            <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
              <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp' fluid />
            </MDBCol>

          </MDBRow>
        </MDBCardBody>
      </MDBCard>

    </MDBContainer>
  );
}

export default Register;