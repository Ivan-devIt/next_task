import { Post } from '@prisma/client';

const Home = async () => {
	const posts = await getAllPosts();

	console.log('==posts==', posts);

	return (
		<>
			<div className="">
				<h1>Home</h1>
				<p>
					Lorem, ipsum dolor sit amet consectetur adipisicing elit. Et hic totam
					autem perspiciatis earum quia, minima laborum architecto
					necessitatibus exercitationem at aperiam sequi dolorum enim ipsa unde
					eum! Adipisci, optio?
				</p>
				<p>
					Lorem, ipsum dolor sit amet consectetur adipisicing elit. Et hic totam
					autem perspiciatis earum quia, minima laborum architecto
					necessitatibus exercitationem at aperiam sequi dolorum enim ipsa unde
					eum! Adipisci, optio?
				</p>
			</div>
			{/* <div>
				{posts.map(({ title, id, description }) => (
					<div key={id}>
						<h4>{title}</h4>
						<p>{description}</p>
					</div>
				))}
			</div> */}
		</>
	);
};

async function getAllPosts(): Promise<Post[]> {
	const res = await fetch(`${process.env.BASE_URL}/api/posts`, {
		// cache: 'no-store' //TODO
		next: { revalidate: 10 } // TODO
	});

	return res.json();
}

export default Home;
