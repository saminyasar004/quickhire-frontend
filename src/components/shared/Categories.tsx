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
		<section className="py-24 bg-white">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center mb-12">
					<h2 className="text-5xl font-black text-[#18191C]">
						Explore by{" "}
						<span className="text-[#007BFF]">category</span>
					</h2>
					<Link
						href="/jobs"
						className="text-primary font-bold flex items-center gap-2 group transition-all"
					>
						Show all jobs
						<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
					</Link>
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
					{categories.map((cat) => (
						<Link
							href={`/jobs?category=${cat.name}`}
							key={cat.name}
							className={`group p-8 border rounded-none transition-all duration-300 relative ${
								cat.isHighlighted
									? "bg-[#4640DE] border-[#4640DE] text-white"
									: "bg-white border-gray-100 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5"
							}`}
						>
							<div
								className={`mb-8 ${
									cat.isHighlighted
										? "text-white"
										: "text-primary"
								}`}
							>
								{cat.icon}
							</div>
							<h3
								className={`text-2xl font-bold mb-3 ${
									cat.isHighlighted
										? "text-white"
										: "text-[#18191C]"
								}`}
							>
								{cat.name}
							</h3>
							<div className="flex items-center justify-between">
								<p
									className={`text-lg transition-colors ${
										cat.isHighlighted
											? "text-white/80"
											: "text-gray-400"
									}`}
								>
									{cat.count} jobs available
								</p>
								<ArrowRight
									className={`w-5 h-5 transition-all ${
										cat.isHighlighted
											? "text-white"
											: "text-gray-400 group-hover:text-primary group-hover:translate-x-1"
									}`}
								/>
							</div>
						</Link>
					))}
				</div>
			</div>
		</section>
	);
};

export default Categories;
