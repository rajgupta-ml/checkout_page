
"use client"

import { useAuth } from "@clerk/nextjs";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const Hero = () => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
    const { isSignedIn } =  useAuth();
	useEffect(() => {
		(async () => {
			setIsAuthenticated(isSignedIn ?? false);
		})()
	},[])
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
					href={ !isAuthenticated ? "/sign-up" : "/dashboard"}
					className=" bg-primary text-muted w-md text-center flex items-center justify-center p-4"
				>
					{!isAuthenticated ? "Sign Up" : "Dashboard"}
					<ArrowRight className="" />
				</Link>
			</div>
		</div>
	);
};

export default Hero
