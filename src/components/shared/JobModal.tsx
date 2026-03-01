"use client";

import {
	X,
	MapPin,
	Briefcase,
	Calendar,
	Clock,
	DollarSign,
} from "lucide-react";
import { STATIC_URL, applicationService } from "@/services/api";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface JobModalProps {
	job: any;
	onClose: () => void;
}

const JobModal = ({ job, onClose }: JobModalProps) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [isApplying, setIsApplying] = useState(false);
	const [applied, setApplied] = useState(false);
	const router = useRouter();

	useEffect(() => {
		const token = localStorage.getItem("access_token");
		setIsLoggedIn(!!token);
	}, []);

	const handleApply = async () => {
		if (!isLoggedIn) {
			router.push("/auth/login");
			return;
		}

		setIsApplying(true);
		try {
			await applicationService.applyWithProfile(job.id);
			setApplied(true);
		} catch (error) {
			console.error("Failed to apply:", error);
			alert("Failed to apply. Please try again.");
		} finally {
			setIsApplying(false);
		}
	};

	if (!job) return null;

	return (
		<div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
			<div
				className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col relative shadow-2xl animate-in zoom-in-95 duration-200"
				onClick={(e) => e.stopPropagation()}
			>
				{/* Close Button */}
				<button
					onClick={onClose}
					className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors z-10"
				>
					<X size={24} className="text-gray-400" />
				</button>

				<div className="overflow-y-auto custom-scrollbar p-8 lg:p-12">
					<div className="flex flex-col lg:flex-row items-start gap-8 mb-10 pb-10 border-b border-gray-100">
						<div className="w-24 h-24 bg-white rounded-2xl border border-gray-100 flex items-center justify-center overflow-hidden shrink-0 shadow-sm">
							{job.logo ? (
								<img
									src={`${STATIC_URL}/${job.logo}`}
									alt={job.company}
									className="w-full h-full object-contain"
								/>
							) : (
								<span className="text-4xl">🏢</span>
							)}
						</div>

						<div className="flex-1">
							<div className="flex flex-wrap items-center gap-3 mb-4">
								<span className="px-4 py-1.5 bg-primary/5 text-primary text-xs font-bold rounded-full uppercase tracking-wider">
									{job.type || "Full Time"}
								</span>
								<span className="px-4 py-1.5 bg-green-50 text-green-600 text-xs font-bold rounded-full uppercase tracking-wider">
									{job.category}
								</span>
							</div>
							<h2 className="text-3xl lg:text-4xl font-black text-gray-900 mb-3 leading-tight">
								{job.title}
							</h2>
							<div className="flex flex-wrap items-center gap-6 text-gray-500 font-medium">
								<span className="flex items-center gap-2">
									<MapPin
										size={18}
										className="text-primary"
									/>
									{job.location}
								</span>
								<span className="flex items-center gap-2">
									<Briefcase
										size={18}
										className="text-primary"
									/>
									{job.company}
								</span>
							</div>
						</div>
					</div>

					<div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
						<div className="lg:col-span-2">
							<section className="mb-10">
								<h3 className="text-2xl font-black text-gray-900 mb-6">
									Description
								</h3>
								<div className="prose prose-blue max-w-none text-gray-500 leading-relaxed whitespace-pre-wrap text-lg">
									{job.description ||
										"No description provided."}
								</div>
							</section>

							<section>
								<h3 className="text-2xl font-black text-gray-900 mb-6">
									Requirements
								</h3>
								<ul className="space-y-4">
									{[
										"Excellent communication and interpersonal skills",
										"Proven experience in this field of expertise",
										"Ability to work in a fast-paced environment",
										"Strong analytical and problem-solving skills",
									].map((req, i) => (
										<li
											key={i}
											className="flex items-start gap-4 text-gray-500 text-lg"
										>
											<div className="mt-2 w-2 h-2 rounded-full bg-primary shrink-0" />
											{req}
										</li>
									))}
								</ul>
							</section>
						</div>

						<div className="lg:col-span-1">
							<div className="bg-[#F8F9FF] p-8 rounded-3xl border border-gray-100 flex flex-col gap-6">
								<div className="flex items-center gap-4">
									<div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
										<DollarSign className="text-primary" />
									</div>
									<div>
										<p className="text-sm text-gray-400 font-bold uppercase tracking-wider">
											Salary
										</p>
										<p className="text-lg font-black text-gray-900">
											$80k - $120k
										</p>
									</div>
								</div>
								<div className="flex items-center gap-4">
									<div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
										<Clock className="text-primary" />
									</div>
									<div>
										<p className="text-sm text-gray-400 font-bold uppercase tracking-wider">
											Job Type
										</p>
										<p className="text-lg font-black text-gray-900">
											{job.type || "Full Time"}
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Apply Button Footer */}
				<div className="p-8 lg:p-10 bg-white border-t border-gray-100 mt-auto">
					<button
						onClick={handleApply}
						disabled={isApplying || applied}
						className={`w-full py-6 rounded-2xl text-xl font-black transition-all shadow-xl ${
							applied
								? "bg-green-500 text-white cursor-default"
								: "bg-primary text-white hover:shadow-primary/30 active:scale-[0.98]"
						}`}
					>
						{isApplying
							? "Applying..."
							: applied
								? "Application Sent!"
								: "Apply Now"}
					</button>
					<p className="text-center mt-4 text-gray-400 font-medium">
						{applied
							? "You have successfully applied to this position."
							: "Applications are processed automatically using your profile."}
					</p>
				</div>
			</div>
		</div>
	);
};

export default JobModal;
