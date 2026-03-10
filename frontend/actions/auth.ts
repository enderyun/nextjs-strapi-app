"use server"

import { z } from "zod"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

import { type FormState, SignupFormSchema } from "@/validations/auth"
import { registerUserService } from "@/lib/strapi"

const cookieConfig = {
  maxAge: 60 * 60 * 24 * 7, // 7 dias
  path: '/',
  httpOnly: true, // No accesible desde el cliente
  domain: process.env.HOST ?? 'localhost',
  secure: process.env.NODE_ENV === 'production',
  // sameSite: 'strict',
}

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

  const cookieStore = await cookies()
  cookieStore.set('jwt', response.jwt, cookieConfig)
  redirect('/dashboard')

}