import Navbar from '@/componets/Navbar';
import React from 'react';
import Container from './Container';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
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

const Hero = () => {
	return (
		<div className=" h-full flex flex-col gap-2 items-center justify-center">
			<span className="text-primary">No code Needed</span>
			<div className="text-center flex flex-col gap-10 mb-8">
				<h1 className="text-8xl font-bold text-wrap">
					Customizable checkout pages that convert
				</h1>
				<p className="text-xl  ">
					Accept payments with 0% transaction fees on any website,powered by
					Stripe - without needing to code
				</p>
			</div>
			<div className="w-full  items-center flex justify-center ">
				<Link
					href="/signup"
					className=" bg-primary text-muted w-md text-center flex items-center justify-center p-4"
				>
					Sign Up
					<ArrowRight className="" />
				</Link>
			</div>
		</div>
	);
};

export default Landing;
