import React, { useState, useEffect } from "react"
import styles from "../css/Dashboard.module.css"
import { GiRock } from "react-icons/gi"
import { AiOutlineFile } from "react-icons/ai"
import { FaCut } from "react-icons/fa"
import axios from "axios"

const Dashboard = () => {
  const [score, setScore] = useState(0)
  const [botScore, setBotScore] = useState(0)
  const [played, setPlayed] = useState(0)
  const [status, setStatus] = useState()
  const [userChoice, setUserChoice] = useState("")
  const [botChoice, setBotChoice] = useState("")
  const [loading, setLoading] = useState(false)
  const [history, setHistory] = useState([])

  const userId = localStorage.getItem("token")

  useEffect(() => {
    fetchHistory()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchHistory = async () => {
    try {
      const res = await axios.get(
        `https://be-rock-paper-scissor.onrender.com/game/getHistory/${userId}`
      )
      console.log(res.data)
      setHistory(res.data)
    } catch (error) {
      console.error("Error fetching game history:", error)
    }
  }

  const gameStart = () => {
    if (played >= 5) {
      alert("Game over! You've played 10 matches.")
      sendData()
      setUserChoice("")
      setBotChoice("")
      setStatus("")
      setScore(0)
      setBotScore(0)
      setPlayed(0)
      return
    }

    setLoading(true)
    setTimeout(() => {
      const botChoice = ["Rock", "paper", "scissor"][
        Math.floor(Math.random() * 3)
      ]
      setBotChoice(botChoice)
      checkWinner(userChoice, botChoice)
      setLoading(false)
      setPlayed((played) => played + 1)
    }, 1500)
  }

  const sendData = async () => {
    console.log("Sent")
    console.log(userId)
    try {
      await axios.post(`https://be-rock-paper-scissor.onrender.com/game/sendHistory/${userId}`, {
        userScore: score,
        botScore,
      })
      console.log("Game data sent successfully")
      fetchHistory()
    } catch (error) {
      console.error("Error sending game data:", error)
    }
  }

  const checkWinner = (userChoice, botChoice) => {
    if (userChoice === botChoice) {
      setStatus("It's a tie!")
      setTimeout(() => {
        setUserChoice("")
        setBotChoice("")
      }, 1000)
    } else if (
      (userChoice === "Rock" && botChoice === "scissor") ||
      (userChoice === "paper" && botChoice === "Rock") ||
      (userChoice === "scissor" && botChoice === "paper")
    ) {
      setStatus("You win!")
      setScore(score + 1)
      setTimeout(() => {
        setUserChoice("")
        setBotChoice("")
      }, 1000)
    } else {
      setStatus("Computer wins!")
      setBotScore(botScore + 1)
      setTimeout(() => {
        setUserChoice("")
        setBotChoice("")
      }, 1000)
    }
  }

  const cancelClicked = () => {
    setUserChoice("")
    setBotChoice("")
    setStatus("")
    setScore(0)
    setBotScore(0)
    setPlayed(0)
  }

  const formatDate = (isoDate) => {
    const date = new Date(isoDate)
    return date.toISOString().split("T")[0]
  }

  return (
    <div className={styles.hero}>
      <h3 className={styles.title}>Rock, Paper And Scissor Game</h3>
      <hr style={{ width: "90%", border: "1px solid black" }} />
      <div className={styles.bottom}>
        <div className={styles.left}>
          <div className={styles.detailsBox}>
            <div className={styles.played}>Played: {played}/10</div>
            <div className={styles.score}>Your Score: {score}</div>
            <div className={styles.score}>Bot Score: {botScore}</div>
            <div className={styles.status}>{status}</div>
          </div>
          <div className={styles.buttons}>
            <div onClick={() => setUserChoice("Rock")}>
              <GiRock className={styles.icon} title="Rock" />
            </div>
            <div onClick={() => setUserChoice("paper")}>
              <AiOutlineFile className={styles.icon} title="Paper" />
            </div>
            <div onClick={() => setUserChoice("scissor")}>
              <FaCut className={styles.icon} title="Scissors" />
            </div>
          </div>
          <div className={styles.chooses}>
            <div className={styles.userChooses}>
              {userChoice === "" ? (
                <div>Please Choose</div>
              ) : (
                <div>You Choosed {userChoice}</div>
              )}
            </div>
            <div className={styles.botChooses}>
              {loading ? (
                <div>Loading....</div>
              ) : (
                <div>Computer Choosed {botChoice}</div>
              )}
            </div>
          </div>
          <div className={styles.buttonsBox}>
            {userChoice === "" ? (
              <button type="button" className={styles.doneButtonLight}>
                Done
              </button>
            ) : (
              <button
                type="button"
                className={styles.doneButton}
                onClick={gameStart}
              >
                Done
              </button>
            )}
            <button
              type="button"
              className={styles.stopButton}
              onClick={cancelClicked}
            >
              Cancel
            </button>
          </div>
        </div>
        <div className={styles.right}>
          <h3 className={styles.history}>History</h3>
          <div>
            {history.length === 0 ? (
              <p>No history available</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Your </th>
                    <th>Bot </th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((entry, index) => (
                    <tr key={index}>
                      <td>{formatDate(entry.datePlayed)}</td>
                      <td>{entry.score}</td>
                      <td>
                        {entry.status === "win"
                          ? entry.score - 1
                          : entry.score + 1}
                      </td>
                      <td>{entry.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
