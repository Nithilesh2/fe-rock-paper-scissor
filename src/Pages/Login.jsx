import React, { useState } from "react"
import styles from "../css/Login.module.css"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate()

  const loginClicked = async (eve) => {
    eve.preventDefault()

    try {
      const res = await axios.post("https://be-rock-paper-scissor.onrender.com/login",{
        email,
        password,
      },{
        headers: {
          'Content-Type': 'application/json',
        },
      })
      console.log(res.data)
      
      localStorage.setItem("token", res.data.userId)
      navigate("/")
    } catch (error) {
      console.log(error)
      if(error.status === 409){
        alert(error.response.data.message)
      }
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
          />
          <input
            type="password"
            placeholder="Password"
            className={styles.password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className={styles.loginBtn} onClick={loginClicked}>
            Login
          </button>

          <div className={styles.newAcc}>
            <p className={styles.registerPara}>Create new Account?</p>
            <Link to="/register" className={styles.register}>Register</Link>
          </div>
        </form>
      </div>
    </>
  )
}

export default Login
