import * as z from "zod"; 
type TSignupType =z.infer<typeof signupSchema>;

const signupSchema=z.object({
  firstName:z.string().min(1,{message:"First Name is required"}),
  lastName:z.string().min(1,{message:"Last Name is required"}),
  email:z.string().min(1,{message:"Email is required"}).email(),
  password:z.string().min(8,{message:"Password must be at least 8 characters longs"}).regex(/.*[!@#$%^&*()_+{}|[\]\\:";'<>?,./].*/,{message:"Password should contain at least 1 special character"}),
  confirmPassword:z.string().min(1,{message:"confirm password is required"})
}).refine((input)=>input.password === input.confirmPassword ,{message:"Password and Confirmed password does not match", path:["confirmPassword"]});

export{signupSchema, type TSignupType}