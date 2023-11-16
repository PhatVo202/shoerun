import { Space } from 'antd'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './register.module.scss'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { registerApi } from '../../servers/user'

import { toast } from 'react-toastify'

export const Register = () => {
  const navigate = useNavigate()

  const phoneRegExp = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/
  const [gender, setGender] = useState()

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      name: '',
      phone: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email').required('You must fill in this section!'),

      password: Yup.string()
        .min(8, 'Your password must be at least 5 character!')
        .required('You must fill in this section!'),

      confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),

      name: Yup.string()
        .min(5, 'Your name must be at least 5 character!')
        .max(25, 'Your name must be under 25 characters!')
        .required('You must fill in this section!'),

      phone: Yup.string().required('You must fill in this section!').matches(phoneRegExp, 'Phone number is not valid')
    }),
    onSubmit: async (value) => {
      delete value.confirmPassword

      try {
        const data = { ...value, gender }
        await registerApi(data)
        toast.success('Account registration successful!!🙋🏻‍♂️', {
          position: 'top-right',
          autoClose: 1200,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light'
        })
        navigate('/login')
      } catch (error) {
        toast.error(`${error.response.data.message} 🤯`, {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light'
        })
      }
    }
  })
  return (
    <div className={`${styles.bg__login} py-5 `}>
      <div className={styles.center}>
        <Space onClick={() => navigate('/')}>
          <span className={styles.close__btn}>✖︎</span>
          {/* <CloseOutlined
            className='text-white'
           
          /> */}
        </Space>

        <h1>Register</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className={styles.txt_field}>
            <input
              type='text'
              title='Email'
              required
              name='email'
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            <span />
            <label>
              Email
              {formik.errors.email && formik.touched.email && (
                <span className='text-danger ml-3'>{formik.errors.email}</span>
              )}
            </label>
          </div>
          <div className={styles.txt_field}>
            <input
              type='password'
              required
              title='Password'
              name='password'
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            <span />
            <label>
              Password
              {formik.errors.password && formik.touched.password && (
                <span className='text-danger ml-3'>{formik.errors.password}</span>
              )}
            </label>
          </div>
          <div className={styles.txt_field}>
            <input
              type='password'
              name='confirmPassword'
              required
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              title='Password'
            />
            <span />
            <label>
              Enter the password
              {formik.errors.confirmPassword && formik.touched.confirmPassword && (
                <span className='text-danger ml-3'>{formik.errors.confirmPassword}</span>
              )}
            </label>
          </div>
          <div className={styles.txt_field}>
            <input
              type='text'
              required
              title='Name'
              name='name'
              onBlur={formik.handleBlur}
              minLength={5}
              maxLength={20}
              onChange={formik.handleChange}
            />
            <span />
            <label>
              Name{' '}
              {formik.errors.name && formik.touched.name && (
                <span className='text-danger ml-3'>{formik.errors.name}</span>
              )}
            </label>
          </div>
          <div className={styles.txt_field}>
            <input
              type='text'
              required
              name='phone'
              minLength={5}
              maxLength={10}
              title='Phone'
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            <span />
            <label>
              Phone <span className='text-danger ml-3'>{formik.errors.phone}</span>
            </label>
          </div>

          <>
            <div className='row'>
              <p className='col-4'>Gender</p>
              <div className='col-4 form-check'>
                <input
                  className='form-check-input'
                  type='radio'
                  name='exampleRadios'
                  id='exampleRadios1'
                  defaultValue={true}
                  defaultChecked
                  onClick={(e) => setGender(e.target.value)}
                />
                <label className='form-check-label' htmlFor='exampleRadios1'>
                  Male
                </label>
              </div>
              <div className='col-4 form-check'>
                <input
                  className='form-check-input'
                  type='radio'
                  name='exampleRadios'
                  id='exampleRadios2'
                  defaultValue={false}
                  onClick={(e) => setGender(e.target.value)}
                />
                <label className='form-check-label' htmlFor='exampleRadios2'>
                  Female
                </label>
              </div>
            </div>
          </>
          <input className='mb-4' type='submit' defaultValue='Login' />
        </form>
      </div>
    </div>
  )
}
