import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'
import signin from '../api fetch/signin'

const schemaSignin = z.object({
  email: z.string().email().nonempty(),
  password: z.string().min(6).nonempty()
})

type FormFieldsSignin = z.infer<typeof schemaSignin>

const Signin = () => {
  const navigate = useNavigate()
  const {register, handleSubmit, setError, formState:{errors, isSubmitting}} = useForm<FormFieldsSignin>({resolver: zodResolver(schemaSignin)})
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: (formData: FormFieldsSignin) => signin(formData),
    onSuccess: () => {
      navigate('/')
      queryClient.invalidateQueries(["isLoggedin"], {exact: true})

    },
    onError: () => {
      setError('root', {'message': 'Invalid credentials'})
    },
  })

  const onSubmit: SubmitHandler<FormFieldsSignin> = async (formData) => {
    mutation.mutate(formData)
  }

  return (
    <div className='grow py-10 flex justify-center bg-[#9fafca]'>
      <div className='w-[min(100%,500px)] py-4'>
        <form onSubmit={handleSubmit(onSubmit)} className='w-[100%] flex flex-col gap-5'>
          <input {...register("email")} type="text" className='outline-none rounded-md px-3 py-2' placeholder='Enter email' />
          {errors.email && <p className='text-red-600 text-[0.96rem] font-[500] my-[-15px]'>{errors.email.message}</p>}
          <input {...register("password")} type="text" className='outline-none rounded-md px-3 py-2' placeholder='Enter password' />
          {errors.password && <p className='text-red-600 text-[0.96rem] font-[500] my-[-10px]'>{errors.password.message}</p>}
          <button className='bg-[#0e387a] color-white font-[600] py-3 rounded-md text-white disabled:bg-gray-500' disabled={mutation.status == 'loading'}>Sign in</button> {/* a button inside a form automatically becomes a submit button */}
          <p className='text-[0.9rem] mt-[-13px]'>Don't have an acount? <Link to={'../signup'} className='underline cursor-pointer text-blue-700'>Sign up</Link></p>
          {errors.root && <p className='text-red-600 text-[0.96rem] font-[600] mx-auto mt-[-5px]'>{errors.root.message}</p>}
        </form>
      </div>
    </div>
  )
}

export default Signin