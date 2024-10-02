const { z } = require("zod");

const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid Email address" })
    .min(3, { message: "Email must be atleast 3 Chars" })
    .max(255, { message: "Email must not be more than 255 Chars" }),
  password: z
    .string({ required_error: "Password is required" })
    .trim()
    .min(7, { message: "Password must be atleast 7 Chars" })
    .max(1024, { message: "Password must not be more than 1024 Chars" }),
});

//Creating Object Schema
const signupSchema = loginSchema.extend({
  username: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(3, { message: "Name must be atleast 3 Chars" })
    .max(255, { message: "Name must not be more than 255 Chars" }),
  phone: z
    .string({ required_error: "Phone is required" })
    .trim()
    .min(10, { message: "Phone must be atleast 10 Chars" })
    .max(20, { message: "Phone must not be more than 20 Chars" }),
});

module.exports = { signupSchema, loginSchema };
