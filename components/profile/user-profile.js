import ProfileForm from "./profile-form";
import classes from "./user-profile.module.css";

function UserProfile() {
  const changingPasswordHandler = async (passwordData) => {
    const response = await fetch("/api/user/change-password", {
      method: "PATCH",
      body: JSON.stringify(passwordData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  };
  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm onUpdatePassword={changingPasswordHandler} />
    </section>
  );
}

export default UserProfile;
