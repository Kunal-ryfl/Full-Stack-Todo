import { z } from "zod";

import {
  createTRPCRouter,

  protectedProcedure,
} from "~/server/api/trpc";
import { todoInput } from "~/types";

export const TodoRouter = createTRPCRouter({
 
  // getAll: publicProcedure.query(({ ctx }) => {
  //   return ctx.prisma.example.findMany();
  // }),

  // getSecretMessage: protectedProcedure.query(() => {
  //   return "you can now see this secret message!";
  // }),

 getTodo : protectedProcedure.query(async({ctx})=>{

 const todos = ctx.prisma.todo.findMany({
  where:{
    userId:ctx.session.user.id,
  }
 })


 return todos
  // return [
  //   {id:'fake',content:'hi content'},
  //   {id:'fake2',content:'Almost all of your props are optional when using React with simple JavaScript. If you miss passing one and, lets say, only pass the title for the BlogPostComponent, nothing will go wrong    With TypeScript and typed properties, the scenario is totally different. Once they have been entered into the component, we must state clearly which are required and which are optional. Fortunately, we have the ? symbol for optional properties, allowing us to use it in components as well '},
  // ]
 }),

create : protectedProcedure.input(todoInput).mutation(async({ctx,input})=>{

  return ctx.prisma.todo.create({
    data: {
      body: input,
      title:'title',
      done:false,
      user: {
        connect: {
          id: ctx.session.user.id,
        },
      },
    },
    
  });

}),
    
delete: protectedProcedure.input(z.string()).mutation(({ ctx, input }) => {
  return ctx.prisma.todo.delete({
    where: {
      id: input,
    },
  });
}),



toggle: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        done: z.boolean(),
      })
    )
    .mutation(({ ctx, input }) => {
      const { id, done } = input;
      return ctx.prisma.todo.update({
        where: {
          id,
        },
        data: {
          done,
        },
      });
    }),


});
