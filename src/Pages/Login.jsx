import React, { useState } from "react"
import styles from "../css/Login.module.css"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const loginClicked = async (eve) => {
    eve.preventDefault()

    try {
      setLoading(true)
      const res = await axios.post(
        "https://be-rock-paper-scissor.onrender.com/login",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      navigate("/dashboard")
      localStorage.setItem("token", res.data.userId)

      setLoading(false)
    } catch (error) {
      console.log(error)
      if (error.status === 409) {
        alert(error.response.data.message)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className={styles.hero}>
        <form className={styles.formBox}>
          <h1 className={styles.loginName}>Login</h1>
          <input
            type="email"
            placeholder="Email"
            className={styles.userName}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className={styles.password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className={styles.loginBtn}
            onClick={loginClicked}
          >
            {loading? "Loading...": "Login"}
            {/* Login */}
          </button>

          <div className={styles.newAcc}>
            <p className={styles.registerPara}>Create new Account?</p>
            <Link to="/register" className={styles.register}>
              Register
            </Link>
          </div>
        </form>
      </div>
    </>
  )
}

export default Login
