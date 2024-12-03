import React, { useState } from "react"
import styles from "../css/Login.module.css"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"

const Register = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()

  const registerClicked = async (eve) => {
    eve.preventDefault()

    try {
      const res = await axios.post(
        "http://localhost:8875/register",
        {
          email: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      alert(res.data.message)
      navigate("/login")
    } catch (error) {
      console.log(error)
      if (error.code === 409) {
        alert(error.response.data.message)
      }
    }
  }

  return (
    <>
      <div className={styles.hero}>
        <form className={styles.formBox}>
          <h1 className={styles.loginName}>Register</h1>
          <input
            type="email"
            placeholder="Email"
            className={styles.userName}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className={styles.password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className={styles.loginBtn}
            onClick={registerClicked}
          >
            Register
          </button>

          <div className={styles.newAcc}>
            <p className={styles.registerPara}>Already have Account?</p>
            <Link to="/login" className={styles.register}>
              Login
            </Link>
          </div>
        </form>
      </div>
    </>
  )
}

export default Register
