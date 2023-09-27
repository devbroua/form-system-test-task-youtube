/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form"
import { Button, TextField } from "@mui/material"
import styles from "./AuthForm.module.scss"
import { useDispatch } from "react-redux"
import { login, registration } from "../../redux/slices/auth"

const AuthForm = ({ formType, handleModalClose }) => {
  const dispatch = useDispatch()
  const isRegisterForm = formType === "register"

  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: { email: "", password: "" },
    mode: "onChange",
  })

  const onSubmit = async (values) => {
    console.log(values)
    const data = await dispatch(
      isRegisterForm ? registration(values) : login(values)
    )
    if (!data.payload) {
      return alert(`${isRegisterForm ? "Registration" : "Login"} failed!`)
    }
    if ("token" in data.payload) {
      window.localStorage.setItem("token", data.payload.token)
    }
    handleModalClose()
  }

  return (
    <>
      <h2 className={styles.title}>{isRegisterForm ? "Register" : "Login"}</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Email"
          type="email"
          {...register("email", { required: "Input your Email" })}
          error={Boolean(errors.email?.message)}
          helperText={errors.email ? "Email is required" : ""}
        />

        <TextField
          label="Password"
          type="password"
          {...register("password", { minLength: 5, required: true })}
          error={Boolean(errors.password?.message)}
          helperText={errors.password ? "Password is required" : ""}
        />

        <Button disabled={!isValid} variant="contained" type="submit">
          Submit
        </Button>
      </form>
    </>
  )
}

export default AuthForm
