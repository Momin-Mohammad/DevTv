import {
  FormControl,
  Input,
  Button
} from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate,Link } from 'react-router-dom'
import { useToast } from '@chakra-ui/react'

import "./Signup.css"
import { useForm } from 'react-hook-form'

import { getDataSignup } from '../redux/auth/getsignup/getsignupaction'
import { json } from 'react-router'
import { getbanuser } from '../redux/auth/admin/edituseraction'
import MainNavbar from '../Componenets/MainNavbar'

const LoginPage = () => {
  const init = {
    email: "",
    password: "",
  }
  const [data, setData] = useState(init)
 const toast = useToast()
 const navigate = useNavigate()
  const { handleSubmit, formState: { errors, isSubmitting }, } = useForm()

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getDataSignup())
  }, [dispatch])
  useEffect(()=>{
    dispatch(getbanuser(data))
  },[])

  const userdata = useSelector(store => store.getSignupreducer.userdata)
  console.log(userdata)
  const banneduserdata = useSelector(store => store.getbannreducer.banneduserlist)
  console.log(banneduserdata)
  const handleChange = (e) => {
    const { name, value } = e.target
    setData({ ...data, [name]: value })
  }
  let tokendata = JSON.parse(localStorage.getItem("token")) || []
  console.log(tokendata)
  const onSubmit = (data) => {
    let banneduser = banneduserdata.filter(ele=>ele.email === data.email)
    let loginuser = userdata.filter(ele => ele.email === data.email && ele.password == data.password)
    if(data.email===""||data.password==""){
      toast({
        title: 'Failed',
        status: 'warning',
        description:"input should not be empty",
        duration: 9000,
        isClosable: true,
      })
    }
    else{


    if(banneduser.length>0){
      toast({
        title: 'Failed',
        status: 'warning',
        description:"this account has been banned",
        duration: 9000,
        isClosable: true,
      })
    }
   else if (loginuser.length > 0) {
    toast({
      title: 'Success',
      status: 'success',
      description:"Welcome back",
      duration: 9000,
      isClosable: true,
    })
      localStorage.setItem("token", JSON.stringify(loginuser[0].token))
      navigate("/")
    }
    else {
      toast({
        title: 'Failed',
        status: 'warning',
        description:"email or password is not correct",
        duration: 9000,
        isClosable: true,
      })
    }
  }
  }


  return (<>
    <MainNavbar/>
    <div className='form_div'>
    <form className='form' onSubmit={handleSubmit(() => onSubmit(data))}>
    <h1 style={{color:"black", fontSize:"200%",fontWeight:"bold"}}>Login Page</h1>
      <FormControl>

        <Input _placeholder={{color:"black"}} name="email" value={data.email} onChange={handleChange} className='input' type='email' placeholder="enter your email" />

        <Input _placeholder={{color:"black"}} name="password" value={data.password} onChange={handleChange} className='input' type='password' placeholder="Enter your password" />

      </FormControl>
      <Button mt={4} colorScheme='teal' isLoading={isSubmitting} type='submit'>
        Submit
      </Button>
      <br />
       <br/>
      <Link to="/signup"><h1 style={{color:"aliceblue"}}>Create an account</h1></Link>
      <Link to="/adminpage"><h1 style={{color:"aliceblue"}}>Login Admin As </h1></Link>
    </form>
    </div>
  </>
  )

}
export { LoginPage }