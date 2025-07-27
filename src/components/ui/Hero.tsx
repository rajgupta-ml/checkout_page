
	import { auth } from "@clerk/nextjs/server";
	import { AuthRedirectButton } from "./authRedirect";

	const Hero = async () => {
		const { isAuthenticated } =  await auth();
		return (
			<div className=" h-full flex flex-col gap-2 items-center justify-center">
				<span className="text-primary">No code Needed</span>
				<div className="text-center flex flex-col gap-10 mb-8">
					<h1 className="text-8xl font-bold text-wrap tracking-tighter">
						Customizable checkout pages that convert
					</h1>
					<p className="text-xl  ">
						Accept payments with 0% transaction fees on any website,powered by
						Stripe - without needing to code
					</p>
				</div>
				{/* <Link
					href={isAuthenticated ? "/dashboard" : "/sign-up"}
					className="bg-primary text-muted w-md text-center flex items-center justify-center p-4"
				>
					{isAuthenticated ? "Dashboard" : "Sign Up"}
					<ArrowRight className="" />
				</Link> */}

					<AuthRedirectButton isAuthenticated={isAuthenticated}></AuthRedirectButton>
			</div>
		);
	};

	export default Hero
