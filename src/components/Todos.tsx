import React from 'react'
import { api } from '~/utils/api'
import Todo from './Todo';
import CreateTodo from './CreateTodo';

const Todos = () => {
    const {data,isLoading,error} = api.example.getTodo.useQuery();

     if(isLoading) return <><p>loading todos...</p></>
     if(error) return <><p>error occured</p></>

    return (
    <div className=' grid gap-2  grid-cols-1  md:w-[750px]    py-3   rounded-xl mb-2'>
        
          
          <div className=' col-span-full '>
        <h1 className='  font-semibold text-3xl    '>Todolist</h1>

          </div>

        <div>

        < CreateTodo/>
        </div>
{
        
        data?.map((todo)=>(
           <Todo key={todo.id} done={todo.done}  id={todo.id} title={todo.id} body={todo.body} />
        ))

           }



    </div>
  )
}

export default Todos