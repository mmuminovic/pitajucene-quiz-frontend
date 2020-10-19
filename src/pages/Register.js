import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Input, Label, Form, FormGroup } from 'reactstrap'
import { Formik } from 'formik'
import { Input as InputIcon, Person as PersonIcon } from '@material-ui/icons'
import Button from '../components/Button'
import * as Yup from 'yup'
import { useMutation } from 'react-query'
import Loader from '../components/Spinner'
import UserIcon from '../assets/user.png'
import { signup } from '../services/user'

const Register = () => {
    const [error, setError] = useState('')
    const [doSignup, { isLoading }] = useMutation((values) => signup(values), {
        onSuccess: (res) => {
            const data = { ...res }

            if (data.response.status < 300) {
                history.replace('/login')
            } else {
                setError(data.response.data.error)
            }
        },
    })
    const history = useHistory()

    return (
        <div className="wrapper">
            <Formik
                initialValues={{
                    fullName: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                }}
                onSubmit={(values) => {
                    setError('')
                    doSignup(values)
                }}
                validationSchema={Yup.object().shape({
                    email: Yup.string()
                        .required('Email adresa mora biti unijeta')
                        .email('Neispravan format email adrese')
                        .max(
                            250,
                            'Email adresa mora imati najviše 250 karaktera'
                        ),
                    password: Yup.string()
                        .required('Lozinka mora biti unijeta')
                        .min(6, 'Lozinka mora imati najmanje 6 karaktera')
                        .max(250, 'Lozinka mora imati najviše 250 karaktera'),
                    confirmPassword: Yup.string()
                        .required('Ponovljena lozinka mora biti unijeta')
                        .min(
                            6,
                            'Ponovljena lozinka mora imati najmanje 6 karaktera'
                        )
                        .max(
                            250,
                            'Ponovljena lozinka mora imati najviše 250 karaktera'
                        )
                        .when('password', (password, field) =>
                            password
                                ? field
                                      .required(
                                          'Ponovljena lozinka mora biti unijeta'
                                      )
                                      .oneOf(
                                          [Yup.ref('password')],
                                          'Unete lozinke moraju biti iste'
                                      )
                                : field
                        ),
                    fullName: Yup.string()
                        .required('Puno ime i prezime mora biti unijeto')
                        .min(2, 'Ime mora imati najmanje 2 karaktera')
                        .max(250, 'Ime mora imati ne više od 250 karaktera'),
                })}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                }) => (
                    <Form onSubmit={handleSubmit} className="auth-form">
                        <div>
                            <h3>Dobrodošli na kviz pitajucene.com</h3>
                        </div>
                        <div className="center-x">
                            <img
                                src={UserIcon}
                                alt="authimage"
                                style={{ width: '80px', margin: '1rem 0' }}
                            />
                        </div>
                        <div className="mb-5">
                            <h3>Registracija</h3>
                        </div>
                        {!isLoading && (
                            <div className="d-flex flex-column align-items-center">
                                <div className="auth-form__error">{error}</div>
                                <FormGroup>
                                    <Label for="fullName">
                                        Puno ime i prezime:
                                    </Label>
                                    <Input
                                        id="fullName"
                                        type="text"
                                        name="fullName"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.fullName}
                                        style={{ fontSize: '1.4rem' }}
                                    />
                                </FormGroup>
                                <div className="auth-form__error">
                                    {errors.fullName &&
                                        touched.fullName &&
                                        errors.fullName}
                                </div>
                            </div>
                        )}
                        {!isLoading && (
                            <div className="d-flex flex-column align-items-center">
                                <FormGroup>
                                    <Label for="email">Email:</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        name="email"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.email}
                                        style={{ fontSize: '1.4rem' }}
                                    />
                                </FormGroup>
                                <div className="auth-form__error">
                                    {errors.email &&
                                        touched.email &&
                                        errors.email}
                                </div>
                            </div>
                        )}
                        {!isLoading && (
                            <div className="d-flex flex-column align-items-center">
                                <FormGroup>
                                    <Label for="password">Lozinka</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        name="password"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.password}
                                        style={{ fontSize: '1.4rem' }}
                                    />
                                </FormGroup>
                                <div className="auth-form__error">
                                    {errors.password &&
                                        touched.password &&
                                        errors.password}
                                </div>
                            </div>
                        )}
                        {!isLoading && (
                            <div className="d-flex flex-column align-items-center">
                                <FormGroup>
                                    <Label for="confirmPassword">
                                        Potvrdi lozinku
                                    </Label>
                                    <Input
                                        id="confirmPassword"
                                        type="password"
                                        name="confirmPassword"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.confirmPassword}
                                    />
                                </FormGroup>
                                <div className="auth-form__error">
                                    {errors.confirmPassword &&
                                        touched.confirmPassword &&
                                        errors.confirmPassword}
                                </div>
                            </div>
                        )}
                        {isLoading && (
                            <div className="d-flex justify-content-center my-5">
                                <Loader />
                            </div>
                        )}
                        <div className="d-flex flex-column align-items-center">
                            <Button type="submit" disabled={isLoading}>
                                <div className="center-xy">
                                    <span className="mr-2">Registruj se</span>
                                    <PersonIcon />
                                </div>
                            </Button>
                            <p>Imaš nalog? Prijavi se</p>
                            <Button
                                className="submit active"
                                disabled={isLoading}
                                onClick={() => history.push('/login')}
                            >
                                <div className="center-xy">
                                    <span className="mr-2">Prijavi se</span>
                                    <InputIcon />
                                </div>
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default Register
