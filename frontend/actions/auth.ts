"use server"

import { z } from "zod"
import { type FormState, SignupFormSchema } from "@/validations/auth"
import { registerUserService } from "@/lib/strapi"

export async function registerUserAction(prevState: FormState, formData: FormData): Promise<FormState> {

  const fields = {
    username: formData.get("username") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  }

  console.log(fields)

  const validatedFields = SignupFormSchema.safeParse(fields)

  if (!validatedFields.success) {
    const flattenedErrors = z.flattenError(validatedFields.error)

    console.log("Validation errors: ", flattenedErrors.fieldErrors)

    return {
      success: false,
      message: 'Validation Error!',
      // Los nombres strapiErrors y zodErrors en produccion no deberian de llamarse asi, 
      // porque nos da una pista de como es nuestra infraestructura. En este caso, se hace por
      // un tema didactico.
      strapiErrors: null,
      zodErrors: flattenedErrors.fieldErrors,
      data: fields
    }
  }

  console.log("Validation success")
  console.log('fields: ', validatedFields.data)

  const response = await registerUserService(validatedFields.data)

  if (!response || response.error) {
    return {
      success: false,
      message: 'Registration Error!',
      strapiErrors: response?.error,
      zodErrors: null,
      data: fields
    }
  }

  console.log("Registration success")

  return {
    success: true,
    message: 'User registered successfully!',
    strapiErrors: null,
    zodErrors: null,
    data: fields
  }

}