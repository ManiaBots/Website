import Head from 'next/head';
import { useState } from 'react';
import Modal from 'react-modal';
import { signIn, signOut, useSession } from 'next-auth/client'

import styles from '../styles/Website.module.scss';

export default function Home() {
	const [page, setPage] = useState("Home"),
		[modal, setModal] = useState(false),
		[session] = useSession()

	function changePage(e, modal) {
		e.preventDefault();
		if (!modal) return setPage(e.target.innerText);
		setModal(true);
	}

	return (
		<>
			<Head>
				<title>{page} • Fyre</title>
			</Head>
			<div className={styles.background}></div>
			<div className={styles.navigation}>
				<img src="https://branding.maniabots.xyz/new2.png" className={styles.navImage} />
				<div className={styles.navItems}>
					<i className="fas fa-bars" style={{ marginLeft: "10px" }} />
					<a onClick={(e) => changePage(e, 0)} className={styles.navItem}>Home</a>
					<a onClick={(e) => changePage(e, 0)} className={styles.navItem}>Team</a>
					{session
						? <a onClick={(e) => changePage(e, 1)} className={styles.navItem}>Apply</a>
						: <a style={{ cursor: "not-allowed" }} className={styles.navItem}>Apply</a>
					}
				</div>
				<div className={styles.user}>
					{!session && <a href="#" onClick={() => signIn('discord')}>Login</a>}
					{session && <a href="#" onClick={() => signOut()}>{(session as any).user?.username}<span className={styles.discrim}>#{(session as any).user?.discriminator}</span></a>}
				</div>
			</div>

			{modal && (
				<Modal
					isOpen={modal}
					onRequestClose={() => setModal(false)}
					className={styles.modalMain}
					overlayClassName={styles.modalOverlay}
				>
					<span className={styles.modalTitle}>Apply</span>
					<a>coming soon</a>
				</Modal>
			)}

			<div className={styles.homeMessage}>
				<h1>Fyre.</h1>
				<h1>We're Fyre.</h1>
				<h4>Warming up your discord server, one bot at a time.</h4>
				<i className="fas fa-chevron-down" />
			</div>

			{page === "Home" && (
				<>
					<div className={styles.boxContainer}>
						<div className={styles.box}>
							<span><i className="fal fa-cloud fa-fw" style={{ marginLeft: "5px" }} /> Databases</span>
							<span>We use MongoDB to store configuration and user data such as guild configuration, staff applications and command analytics.</span>
						</div>
						<div className={styles.box}>
							<span><i className="fal fa-code fa-fw" /> Optimized Code</span>
							<span>Our bots are written in typescript and heavily optimised before being deployed for production.</span>
						</div>
						<div className={styles.box}>
							<span><i className="fal fa-microchip" /> Dedicated Hardware</span>
							<span id="fix">We run all our services and bots on one main VPS at the moment, everything is heavily optimised before being deployed for production to ensure everything runs smoothly.</span>
						</div>
					</div>
				</>
			)}

			{page === "Team" && (
				<div className={styles.boxContainer}>
					Coming soon!
				</div>
			)}
		</>
	)
}
