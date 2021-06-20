import "../styles/globals.scss";
import "../styles/bootstrap.scss";

import Head from "next/head";

export default function Fyre({ Component, pageProps }) {
	return (
		<>
			<Component {...pageProps} />
		</>
	);
}
