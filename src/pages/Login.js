import React from 'react'
import { Input, Label, Form, FormGroup, Button } from 'reactstrap'
import { Formik } from 'formik'
import { Input as InputIcon, Person as PersonIcon } from '@material-ui/icons'
import * as Yup from 'yup'

import AuthImage from '../assets/education.png'

export default function Login(props) {
    return (
        <div className="wrapper">
            <Formik
                initialValues={{ email: '', password: '' }}
                onSubmit={(values, actions) => {
                    alert('Submited!')
                }}
                validationSchema={Yup.object().shape({
                    email: Yup.string().required().email().max(250),
                    password: Yup.string().required().min(6).max(250),
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
                            <img src={AuthImage} alt="authimage" />
                        </div>
                        <div className="mb-5">
                            <h3>Prijavite se</h3>
                        </div>
                        <div className="center-x">
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
                            {errors.email && touched.email && errors.email}
                        </div>
                        <div className="center-x">
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
                            {errors.password &&
                                touched.password &&
                                errors.password}
                        </div>
                        <div className="d-flex flex-column align-items-center">
                            <Button type="submit" disabled={isSubmitting}>
                                <div className="center-xy">
                                    <span className="mr-2">Prijavi se</span>
                                    <InputIcon />
                                </div>
                            </Button>
                            <Button type="submit" disabled={isSubmitting}>
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
