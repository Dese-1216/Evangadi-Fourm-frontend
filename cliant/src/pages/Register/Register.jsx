import React from 'react'
import {useRef} from 'react'
import axios from '../../Axios/axiosConfig'
import {useNavigate} from 'react-router-dom'



const Register = () => {
 
  const navigator=useNavigate()

  const userNameDom=useRef()
   const userfirstNameDom=useRef()
    const userLastNameDom =useRef()
    const userEmailDom=useRef()
     const userPasswordDom=useRef()
  

 async function submitHandler(e) {
  e.preventDefault()
     const userNameValue=userNameDom.current.value
  const userFirstNameValue=userfirstNameDom.current.value
  console.log(userNameValue);
   const userLastNameValue=userLastNameDom.current.value
  const userEmailValue=userEmailDom.current.value
  const userPasswordValue=userPasswordDom.current.value

  if(!userNameValue || !userFirstNameValue || !userLastNameValue || !userEmailValue || !userPasswordValue){
    alert("please provide all information")

  }

  try {
   
      await axios.post('/user/register',{
    userName:userNameValue,
    firstName:userFirstNameValue,
    lastName:userLastNameValue,
    email:userEmailValue,
    password:userPasswordValue
  })
  alert("Registred sucssesfully")
  navigator('/login')
 } catch (error) {
  alert("somting went wrong")
  console.log(error.response);
    
  }
 }



  return (
    <>
    <section>
      <form action="" onSubmit={submitHandler}>
        <div>
          <label htmlFor="userName">username :---</label>
          <input type="text" id='userName' ref={userNameDom} placeholder='userName' />
        </div>
        <br />
         <div>
          <label htmlFor="firstName"></label>First name :---
          <input type="text" id='firstName' ref={userfirstNameDom} placeholder='first Name' />
        </div>
        <br />
        <div>
          <label htmlFor="lastName"></label>last name :---
          <input type="text" id='lastName' ref={userLastNameDom} placeholder='last Name' />
        </div>
        <br />
        <div>
          <label htmlFor="email"></label>E-mail :---
          <input type="email" id='email' ref={userEmailDom} placeholder='Email' />
        </div>
        <br />
        <div>
          <label htmlFor="password"></label>Password :---
          <input type="password" id='password' ref={userPasswordDom} placeholder='Password' />
        </div>
        <button type='submit'>Register</button>

      </form>

    </section>
    
    </>
  )
}

export default Register