import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { signup } from '../api fetch/signup'

const schema = z.object({
  firstName: z.string().nonempty(),
  lastName: z.string().nonempty(),
  email: z.string().email().nonempty(),
  password: z.string().min(6).nonempty(),
  confirmPassword: z.string().min(6).nonempty()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords must match",
  path: ["confirmPassword"]
})

type FormFields = z.infer<typeof schema>

const Signup = () => {
  const navigate = useNavigate()
  const {register, handleSubmit, setError, formState:{errors, isSubmitting}} = useForm<FormFields>({resolver: zodResolver(schema)})
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: (formData: unknown) => signup(formData),
    onSuccess: () => {
      queryClient.invalidateQueries(['isLoggedin'], {exact: true})
      navigate('/')
    },
    onError: () => {setError('root', {'message': 'Error'})} //show speccific error
  })
  const onSubmit: SubmitHandler<FormFields> = async (formData) => {
    mutation.mutate(formData)
  }
  return (
    <div className='grow py-10 flex justify-center bg-[#9fafca]'>
      <div className='w-[min(100%,500px)] py-4'>
        <form onSubmit={handleSubmit(onSubmit)} className='w-[100%] flex flex-col gap-5'>
          <input {...register("firstName")} type="text" className='outline-none rounded-md px-3 py-2' placeholder='Enter first name' />
          {errors.firstName && <p className='text-red-600 text-[0.96rem] font-[500] my-[-15px]'>{errors.firstName.message}</p>}

          <input {...register("lastName")} type="text" className='outline-none rounded-md px-3 py-2' placeholder='Enter second name' />
          {errors.lastName && <p className='text-red-600 text-[0.96rem] font-[500] my-[-15px]'>{errors.lastName.message}</p>}

          <input {...register("email")} type="text" className='outline-none rounded-md px-3 py-2' placeholder='Enter email' />
          {errors.email && <p className='text-red-600 text-[0.96rem] font-[500] my-[-15px]'>{errors.email.message}</p>}

          <input {...register("password")} type="text" className='outline-none rounded-md px-3 py-2' placeholder='Enter password' />
          {errors.password && <p className='text-red-600 text-[0.96rem] font-[500] my-[-10px]'>{errors.password.message}</p>}

          <input {...register("confirmPassword")} type="text" className='outline-none rounded-md px-3 py-2' placeholder='Confirm password' />
          {errors.confirmPassword && <p className='text-red-600 text-[0.96rem] font-[500] my-[-10px]'>{errors.confirmPassword.message}</p>}

          <button disabled={isSubmitting} className='bg-[#0e387a] color-white font-[600] py-3 rounded-md text-white disabled:bg-gray-500'>Sign Up</button> {/* a button inside a form automatically becomes a submit button */}
          <p className='text-[0.9rem] mt-[-13px]'>Already have an account? <Link to={'../signin'} className='underline cursor-pointer text-blue-700'>Sign In</Link></p>
          {errors.root && <p className='text-red-600 text-[0.96rem] font-[600] mx-auto mt-[-5px]'>{errors.root.message}</p>}
        </form>
      </div>
    </div>
  )
}

export default Signup