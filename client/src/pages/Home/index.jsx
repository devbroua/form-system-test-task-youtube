import { useEffect, useState } from "react"
import { Button, Typography } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import styles from "./Home.module.scss"
import { Modals } from "../../components"
import { fetchAuthMe, isAuthSelector, logout } from "../../redux/slices/auth.js"

const Home = () => {
  const isAuth = useSelector(isAuthSelector)
  const userEmail = useSelector((state) => state.auth.userEmail)
  const dispatch = useDispatch()
  const [showModalType, setShowModalType] = useState(null)

  const onLogoutClick = () => {
    if (window.confirm("Are you sure that you want to logout?")) {
      dispatch(logout())
      window.localStorage.removeItem("token")
    }
  }

  useEffect(() => {
    if (window.localStorage.getItem("token")) {
      dispatch(fetchAuthMe())
    }
  }, [])

  return (
    <div className={styles.container}>
      {isAuth && (
        <>
          <Typography variant="h3">You are logged in</Typography>
          <Typography variant="h3">User Email: {userEmail}</Typography>
        </>
      )}

      <div className={styles.buttonsContainer}>
        {isAuth ? (
          <Button variant="contained" onClick={onLogoutClick}>
            Logout
          </Button>
        ) : (
          <>
            <Button
              variant="contained"
              onClick={() => setShowModalType("login")}
            >
              Login
            </Button>
            <Button
              variant="contained"
              onClick={() => setShowModalType("register")}
            >
              Register
            </Button>
          </>
        )}

        <Modals
          type={showModalType}
          handleModalClose={() => setShowModalType(null)}
        />
      </div>
    </div>
  )
}

export default Home
