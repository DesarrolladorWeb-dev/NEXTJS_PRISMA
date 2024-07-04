"use client"  //recordar todo en minuscula
import {useRouter} from "next/navigation"
import { useEffect, useState } from "react"

function NewPage({params}) {

  const router = useRouter()
const [title, setTitle] = useState("")
const [description , setDescription] = useState("")
console.log(title)
  useEffect(() => {
    if(params.id){
      fetch(`/api/tasks/${params.id}`)
      .then(res => res.json())
      .then(data => {
        setTitle(data.title)
        setDescription(data.description)
      })
    }
  },[])

  const onSubmit = async (e) => {
    e.preventDefault()
    // const title =e.target.title.value
    // ára que funcione value el nombre de id y htmlFor debe ser igual
    // const description = e.target.description.value
    if(params.id){
      const res = await fetch(`/api/tasks/${params.id}`,{
        method: "PUT",
        body: JSON.stringify({title, description}),
        headers: {
          "Content-Type" : "application/json"
        },
      })
      const data = await res.json();
      console.log(data)
     
    }else{
      const res = await fetch('/api/tasks', {
        method: 'POST',
        body: JSON.stringify({title, description}),
        headers:{
          'Content-Type' : 'application/json'
        }
      })
      const data = await res.json()
      // console.log(data)
    }
    
    router.refresh()
    router.push("/")
    router.refresh()


    }

  return (
    <div className="h-screen flex justify-center items-center">
      <form className="bg-slate-800 p-10 lg:w-1/4 md:w-1/2 "onSubmit={onSubmit} >
        <label htmlFor="title" className="font-bold text-sm">
        Titulo de la tarea  
        </label>
        <input type="text"
        id = "title"
        className="border border-gray-400 p-2 mb-4 w-full text-black"
        placeholder="Titulo"
        onChange={(e)=> setTitle(e.target.value)}
        value={title}
        />
        <label htmlFor="description"
        className="font-bold text-sm"
        >
          Descripcion de la tarea
        </label>
        <textarea rows="3"
        id="description"
        className = "border border-gray-400 p-2 mb-4 w-full  text-black"
        placeholder = "Describe tu trabajo"
        onChange={(e)=> setDescription(e.target.value)}
        value={description}
        ></textarea>
        <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Crear
        </button>
        {
          // si existe el params id
          params.id && (
            <button 
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-4"
            type="button"
            onClick={async() => {
              const res = await fetch(`/api/tasks/${params.id}`, {
                method: "DELETE",
              })
              const data = await res.json()
              // console.log(data)
              router.push("/")
              router.refresh()
            }}
            >
              Delete
            </button>
          )
        }
      </form>
    </div>
  )
}

export default NewPage