import '../styles/globals.scss'
import NextNprogress from 'nextjs-progressbar';
import Head from 'next/head';

export default function Fyre({ Component, pageProps }) {
	return (
		<>
			<Head>
				<link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossOrigin="anonymous" />
			</Head>
			<NextNprogress
				color="#385db5"
				startPosition={0.2}
				stopDelayMs={100}
			/>
			<Component {...pageProps} />
		</>
	)
}
