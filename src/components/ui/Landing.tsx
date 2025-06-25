import Navbar from '@/components/ui/Navbar';
import Container from './Container';
import Hero from './Hero';
const Landing = () => {
	return (
		<div className="max-h-screen h-screen">
			<Container>
				<div className="border-r border-l h-full p-4 ">
					<Navbar />
					<Hero />
				</div>
			</Container>
		</div>
	);
};



export default Landing;
