import React from 'react'
import { api } from '~/utils/api'
import Todo from './Todo';
import CreateTodo from './CreateTodo';

const Todos = () => {
    const {data,isLoading,error} = api.example.getTodo.useQuery();

     if(isLoading) return <>loading todos...</>
     if(error) return <>error occured</>

    return (
    <div className='  p-2 bg-red-400/20 md:w-[700px] w-[350px] rounded-xl mb-2'>
        
        <h1 className='  font-semibold text-3xl  '>Todos</h1>

        <CreateTodo/>
{
        
        data?.map((todo)=>(
           <Todo key={todo.id} done={todo.done}  id={todo.id} title={todo.id} body={todo.body} />
        ))

           }



    </div>
  )
}

export default Todos