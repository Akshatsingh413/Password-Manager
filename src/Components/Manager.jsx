import React, { useEffect, useRef, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Manager() {
  const ref = useRef()
  const passref = useRef()
  const [form, setform] = useState({ url: "", username: '', password: '' })
  const [passwordArray, setpasswordArray] = useState([])

  const getPassword=async()=>{
    let req = await fetch("http://localhost:3000/")
    let passwords = await req.json()
    let passwordArray;
    setpasswordArray((passwords));
  }

  useEffect(() => {
    getPassword() 
  }, [])


  const showpass = () => {
    if (ref.current.src.includes("Icons/eyecross.png")) {
      ref.current.src = "Icons/eye.jpg"
      passref.current.type = "password"
    }
    else {
      ref.current.src = "Icons/eyecross.png"
      passref.current.type = "text"
    }
  }

  const savepassword = async ()=> {
    if(form.url.length>=3 && form.password.length>=3 && form.username.length>=3){
      setpasswordArray([...passwordArray, { ...form, id: uuidv4() }])
      //  await fetch("http://localhost:3000/",{method:'DELETE',headers:{"Content-Type":"application/json"},body:JSON.stringify({id:form.id})})
      let req = await fetch("http://localhost:3000/",{method:'POST',headers:{"Content-Type":"application/json"},body:JSON.stringify({...form,id:uuidv4()})})
      // localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
      // console.log([...passwordArray, form]);
      setform({ url: "", username: '', password: '' })
      toast.success('Password saved', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
        });
    }
    else{
      if(form.url.length<3){
        alert("Url input must have minimun 3 characters!!!");
      }
      else if(form.username.length<3){
        alert("Username input must have minimun 3 characters!!!");
      }
      else{
        alert("Password input must have minimun 3 characters!!!");
      }
    }

  }

  const deletepassword = async(id) => {
    console.log("Password in deleting", id);
    let c = confirm("Do You really want to delete this password!!")
    if (c) {
      const updatedPasswords = passwordArray.filter(item => item.id !== id);
      setpasswordArray(updatedPasswords);
      // localStorage.setItem("passwords", JSON.stringify(updatedPasswords));
      let req = await fetch("http://localhost:3000/",{method:'DELETE',headers:{"Content-Type":"application/json"},body:JSON.stringify({id})})
      toast.success('Password deleted', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
        });
    }
  };


  const editpassword = (id) => {
    console.log("Password in edit", id)
    setform({...passwordArray.filter(i => i.id === id)[0],id:id})
    setpasswordArray(passwordArray.filter(item => item.id !== id))
  }


  const handleform = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="Bounce"
      />
      {/* Same as */}
      <ToastContainer />

      <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div></div>
      <div className=' mx-auto container max-w-2xl py-11'>
        <h1 className='text-black text-center text-3xl'>
          <span className='text-green-700 font-bold '>&lt;</span>
          <span className='font-bold'>Password</span>
          <span className='text-green-700 font-bold '>OP/&gt;</span>
        </h1>
        <p className='text-center text-green-900 text-md'>Your Password Manager</p>
        <div className=' flex flex-col p-4 gap-4 items-center'>
          <input className="rounded-full border border-green-500 text-black w-full p-3 py-1" type="text" placeholder='Enter Website URL' name='url' value={form.url} onChange={handleform} />
          <div className='flex w-full border-black gap-4'>
            <input className="rounded-full border border-green-500 text-black w-full p-3 py-1" type="text" placeholder='Enter Username' name='username' value={form.username} onChange={handleform} />
            <div className='relative'>
              <input ref={passref} className="rounded-full border border-green-500 text-black w-full p-3 py-1" type="password" placeholder='Enter Password' name='password' value={form.password} onChange={handleform} />
              <span className='absolute right-[3px] top-[7px] cursor-pointer rounded-full overflow-hidden' onClick={showpass}>
                <img ref={ref} width={20} src="Icons/eye.jpg" alt="" />
              </span>
            </div>

          </div>
          <button onClick={savepassword} className='flex text-black justify-center gap-2 text-center items-center bg-green-500 hover:bg-green-600 rounded-full px-5 py-1 w-fit text-sm font-bold border-green-900' >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover">
            </lord-icon>
            Add Password
          </button>
        </div>
        <div className='passwords'>
          <h1 className='font-bold py-4'>Your Passwords</h1>
          {passwordArray.length === 0 && <div>No Password recorded</div>}
          {passwordArray.length != 0 &&
            <table className="table-auto w-full rounded-md overflow-hidden">
              <thead className='bg-green-700 text-white' >
                <tr className='py-2'>
                  <th>Site</th>
                  <th>Username</th>
                  <th>Password</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className='bg-green-100'>
                {passwordArray.map((item, index) => {
                  return <tr key={index}>
                    <td className=' py-1 border border-white text-center'>{item.url}</td>
                    <td className='py-1 border border-white text-center'>{item.username}</td>
                    <td className=' py-1 border border-white text-center'>{item.password}</td>
                    <td className=' py-1 border border-white text-center cursor-pointer'>
                      <span className='mx-1' onClick={() => { editpassword(item.id) }}>
                        <lord-icon
                          src="https://cdn.lordicon.com/wuvorxbv.json"
                          trigger="hover"
                          stroke="bold"
                          style={{ "width": "22px", "height": "22px" }}>
                        </lord-icon>
                      </span>
                      <span className='mx-1' onClick={() => { deletepassword(item.id) }}>
                        <lord-icon
                          src="https://cdn.lordicon.com/drxwpfop.json"
                          trigger="hover"
                          stroke="bold"
                          style={{ "width": "22px", "height": "22px" }}>
                        </lord-icon>
                      </span>
                    </td>
                  </tr>
                })}
              </tbody>
            </table>}
        </div>
      </div>
    </>
  )

}

export default Manager
