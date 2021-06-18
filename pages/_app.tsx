import "../styles/globals.scss";
import "../styles/bootstrap.scss";

import Head from "next/head";

export default function Fyre({ Component, pageProps }) {
	return (
		<>
			<Head>
				<link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossOrigin="anonymous" />
			</Head>
			<Component {...pageProps} />
		</>
	);
}
