'use client'
import { EnvelopeOpenIcon, EyeIcon, EyeSlashIcon, KeyIcon, PhoneIcon, UserIcon } from '@heroicons/react/16/solid'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Checkbox, Input, Link } from '@nextui-org/react'
import { passwordStrength } from 'check-password-strength'
import React, { useEffect, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import validator from 'validator'
import { z } from 'zod'
import PasswordStrength from './PasswordStrength'
function SignUpFrom() {
    const [isVisiblePass, setIsVisiblePass] = useState(false)
    const toggleVisblePass = () => setIsVisiblePass(prev => !prev)
    const FormSchema = z.object({
        firstName: z.string()
            .min(2, "First name must be atleast 2 characters")
            .max(45, "First name must be less than  45 characters")
            .regex(new RegExp("^[a-zA-z]+$"), "No special character allowed!"),
        lastName: z.string()
            .min(2, "Last name must be atleast 2 characters")
            .max(45, "Last name must be less than  45 characters")
            .regex(new RegExp("^[a-zA-z]+$"), "No special character allowed!"),
        email: z.string().email("Please enter a valid email address"),
        phone: z.string().refine(validator.isMobilePhone, "Please enter a vaild phone number!"),
        password: z.string().min(6, "Password must be at least 6 characters").max(50, "Password must be less than 50 characters"),
        confrimPassword: z.string().min(6, "Password must be at least 6 characters").max(50, "Password must be less than 50 characters"),
        accepted: z.literal(true, {
            errorMap: () => ({
                message: "Please accept all terms"
            })
        })
    }).refine(data => data.password == data.confrimPassword, {
        message: "Password and confirm password doesn't match!",
        path: ["confrimPassword"]
    })
    type InputType = z.infer<typeof FormSchema>
    const { watch, register, handleSubmit, reset, formState: { errors }, control } = useForm<InputType>({
        resolver: zodResolver(FormSchema)
    })

    const saveUser: SubmitHandler<InputType> = async (data) => {
        console.log(data)
    }
    const [passStrength, setPassStrength] = useState(0)
    useEffect(() => {
        setPassStrength(passwordStrength(watch().password).id)
    }, [watch().password])
    return (
        <form onSubmit={handleSubmit(saveUser)} className='grid-cols-2 grid gap-3 p-2 ml-[304px] w-full shadow  border rounded-md'>
            <Input
                errorMessage={errors.firstName?.message}
                isInvalid={!!errors.firstName}
                {...register("firstName")} label="First Name" startContent={<UserIcon className='w-4' />} />
            <Input
                errorMessage={errors.lastName?.message}
                isInvalid={!!errors.lastName}
                {...register("lastName")} label="Last Name" startContent={<UserIcon className='w-4' />} />
            <Input
                errorMessage={errors.email?.message}
                isInvalid={!!errors.email}

                {...register("email")} className='col-span-2' label="Email" startContent={<EnvelopeOpenIcon className='w-4' />} />
            <Input
                errorMessage={errors.phone?.message}
                isInvalid={!!errors.phone}
                {...register("phone")} className='col-span-2' label="Phone" startContent={<PhoneIcon className='w-4' />} />
            <Input
                errorMessage={errors.password?.message}
                isInvalid={!!errors.password}
                {...register("password")} className='col-span-2' label="Password" endContent={
                    isVisiblePass ? <EyeIcon className='w-4 cursor-pointer' onClick={toggleVisblePass} /> : <EyeSlashIcon className='w-4 cursor-pointer' onClick={toggleVisblePass} />
                } type={isVisiblePass ? "text" : "password"} startContent={<KeyIcon className='w-4' />} />

            <PasswordStrength passStrength={passStrength} />
            <Input

                errorMessage={errors.confrimPassword?.message}
                isInvalid={!!errors.confrimPassword}
                {...register("confrimPassword")} className='col-span-2' label="Confrim Password" type={isVisiblePass ? "text" : "password "} startContent={<KeyIcon className='w-4' />} />
            <Controller
                name='accepted'
                control={control}
                render={({ field }) => (
                    <Checkbox onChange={field.onChange} onBlur={field.onBlur} className='col-span-2'
                        isInvalid={!!errors.confrimPassword}
                    >Accpet the<Link href="/terms">Terms</Link></Checkbox>
                )}
            />
            {!!errors.accepted && <p className='text-red-500'>{errors.accepted.message}</p>}
            <Button color='primary' type='submit'>Submit</Button>
        </form>
    )
}

export default SignUpFrom