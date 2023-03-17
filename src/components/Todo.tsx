import React from 'react'
import { api } from "../utils/api"
import toast from "react-hot-toast";


const Todo = (todo:{done:boolean,  id:string,title:string,body:string}) => {
  const trpc = api.useContext();

  const {id,done,body} = todo;




  const { mutate: doneMutation } = api.example.toggle.useMutation({
	onMutate: async ( {id, done} ) => {

		// Cancel any outgoing refetches so they don't overwrite our optimistic update
		await trpc.example.getTodo.cancel()

		// Snapshot the previous value
		const previousTodos = trpc.example.getTodo.getData()

		// Optimistically update to the new value
		trpc.example.getTodo.setData(undefined, (prev) => {
			if (!prev) return previousTodos
			return prev.map(t => {
				if (t.id === id) {
					return ({
						...t,
						done
					})
				}
				return t
			})
		})

		// Return a context object with the snapshotted value
		return { previousTodos }
	},

	onSuccess: (err, { done }) => {
		if (done) {
			toast.success("Todo completed 🎉")
		}
	},

	// If the mutation fails,
	// use the context returned from onMutate to roll back
	onError: (err, done, context) => {
		toast.error(`An error occured when marking todo as ${done ? "done" : "undone"}`)
		if (!context) return
		trpc.example.getTodo.setData(undefined, () => context.previousTodos)
	},
	// Always refetch after error or success:
	onSettled: async () => {
		await trpc.example.getTodo.invalidate()
	},
});









  const { mutate: deleteMutation } = api.example.delete.useMutation({

    
    
    onMutate: async (deleteId) => {

			// Cancel any outgoing refetches so they don't overwrite our optimistic update
			await trpc.example.getTodo.cancel()

			// Snapshot the previous value
			const previousTodos = trpc.example.getTodo.getData()

			// Optimistically update to the new value
			trpc.example.getTodo.setData(undefined, (prev) => {
				if (!prev) return previousTodos
				return prev.filter(t => t.id !== deleteId)
			})

			// Return a context object with the snapshotted value
			return { previousTodos }
		},

    onError: (err, newTodo, context) => {
			toast.error(`An error occured when deleting todo`)
			if (!context) return
			trpc.example.getTodo.setData(undefined, () => context.previousTodos)
		},
		// Always refetch after error or success:
		onSettled: async () => {
			toast.success("Todo deleted")
			await trpc.example.getTodo.invalidate()
		},

    
	});


  return (
    <div   className=' grid grid-cols-10  bg-black/20 text-white rounded-xl p-2 my-1  '>
      <div className=' break-words col-span-7'>
      {
		!done?
		<p>{body}</p>:
	  <s>{body}</s> 
	  }
	  
      </div>

      <div className=' flex justify-end items-center col-span-3'>

	<input
	onChange={(e) => {
		doneMutation( { id, done: e.target.checked }   );
	}}
	type="checkbox"  className=' h-6 w-6 mr-2 '  checked={todo.done}/>
        <button onClick={() => {
					deleteMutation(todo.id)
				}} className='bg-red-900 px-4 py-1 my-2 rounded-xl'>delete</button> 
      </div>
   
    </div>
  )
}

export default Todo