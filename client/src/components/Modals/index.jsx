/* eslint-disable react/prop-types */
import { Modal } from "@mui/material"
import AuthForm from "../AuthFrom"
import styles from "./Modals.module.scss"

const Modals = ({ type, handleModalClose }) => {
  return (
    <>
      <Modal open={type === "register"} onClose={handleModalClose}>
        <div className={styles.formContainer}>
          <AuthForm formType="register" handleModalClose={handleModalClose} />
        </div>
      </Modal>

      <Modal open={type === "login"} onClose={handleModalClose}>
        <div className={styles.formContainer}>
          <AuthForm formType="login" handleModalClose={handleModalClose} />
        </div>
      </Modal>
    </>
  )
}

export default Modals
