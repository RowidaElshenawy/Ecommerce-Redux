import * as z from "zod"; 
type TSigninType =z.infer<typeof signinSchema>;

const signinSchema=z.object({
  email:z.string().min(1,{message:"Email is required"}).email(),
  password:z.string().min(1,{message:"Password must be at least 8 characters longs"}),
})

export{signinSchema, type TSigninType}