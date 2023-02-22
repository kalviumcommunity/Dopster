import React, { useState } from 'react'
 
import { ToastContainer, toast } from 'react-toastify';
const Upload = () => {
    const[title,setTitle]= useState("")
    const [description,setDescription] =useState("")
    const [link,setLink] = useState("")
    const [image,setImage] = useState("")
    const [url,setUrl] = useState("")
    const PostDetails = ()=>{
        const data = new FormData()
        data.append("file",image)
        data.append("upload_preset","Dopster")
        data.append("cloud_name","dfl44vyoj")

        fetch("https://api.cloudinary.com/v1_1/dfl44vyoj/image/upload",{
            method:'post',
            body:data
        })
        .then(res=>res.json())
        .then(data=>{
           console.log(data.url)
            setUrl(data.url)
            
        })
        .catch(err=>{
            console.log(err)
        })
        fetch('http://localhost:7000/projects/createproject',{
            method:'POST',
      headers:{
        "Content-Type":'application/json'
      },
      body:JSON.stringify({
        title:title,
        description:description,
        link:link,
        photo:url
      })
        }).then(res=>res.json())
        .then(data=>{
            if(data.error){
                toast.error(data.error)

            }
        })

         

    }
  return (
    <div>
     
      <div>
        <div>
            <h2>Upload Your Project</h2>
            <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)} />
            <input type="text"  value={description} onChange={(e)=>setDescription(e.target.value)}/>
            <input type="text" value={link} onChange={(e)=>setLink(e.target.value)}/>
            <input type="file" multiple onChange={(e)=>setImage(e.target.files[0])} />

            <button onClick={()=>PostDetails()} >Upload</button>
        </div>
      </div>
      <ToastContainer/>
    </div>
  )
}

export default Upload