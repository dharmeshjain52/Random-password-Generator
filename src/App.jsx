import { useState,useCallback, useEffect, useRef } from 'react'
import './App.css'
function App() {
  const[length,setLength]=useState(8);
  const[numallow,setNumAllow]=useState(false);
  const[charallow,setCharAllow]=useState(false);
  const[password,setPassword]=useState("");
  const paswordref=useRef(null)
  const passwordGenerator=useCallback(()=>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numallow) str+="0123456789"
    if(charallow) str+="!@#$%^&*-_=+[]{}~`"
    for (let i = 0; i <length; i++) {
      let char=Math.floor(Math.random()*str.length+1)
      pass+=str.charAt(char);
    }
    console.log(pass)
    setPassword(pass);
  },[length,numallow,charallow,setPassword])
  const copyToClip=useCallback(()=>{
    paswordref.current?.select(password)
    paswordref.current?.setSelectionRange(0,100)
    window.navigator.clipboard.writeText(password);
  },[password])
  useEffect(()=>{passwordGenerator()},[length,numallow,charallow,passwordGenerator])
  return (
   <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-72 text-orange-400 bg-gray-700'>
    <h1 className='text-white text-center text-2xl my-3'>Password Generator</h1>
    <div className='flex shadow rounded-lg overflow-hidden mb-4'>
    <input  type='text' 
    value={password}
    className='outline-none w-full px-3 py-1'
    placeholder='password'
    readOnly 
    ref={paswordref}/>
    <button className='outline-none bg-blue-600 text-white px-3 py-1'onClick={copyToClip}>Copy</button>
    </div>
    <div className='flex text-sm gap-x-2'>
      <div className='flex items-center gap-x-1'>
        <input type="range" 
        value={length}
        min={8}
        max={100}
        className='cursor-pointer'
        onChange={(e)=>{setLength(e.target.value)}}
        />
        <label>Length: {length}</label>
      </div>
      <div className='flex items-center gap-x-1'>
      <input type="checkbox"
      defaultChecked={numallow}
      id="number" 
      onChange={()=>{setNumAllow((prev)=> !prev)}}
      />
      <label>Numbers</label>
      <input type="checkbox"
      defaultChecked={charallow}
      id="number" 
      onChange={()=>{setCharAllow((prev)=> !prev)}}
      />
      <label>Characters</label>
      </div>
    </div>
   </div>
  )
}

export default App
