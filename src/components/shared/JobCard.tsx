import Link from "next/link";
import { STATIC_URL } from "@/services/api";

interface JobCardProps {
	job: {
		id: string;
		title: string;
		company: string;
		location: string;
		category: string;
		type: string;
		logo?: string;
		description?: string;
	};
}

const JobCard = ({ job }: JobCardProps) => {
	return (
		<Link href={`/jobs/${job.id}`} className="block h-full group">
			<div className="p-6 lg:p-8 bg-white border border-gray-100 rounded-2xl hover:shadow-2xl hover:shadow-gray-200/50 transition-all flex flex-col h-full">
				<div className="flex justify-between items-start mb-6">
					<div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center overflow-hidden shrink-0 border border-gray-100 group-hover:border-primary/20 transition-all">
						{job.logo ? (
							<img
								src={`${STATIC_URL}/${job.logo}`}
								alt={job.company}
								className="w-full h-full object-contain"
							/>
						) : (
							<span className="text-2xl">🏢</span>
						)}
					</div>
					<span className="px-4 py-1.5 border border-primary text-primary text-xs font-bold rounded-full uppercase tracking-wider group-hover:bg-primary group-hover:text-white transition-all">
						{job.type}
					</span>
				</div>

				<h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors line-clamp-1">
					{job.title}
				</h3>
				<p className="text-gray-500 text-xs lg:text-sm mb-6 flex items-center gap-2">
					{job.company} • {job.location}
				</p>

				<p className="text-gray-400 text-sm mb-8 line-clamp-2 grow leading-relaxed">
					{job.description ||
						"We are looking for a creative and motivated professional to join our team..."}
				</p>

				<div className="flex flex-wrap gap-2">
					<span className="px-3 lg:px-4 py-1 lg:py-1.5 bg-yellow-50 text-yellow-600 text-xs font-bold rounded-lg uppercase tracking-wider">
						{job.category}
					</span>
					<span className="px-3 lg:px-4 py-1 lg:py-1.5 bg-green-50 text-green-600 text-xs font-bold rounded-lg uppercase tracking-wider">
						Design
					</span>
				</div>
			</div>
		</Link>
	);
};

export default JobCard;
