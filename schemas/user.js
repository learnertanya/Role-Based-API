const {z} = require('zod');

exports.userSignupSchema = z.object({
    name : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(4,{message: "Password should be of atleast 4 characters long"}),
    phone: z.string().optional(),
    profileImage: z.string().optional()
})

exports.userLoginSchema = z.object({
    email : z.string().email(),
    password: z.string().min(4,{message: "Password should be of atleast 4 characters long"}),
})

exports.userUpdateSchema = z.object({
    name : z.string().optional(),
    profileImage: z.string().optional()
})