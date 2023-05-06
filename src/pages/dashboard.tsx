import React from "react";
import Todos from "~/components/Todos";

import { signOut } from "next-auth/react";

import { AiOutlinePoweroff } from "react-icons/ai";
import Link from "next/link";

const dashboard = () => {
  return (
    <div className=" flex min-h-screen flex-col  items-center bg-black p-2  text-white">
      <div className=" my-4 flex w-full items-center justify-between rounded-xl bg-yellow-600 px-4  py-4 text-black  md:w-[750px]">
        <h1 className=" text-3xl">Dashboard</h1>
        <div className=" flex items-center justify-center">
          <button onClick={() => signOut()}>
            <AiOutlinePoweroff className=" text-2xl font-bold" />
          </button>
          <Link href={"/"}>
            <p className=" mx-2">home</p>
          </Link>
        </div>
      </div>
      <Todos />
    </div>
  );
};

export default dashboard;
