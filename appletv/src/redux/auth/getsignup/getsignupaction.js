import axios from "axios"
import * as types from "./getsignupactiontype"




export const getDataSignup = ()=>(dispatch) =>{
       dispatch({type:types.GETUSERDATAREQUEST})
       return axios.get(`https://appletvusers.onrender.com/users`)
       .then(r=>dispatch({type:types.GETUSERDATASUCCESS,payload:r.data}))
       .catch(err=>dispatch({type:types.GETUSERDATAFAILURE}))
} 