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
