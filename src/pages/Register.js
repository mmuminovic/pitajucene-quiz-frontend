import React from 'react'
import { useHistory } from 'react-router-dom'
import { Input, Label, Form, FormGroup } from 'reactstrap'
import { Formik } from 'formik'
import { Input as InputIcon, Person as PersonIcon } from '@material-ui/icons'
import Button from '../components/Button'
import * as Yup from 'yup'

import UserIcon from '../assets/user.png'

export default function Register(props) {
    const history = useHistory()
    return (
        <div className="wrapper">
            <Formik
                initialValues={{ fullName: '', email: '', password: '' }}
                onSubmit={(values, actions) => {
                    alert('Submited!')
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
                    isSubmitting,
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
                        <div className="d-flex flex-column align-items-center">
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
                                />
                            </FormGroup>
                            <div className="auth-form__error">
                                {errors.fullName &&
                                    touched.fullName &&
                                    errors.fullName}
                            </div>
                        </div>
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
                                />
                            </FormGroup>
                            <div className="auth-form__error">
                                {errors.email && touched.email && errors.email}
                            </div>
                        </div>
                        <div className="d-flex flex-column align-items-center">
                            <FormGroup>
                                <Label for="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    name="password"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.password}
                                />
                            </FormGroup>
                            <div className="auth-form__error">
                                {errors.password &&
                                    touched.password &&
                                    errors.password}
                            </div>
                        </div>
                        <div className="d-flex flex-column align-items-center">
                            <Button type="submit" disabled={isSubmitting}>
                                <div className="center-xy">
                                    <span className="mr-2">Registruj se</span>
                                    <PersonIcon />
                                </div>
                            </Button>
                            <p>Imaš nalog? Prijavi se</p>
                            <Button
                                disabled={isSubmitting}
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
