
import React,{useState} from 'react'
import { todoInput } from '~/types'
import { api } from '~/utils/api'
import toast from "react-hot-toast";
import {BsPlusCircle} from 'react-icons/bs'


const CreateTodo = () => {
    const [newTodo, setNewTodo] = useState("")
    const trpc = api.useContext();

    const { mutate } = api.example.create.useMutation({
	
		// Always refetch after error or success:
		onSettled: async () => {
			console.log('SETTLED')
			await trpc.example.getTodo.invalidate()
            toast.remove()
            toast.success("Todo created")
            
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
            
            const loadingToast = toast.loading("creating todo ...");

            mutate(newTodo)
            
        }}

        className=" grid grid-cols-10  gap-2 "
        >

        <div className='break-words col-span-8' >

        <input
        onChange={(e) => {
            setNewTodo(e.target.value)
        }}
        placeholder='Add Todo ...' className=' p-2 h-full border-2 border-white/20 rounded-xl  w-full  outline-none  bg-transparent'/>
        </div>

        <div className=' flex  justify-end py-1  col-span-2'>

        <button  className=' text-green-700 px-2 py-1 text-3xl md:text-5xl rounded-xl'><BsPlusCircle/></button>
        </div>
        </form>
        
    </div>
  )
}

export default CreateTodo