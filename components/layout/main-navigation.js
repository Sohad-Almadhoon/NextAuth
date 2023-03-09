import Link from 'next/link';

import classes from './main-navigation.module.css';
import { signOut, useSession } from 'next-auth/react';
function MainNavigation() {
  const { data: session, status } = useSession();
  return (
    <header className={classes.header}>
      <Link href="/">
        <div className={classes.logo}>Next Auth</div>
      </Link>
      <nav>
        <ul>
        {!session && status !== "loading" && (
            <li>
              <Link href="/auth">Login</Link>
            </li>
          )}
          {session && status === "authenticated" && (
            <li>
              <Link href="/profile">Profile</Link>
            </li>
          )}
          {session && (
            <li>
              <button onClick={(e) => {
                e.preventDefault();
                signOut();
              }}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
