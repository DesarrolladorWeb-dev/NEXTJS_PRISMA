import {prisma} from '@/lib/prisma'
import TaskCard from '@/components/TaskCard'

async function loadTask(){
  //obteniendo de la base de datos

  // const res = await fetch('http://localhost:3000/api/tasks')
  // const data  = await res.json()
  return await prisma.task.findMany()
 
}

async function HomePage() {
 const tasks = await  loadTask()
 
  return (
   <section className='container mx-auto'>
     <div className='grid grid-cols-3 gap-3 mt-10'>
    {
      tasks.map((task) => (
        <TaskCard task={task} key={task.id}/>
      ))
    }</div>
   </section>
  )
}

export default HomePage