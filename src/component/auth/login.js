// import React, { useEffect } from "react";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import { LoginUser } from "../../store/slice/authSlice";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const dispatch = useDispatch();
//   const token = useSelector((state) => state?.auth?.token);
//   const navigate = useNavigate();

//   // useEffect(() => {
//   //   if (token) {
//   //     setTimeout(() => {
//   //       navigate("/");
//   //     }, 400);
//   //   }
//   // }, [token]);

//   const loginSchema = Yup.object().shape({
//     password: Yup.string()
//       .min(8, "Too Short!")
//       .max(50, "Too Long!")
//       .required("Required"),
//     email: Yup.string().email("Invalid email").required("Required"),
//   });

//   const handleSubmit = (values, { setSubmitting }) => {
//     dispatch(LoginUser(values));
//     setSubmitting(false);
//     navigate("/");
//   };

//   return (
//     <>
//       <h1>Login</h1>
//       <Formik
//         initialValues={{ email: "", password: "" }}
//         validationSchema={loginSchema}
//         onSubmit={handleSubmit}
//       >
//         {({ isSubmitting }) => {
//           return (
//             <Form className="d-flex align-items-start flex-column">
//               <label className="m-2">
//                 Email: <Field type="email" name="email" />
//                 <ErrorMessage name="email" component="div" />
//               </label>
//               <label className="m-2">
//                 Password:
//                 <Field type="password" name="password" />
//                 <ErrorMessage name="password" component="div" />
//               </label>
//               <button type="submit" className="m-2" disabled={isSubmitting}>
//                 Submit
//               </button>
//             </Form>
//           );
//         }}
//       </Formik>
//     </>
//   );
// };

// export default Login;

import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { Button, Col, Container, Row, FormGroup, FormLabel, FormControl } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { LoginUser } from "../../store/slice/authSlice";
import './login.css'

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginSchema = Yup.object().shape({
    password: Yup.string()
      .min(8, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await dispatch(LoginUser(values));
      setSubmitting(false);
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
      setSubmitting(false);
    }
  };

  return (
    <>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={loginSchema}
        onSubmit={handleSubmit}
        
      >
        {({ isSubmitting }) => (
          <Container>
            <Row>
              <Col md={6} className="login__form--container">
                <Form style={{ width: "100%", display:'flex', flexDirection:'column' }}>
                  <h1>Login to your account</h1>
                  <FormGroup>
                    <FormLabel>Email Address</FormLabel>
                    <Field
                      type="email"
                      name="email"
                      placeholder="Enter email"
                      as={FormControl}
                    />
                  </FormGroup>

                  <FormGroup className="mb-3">
                    <FormLabel>Password</FormLabel>
                    <Field
                      type="password"
                      name="password"
                      placeholder="Enter Password"
                      as={FormControl}

                    />
                  </FormGroup>

                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Logging in..." : "Login"}
                  </Button>

                  {/* Static "Forgot Password" link */}
                  <p className="pt-3 text-center">
                    <Link to="/forgot-password">Forgot Password?</Link>
                  </p>

                  {/* "Don't have an account?" link */}
                  <p className="text-center">
                    Don't have an account? <Link to="/signup">Create account</Link>{" "}
                  </p>
                </Form>
              </Col>
              <Col md={6} className="login__image--container"></Col>
            </Row>
          </Container>
        )}
      </Formik>
    </>
  );
};

export default Login;

