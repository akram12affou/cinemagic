// import {BsFillPersonPlusFill} from 'react-icons/bs';
import axios from 'axios';
import  {BiUserCircle} from 'react-icons/bi';
import {MdOutlinePassword,MdOutlineAlternateEmail} from 'react-icons/md';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

function Auth() {
    const navigate = useNavigate()
    const [_, setCookie] = useCookies(['accestoken']);
    const [register , setRegister]= useState(false);
    const [password , setPassword]= useState('');
    const [email , setEmail]= useState('');
    const [name , setName]= useState('');
    const authFunc = () => {
        if(register){
          axios.post('http://localhost:8888/auth/register',
            {
              username:name,
              password,
              email
            }
          ).then(res => {
            setCookie('accestoken', res.data.token)
            window.localStorage.setItem('cinemagicUser',res.data.newUser)
            navigate('/')
          })
        }else{
          axios.post('http://localhost:8888/auth/login',
          {
            password,
            email
          }
        ).then(res => {
          setCookie('accestoken', res.data.token)
          window.localStorage.setItem('cinemagicUser',res.data.newUser)
          navigate('/')
        })
        }
    }
  return (
    <div className='min-h-screen second_bg_color text-white'>
        <div className='flex rounded-sm flex-col items-center top-16 relative gap-6   mx-auto p-5  '>
            <div className='italic'>discover new movies to watch by analyzing your watched list</div>
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
            <button className='bg-white text-black p-1 rounded-sm tracking-wide font-semibold hover:tracking-wider trans' onClick={authFunc}>{!register ? <>Log In </>:<>Sign Up</> }</button>
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
{/* <BsFillPersonPlusFill/> */}
export default Auth