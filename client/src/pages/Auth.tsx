import {BsFillPersonPlusFill} from 'react-icons/bs';
import axios from 'axios';
import  {BiUserCircle} from 'react-icons/Bi';
import {MdOutlinePassword,MdOutlineAlternateEmail} from 'react-icons/md';
import { useState,useContext } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/authContext';

function Auth() {
    const navigate = useNavigate()
    const [_, setCookie] = useCookies(['accestoken']);
    const [register , setRegister]= useState(false);
    const [password , setPassword]= useState('');
    const [email , setEmail]= useState('');
    const [name , setName]= useState('');
    const {loading , user , error, dispatch} = useContext(AuthContext);

    const authFunc = () => {
      dispatch({type:'LOGIN_START'})
        if(register){
          axios.post('http://localhost:8888/auth/register',
            {
              username:name,
              password,
              email
            }
          ).then(res => {
            setCookie('accestoken',res.data.token);
            window.localStorage.setItem('cinemagicUser',JSON.stringify(res.data.newUser));
            navigate('/');
            dispatch({type:"LOGIN_SUCCESS",payload : res.data.newUser})
          }).catch(err => {
                 dispatch({type:"LOGIN_FAILED",payload : err.message})
          })
        }else{
          axios.post('http://localhost:8888/auth/login',
          {
            password,
            email
          }
        ).then(res => {
          setCookie('accestoken', res.data.token);
          window.localStorage.setItem('cinemagicUser',JSON.stringify(res.data.user));
           dispatch({type:"LOGIN_SUCCESS",payload : res.data.user})
          navigate('/');
        }).catch(err => {
          dispatch({type:"LOGIN_FAILED",payload :  err.response.data.message})
        })
        }
    };

  return (
    <div className='min-h-screen second_bg_color text-white'>
        <div className='flex rounded-sm flex-col items-center top-16 relative gap-6   mx-auto p-5  '>
            <div className=''>discover new movies to watch by analyzing your watched list</div>
            <div className='flex flex-col gap-5'>
            {register &&<div className='flex items-center gap-2'>
                    <div>
                      <BiUserCircle className='text-xl'/> 
                    </div>
                <input type="text" className='p-2 outline-none text-black  form_width ' value={name} onChange={(e) => setName(e.target.value)} placeholder='UserName' />
                </div>
                }
               <div className='flex items-center gap-2'>
                    <div>
                      <MdOutlineAlternateEmail className='text-xl'/> 
                    </div>
                <input type="text" className='p-2 outline-none text-black  form_width ' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='exemple@gmail.com' />
                </div>
                <div className='flex items-center gap-2'>
                    <div >
                        <MdOutlinePassword className='text-xl'/> 
                    </div>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}  className='p-2 outline-none text-black form_width ' placeholder='Password'/>     
                </div>
            </div>
            {error}
            <button className={`bg-white  text-black p-1 rounded-sm tracking-wide font-semibold hover:tracking-wider trans ${loading && 'opacity-70'}`}   onClick={authFunc}>{!register ? <>Log In {loading && <>...</>} </>:<div className='flex items-center gap-1'>Sign Up <BsFillPersonPlusFill/> {loading && <>...</>}</div> }</button>
            <div className='flex gap-1'>
                {
                    register ? 
                    <>
                      Already a member ? <span className='text-slate-400 cursor-pointer' onClick={() => setRegister(false)}>Log In .</span>  
                    </>
                    : 
                    <>
                         Not a member yet ? <span className='text-slate-400 cursor-pointer' onClick={() => setRegister(true)}>Sign Up .</span>  
                    </>
                }
            </div>
            </div>
       

    </div>
  )
}
export default Auth