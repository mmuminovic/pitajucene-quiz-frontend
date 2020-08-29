import React from 'react'
import { Input, Label, Form, FormGroup, Button } from 'reactstrap'
import { Formik } from 'formik'
import { Input as InputIcon, Person as PersonIcon } from '@material-ui/icons'
// import * as Yup from 'yup'

import AuthImage from '../assets/education.png'

export default function Login(props) {
    return (
        <div className="wrapper">
            <Formik
                initialValues={{ email: '', password: '' }}
                onSubmit={(values, actions) => {
                    alert('Submited!')
                }}
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
                        <div className="center-x">
                            <img src={AuthImage} alt="Auth image" />
                        </div>
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
                        {errors.password && touched.password && errors.password}
                        <div className="d-flex justify-content-between">
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
