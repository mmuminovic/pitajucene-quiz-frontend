import React from 'react'
import { useHistory } from 'react-router-dom'
import { Input, Label, Form, FormGroup } from 'reactstrap'
import { Formik } from 'formik'
import { Input as InputIcon, Person as PersonIcon } from '@material-ui/icons'
import * as Yup from 'yup'

import Button from '../components/Button'

import AuthImage from '../assets/education.png'
import { login } from '../services/user'

export default function Login(props) {
    const history = useHistory()
    return (
        <div className="wrapper">
            <Formik
                initialValues={{ email: '', password: '' }}
                onSubmit={async (values, _) => {
                    const isAuth = await login(values)
                    if (isAuth) {
                        history.replace('/')
                    }
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
                                src={AuthImage}
                                alt="authimage"
                                style={{ width: '150px' }}
                            />
                            {/* <ExitToAppOutlined htmlColor="#fff" /> */}
                        </div>
                        <div className="mb-5">
                            <h3>Prijava</h3>
                        </div>
                        <div className="d-flex flex-column align-items-center">
                            <FormGroup>
                                <Label for="email">Email adresa:</Label>
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
                                <Label for="password">Lozinka:</Label>
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
                                    <span className="mr-2">Prijavi se</span>
                                    <InputIcon />
                                </div>
                            </Button>
                            <p>Nemaš nalog? Registruj se</p>
                            <Button
                                disabled={isSubmitting}
                                onClick={() => history.push('/register')}
                            >
                                <div className="center-xy">
                                    <span className="mr-2">Registruj se</span>
                                    <PersonIcon />
                                </div>
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}
