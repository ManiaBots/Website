import Document, { Head, Html, Main, NextScript } from 'next/document';

export default class Site extends Document {
	render() {
		return (
			<Html>
				<Head>
					<meta name="title" content="Fyre" />
					<meta name="description" content="Warming up your discord server, one bot at a time." />
					<meta property="og:image" content="https://branding.fyredev.xyz/new2.png" />
					<meta name="keywords" content="developer,discord,fullstack,nextjs,typescript,botdeveloper,botdev,discordbots" />
					<meta name="robots" content="index, follow" />
					<meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
					<meta name="language" content="English" />
					<meta name="theme-color" content="#0073a1" />
					<meta name="revisit-after" content="1 days" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
					<link rel="preconnect" href="https://fonts.gstatic.com" />
					<link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.15.3/css/all.css" />
				</Head>

				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}