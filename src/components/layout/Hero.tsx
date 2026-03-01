import Image from "next/image";
import SearchBar from "../shared/SearchBar";

interface HeroProps {
	onSearch: (query: string, location: string) => void;
}

const Hero = ({ onSearch }: HeroProps) => {
	return (
		<section className="relative pt-40 pb-20 overflow-hidden bg-white">
			{/* Hero Pattern Background */}
			<div className="absolute top-0 right-0 w-1/2 h-full pointer-events-none z-0">
				<Image
					src="/hero-pattern.png"
					alt=""
					fill
					className="object-contain object-top-right opacity-100"
					priority
				/>
			</div>

			<div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
				<div className="flex flex-col lg:flex-row items-center relative">
					<div className="flex-1 pt-20 lg:pt-0 text-center lg:text-left relative">
						<h1 className="text-6xl lg:text-[80px] font-black leading-[1.1] text-[#18191C] mb-14 tracking-tight">
							Discover <br />
							more than <br />
							<span className="text-[#007BFF] relative inline-block">
								5000+ Jobs
								<div className="absolute -bottom-5 left-0 w-full h-4">
									<Image
										src="/hero-heading-underline.png"
										alt=""
										fill
										className="object-cover"
									/>
								</div>
							</span>
						</h1>

						<p className="text-xl text-gray-400 mb-12 max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed">
							Great platform for the job seeker that searching for
							new career heights and passionate about startups.
						</p>

						<div className="relative z-20 min-h-[100px]">
							<SearchBar onSearch={onSearch} />
						</div>

						<div className="flex items-center gap-2 mt-8 text-lg">
							<span className="text-gray-400 font-medium whitespace-nowrap">
								Popular :
							</span>
							<span className="text-[#18191C] font-bold cursor-pointer hover:text-primary transition-colors whitespace-nowrap">
								UI Designer,
							</span>
							<span className="text-[#18191C] font-bold cursor-pointer hover:text-primary transition-colors whitespace-nowrap">
								UX Researcher,
							</span>
							<span className="text-[#18191C] font-bold cursor-pointer hover:text-primary transition-colors whitespace-nowrap">
								Android,
							</span>
							<span className="text-[#18191C] font-bold cursor-pointer hover:text-primary transition-colors whitespace-nowrap">
								Admin
							</span>
						</div>
					</div>

					<div className="flex-1 relative mt-12 lg:mt-0">
						<div className="relative w-full aspect-4/5 max-w-2xl mx-auto">
							<Image
								src="/hero-man-image.png"
								alt="Job Seeker"
								fill
								className="object-contain object-bottom z-10"
								priority
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Hero;
