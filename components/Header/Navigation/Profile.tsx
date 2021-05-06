import { signIn, signOut, useSession } from 'next-auth/client';
import Image from 'next/image';

import styles from './Navigation.module.scss';

export default function Profile() {
    const [session]: any = useSession();

    return (
        <>
            {!session && (<><a href="#" className={styles.navItemRight} onClick={handleSignIn}>Login</a></>)}
            {session && (
                <div className={styles.navItemRight}>
                    <a className={styles.username} onClick={handleSignOut}>{session.user.username}#{session.user.discriminator}</a>
                    <Image
                        className={styles.image}
                        src={session.user.image_url}
                        width="35"
                        height="35"
                    />

                    <div className={styles.navItemDropdown}>
                        <a href="#" className={styles.dropdownItem}><i className="fas fa-cog" /> Dashboard</a><br />
                        <a href="#" className={styles.dropdownItem}><i className="fas fa-cog" /> Admin</a><br />
                        <a href="#" onClick={handleSignOut} style={{ color: "#e63232 " }} className={styles.dropdownItem}><i className="fas fa-sign-out-alt" style={{ color: "#e63232 " }} /> Logout</a>
                    </div>
                </div>
            )}
        </>
    )
}

function handleSignIn(e) {
    e.preventDefault();
    signIn('discord');
}

function handleSignOut(e) {
    e.preventDefault();
    signOut();
}