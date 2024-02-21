import './global.css';

// export const metadata = { //TODO think how do dis part correct
// 	// title: 'Flexibble',
// 	// description: 'Showcase and discover remarkable developer projects'
// };
const RootLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<html lang="en">
			<head>
				<title>News portal | Next</title>
				<link rel="icon" type="image/x-icon" href="/icons/mail3.svg" />
				<link
					rel="alternate"
					type="application/rss+xml"
					title="RSS Feed"
					href="https://rss.app/feeds/A8of6tNtRHWQJxUA.xml"
				></link>
			</head>
			<body>
				{/* <Navbar /> */}
				<main>{children}</main>
				{/* <Footer /> */}
			</body>
		</html>
	);
};

export default RootLayout;
