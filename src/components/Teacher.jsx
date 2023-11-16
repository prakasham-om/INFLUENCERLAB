import React,{useState,useEffect} from 'react'
import axios from 'axios';
const Teacher = () => {
  const [data,setData]=useState([]);
  const [addData,setAddData]=useState({name:'',proffesion:""});
  const getData=async()=>{
   const res=await fetch('http://localhost:8000/teacher/')
   const data=await res.json()
   console.log(data)
   setData(data.result);
  }
  const CreateTeacher=async()=>{
     await axios.post('http://localhost:8000/teacher/new',addData)
      .then(()=>{
      console.log("create success")
         setAddData({name:"",proffesion:""})
      }
      ).catch((err)=>console.log(err));
  }

  const deleteData =async(id)=>{
    console.log(id);
   try{
    await axios.delete(`http://localhost:8000/teacher/delete/${id}`)
    .then(()=>{
      console.log("deleted successfull");
    })
   }catch(err){
    console.log(err);
   }
  }
  
  const upDateData=async(id)=>{
    try{
      await axios.patch(`http://localhost:8000/teacher/update/${id}`)
      .then(()=>console.log("updated"))
      .catch((err)=>console.log(err));
    }catch(err){
      console.log(err);
    }
  }

  useEffect(()=>{
     getData()
  },[])


  return (
    <>
    <p>Teacher List</p>
      { 
       data.map((ele)=>{
          return <>
          <li>{ele.name}</li><button onClick={()=>deleteData(ele._id)}>delete</button>
           
            <button className='px-2'
             onClick={()=>upDateData(ele._id,{name:"abc",proffesion:"abc"})}
            >updateData</button>
           </>  
        }) 
      }  
    <p>Add Teacher</p>
    <input type="text" 
    placeholder='Enter Teacher Naame'
    onChange={(e) => setAddData({ ...addData, name: e.target.value })}
    />

    <input type='text'
    placeholder='Enter Proffesion'
    onChange={(e) => setAddData({ ...addData, proffesion: e.target.value })}
   />
   <button onClick={CreateTeacher}>Add</button>
    </>
  )
}

export default Teacher