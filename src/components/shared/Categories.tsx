import Link from "next/link";
import {
	PenTool,
	TrendingUp,
	Megaphone,
	CreditCard,
	Monitor,
	Code2,
	Briefcase,
	Users,
	ArrowRight,
} from "lucide-react";

const categories = [
	{
		name: "Design",
		count: 235,
		icon: <PenTool className="w-8 h-8" />,
	},
	{
		name: "Sales",
		count: 756,
		icon: <TrendingUp className="w-8 h-8" />,
	},
	{
		name: "Marketing",
		count: 140,
		icon: <Megaphone className="w-8 h-8" />,
		isHighlighted: true,
	},
	{
		name: "Finance",
		count: 325,
		icon: <CreditCard className="w-8 h-8" />,
	},
	{
		name: "Technology",
		count: 436,
		icon: <Monitor className="w-8 h-8" />,
	},
	{
		name: "Engineering",
		count: 542,
		icon: <Code2 className="w-8 h-8" />,
	},
	{
		name: "Business",
		count: 211,
		icon: <Briefcase className="w-8 h-8" />,
	},
	{
		name: "Human Resource",
		count: 346,
		icon: <Users className="w-8 h-8" />,
	},
];

const Categories = () => {
	return (
		<section className="py-16 lg:py-24 bg-white">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-10 lg:mb-16 gap-6">
					<h2 className="text-4xl lg:text-[56px] font-black text-[#18191C] leading-[1.1]">
						Explore by{" "}
						<span className="text-[#007BFF]">category</span>
					</h2>
					<Link
						href="/find-jobs"
						className="text-[#4640DE] font-bold text-lg flex items-center gap-2 group transition-all"
					>
						Show all jobs
						<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-all" />
					</Link>
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
					{categories.map((cat) => (
						<Link
							href={`/jobs?category=${cat.name}`}
							key={cat.name}
							className={`group p-6 lg:p-10 border rounded-none transition-all duration-300 relative flex lg:flex-col items-center lg:items-start gap-4 lg:gap-0 ${
								cat.isHighlighted
									? "bg-[#4640DE] border-[#4640DE] text-white shadow-xl lg:shadow-2xl lg:shadow-blue-500/30"
									: "bg-white border-gray-100 hover:border-[#4640DE]/10 hover:bg-[#4640DE]/5"
							}`}
						>
							<div
								className={`shrink-0 lg:mb-10 ${
									cat.isHighlighted
										? "text-white"
										: "text-[#4640DE]"
								}`}
							>
								{cat.icon}
							</div>

							<div className="flex-1 lg:mt-auto">
								<h3
									className={`text-xl lg:text-2xl font-black mb-1 lg:mb-4 ${
										cat.isHighlighted
											? "text-white"
											: "text-[#18191C]"
									}`}
								>
									{cat.name}
								</h3>
								<div className="flex items-center justify-between">
									<p
										className={`text-base lg:text-lg font-medium transition-colors ${
											cat.isHighlighted
												? "text-white/80"
												: "text-gray-400"
										}`}
									>
										{cat.count} jobs available
									</p>
									<ArrowRight
										className={`w-5 h-5 ml-auto lg:ml-0 transition-all ${
											cat.isHighlighted
												? "text-white"
												: "text-gray-400 group-hover:text-[#4640DE] group-hover:translate-x-1"
										}`}
									/>
								</div>
							</div>
						</Link>
					))}
				</div>
			</div>
		</section>
	);
};

export default Categories;
