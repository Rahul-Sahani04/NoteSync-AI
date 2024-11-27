import React, { useContext, useState } from 'react';
import { TextField, Button, InputAdornment, InputLabel, OutlinedInput, FormControl, IconButton, FormHelperText, colors } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../styles/home.css"
import Alertss from "./Alertss";
import { AlertContext } from '../context/AlertContext';
import { useFormik } from 'formik'
import * as Yup from 'yup';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import '../styles/login.css';


function Login(props) {

    const location = useLocation()
    const navigate = useNavigate()
    const { showAlert } = useContext(AlertContext)
    const [showPassword, setShowPassword] = useState(false)

    const host = process.env.REACT_APP_API_URL

    const loginSchema = Yup.object().shape({
        username: Yup.string().min(3).max(25).required().matches(/^[a-z0-9]+$/i, "Username should contain alphabets and numbers only"),
        password: Yup.string().required().min(4).matches(/^[a-z0-9]+$/i, "Password should contain alphabets and numbers only")
    })

    const formik = useFormik({
        initialValues: {
            username: "",
            password: ""
        },
        validationSchema: loginSchema,
        onSubmit: async (values) => {

            const response = await fetch( host + "/api/auth/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            })
            const json = await response.json()
            // console.log(json);

            if (json.success) {
                localStorage.setItem("token", json.authToken)
                navigate(`/`)
                showAlert(`Welcome back ${values.username}`, "success")
            } else {
                showAlert(json.message, "error")

            }
        }
    })

    const { errors, touched, handleSubmit, getFieldProps } = formik;

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
        // console.log("USER", getFieldProps('username'), getFieldProps('password'));
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const inputLabelProps = {
        style: {
            color: '#00A8E8',
            borderColor: '#FF6600',
        },
    };

    const inputProps = {
        style: {
            color: '#FFFFFF',
            caretColor: "#FFD700",
            outlineColor: "#FFD700"
        },
    };

    return (
        <div className='main-body '>
            <div className='bg-svg'
            data-aos="zoom-in"
            data-aos-duration="600"
            data-aos-delay="50"
            ></div>
            <div className="container mt-5 addnotes"
                data-aos="fade-up"
                data-aos-duration="600"
                data-aos-delay="150"
            >
                <Button className="mb-4" variant="text" color="secondary" startIcon={<ArrowBackIcon />} component={Link} to="/" style={{ textTransform: "none", fontFamily: "'Poppins', sans-serif" }}>Home</Button>
                <h2 style={{ fontWeight: "Bold" }}>Login</h2>

                <form autoComplete="off" noValidate onSubmit={handleSubmit}>
                    <div className="mb-4 mt-5">
                        <TextField {...getFieldProps('username')}
                            color="secondary" label="Username" variant="outlined" fullWidth
                            error={Boolean(touched.username && errors.username)}
                            helperText={touched.username && errors.username}
                            InputLabelProps={inputLabelProps}
                            InputProps={inputProps}
                        />
                    </div>
                    <div className="mb-4">
                        <FormControl variant="outlined" fullWidth color='#FFF'>
                            <InputLabel color="secondary" error={Boolean(touched.password && errors.password)} htmlFor="outlined-adornment-password" style={inputLabelProps.style}>Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                color="secondary"
                                type={showPassword ? 'text' : 'password'}
                                {...getFieldProps('password')}
                                error={Boolean(touched.password && errors.password)}
                                style={inputProps.style}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff style={{ fill: "#FFFFFF" }} /> : <Visibility style={{ fill: "#FFFFFF" }} />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password" />
                            <FormHelperText error={Boolean(touched.password && errors.password)} id="outlined-weight-helper-text">{touched.password && errors.password}</FormHelperText>
                        </FormControl>
                    </div>
                    <Button type="submit" fullWidth size="large" className="mb-4" variant="contained" color="secondary" style={{ textTransform: "none", fontFamily: "'Poppins', sans-serif", fontSize: "1.1rem" }}>Login</Button>
                </form>
                <p>Don't have an account? <Link to="/register" >register</Link> </p>
            </div>
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </div>
    )
}

export default Login
