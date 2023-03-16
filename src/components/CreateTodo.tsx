import { Example, Todo } from '@prisma/client'
import React,{useState} from 'react'
import { todoInput } from '~/types'
import { api } from '~/utils/api'
import toast from "react-hot-toast";

const CreateTodo = () => {
    const [newTodo, setNewTodo] = useState("")
    const trpc = api.useContext();

    const { mutate } = api.example.create.useMutation({
	
		// Always refetch after error or success:
		onSettled: async () => {
			console.log('SETTLED')
			await trpc.example.getTodo.invalidate()
		},
	});



    return (
    <div className=' bg-black/50 text-white rounded-xl  my-4 '>
        <form 
        onSubmit={(e) => {
            e.preventDefault()
            const result = todoInput.safeParse(newTodo)

            if (!result.success) {
                toast.error(result.error.format()._errors.join('\n'))
                return
            }

            mutate(newTodo)
            toast.success("created todo")
        }}

        className=" grid grid-cols-10  "
        >

        <div className='break-words col-span-7' >

        <input
        onChange={(e) => {
            setNewTodo(e.target.value)
        }}
        placeholder='Add Todo' className=' p-2 h-full  w-full  outline-none  bg-transparent'/>
        </div>

        <div className=' flex justify-end p-4  col-span-3'>

        <button  className=' bg-green-900 px-4 py-1 rounded-xl'>create</button>
        </div>
        </form>
        
    </div>
  )
}

export default CreateTodo