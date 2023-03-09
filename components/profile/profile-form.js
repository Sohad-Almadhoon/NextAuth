import { useRef } from "react";
import classes from "./profile-form.module.css";

function ProfileForm({onUpdatePassword}) {
  const oldPasswordRef = useRef();
  const newPasswordRef = useRef();
  const submitHandler = (e) => {
    const oldPassword = oldPasswordRef.current.value;
    const newPassword = newPasswordRef.current.value;
    e.preventDefault();
    onUpdatePassword({ oldPassword, newPassword });
  };
  return (
    <form className={classes.form} action="post" onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input type="password" id="new-password" ref={newPasswordRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor="old-password">Old Password</label>
        <input type="password" id="old-password" ref={oldPasswordRef} />
      </div>
      <div className={classes.action}>
        <button type="submit">Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
