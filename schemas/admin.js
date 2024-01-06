const {z} = require('zod')

exports.adminSignupSchema = z.object({
    name : z.string().optional(),
    email : z.string().email(),
    password: z.string().min(4, {message :"Password should be of atleast 4 characters long" }),
})

exports.adminLoginSchema = z.object({
    email : z.string().email(),
    password: z.string().min(4,{message:"Password should be of atleast 4 characters long" }),
})

exports.adminModifyUserSchema = z.object({
    userId: z.string(),
    name : z.string().optional(),
    profileImage: z.string().optional()
})