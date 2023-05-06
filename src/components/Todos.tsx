// import { useState, useRef, useEffect } from 'react'
import { useAutoAnimate } from '@formkit/auto-animate/react'

import React from "react";
import { api } from "~/utils/api";
import Todo from "./Todo";
import CreateTodo from "./CreateTodo";

const Todos = () => {
  const { data, isLoading, error } = api.example.getTodo.useQuery();
  const [listRef] = useAutoAnimate<HTMLDivElement>();
  if (isLoading)
    return (
      <>
        <p>loading todos...</p>
      </>
    );
  if (error)
    return (
      <>
        <p>error occured</p>
      </>
    );

  return (
    <div className=" mb-2 grid  w-full grid-cols-1  gap-2    rounded-xl   py-3 md:w-[750px]">
      <div className=" col-span-full ">
        <h1 className="  text-3xl font-semibold    ">Todolist</h1>
      </div>

      <div>
        <CreateTodo />
      </div>
      <div ref={listRef} >
      {data?.map((todo) => (
        <Todo
        key={todo.id}
        done={todo.done}
        id={todo.id}
        title={todo.id}
        body={todo.body}
        />
        ))}
        </div>
    </div>
  );
};

export default Todos;
