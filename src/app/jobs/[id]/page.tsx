"use client";

import { use, useEffect, useState } from "react";
import { jobService } from "@/services/api";
import ApplyForm from "@/components/shared/ApplyForm";
import Link from "next/link";

export default function JobDetails({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = use(params);
	const [job, setJob] = useState<any>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		jobService.getJobById(id).then((data) => {
			setJob(data);
			setLoading(false);
		});
	}, [id]);

	if (loading)
		return (
			<div className="pt-32 pb-20 max-w-7xl mx-auto px-4">Loading...</div>
		);
	if (!job)
		return (
			<div className="pt-32 pb-20 max-w-7xl mx-auto px-4">
				Job not found
			</div>
		);

	return (
		<div className="pt-32 pb-20 bg-[#F8F9FF] min-h-screen">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<Link
					href="/"
					className="inline-flex items-center gap-2 text-gray-500 hover:text-primary mb-8 transition-colors"
				>
					<svg
						width="20"
						height="20"
						viewBox="0 0 20 20"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M15.8333 10H4.16666M4.16666 10L10 15.8333M4.16666 10L10 4.16667"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
					Back to jobs
				</Link>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
					<div className="lg:col-span-2">
						<div className="bg-white p-10 rounded-3xl border border-gray-100 shadow-xl shadow-gray-100/50 mb-8">
							<div className="flex items-center gap-6 mb-8">
								<div className="w-20 h-20 bg-gray-50 rounded-2xl flex items-center justify-center text-4xl">
									{
										[
											"🎨",
											"🏢",
											"💻",
											"📈",
											"📢",
											"💰",
											"👥",
											"⚙️",
											"💼",
										][Math.floor(Math.random() * 9)]
									}
								</div>
								<div>
									<h1 className="text-3xl font-bold text-gray-900 mb-2">
										{job.title}
									</h1>
									<p className="text-gray-500 flex items-center gap-2 font-medium">
										{job.company} • {job.location} •{" "}
										<span className="text-primary">
											{job.category}
										</span>
									</p>
								</div>
							</div>

							<div className="border-t border-gray-50 pt-8">
								<h2 className="text-2xl font-bold text-gray-900 mb-6">
									Description
								</h2>
								<div className="prose prose-blue max-w-none text-gray-500 leading-relaxed whitespace-pre-wrap">
									{job.description}
								</div>
							</div>
						</div>
					</div>

					<div className="lg:col-span-1">
						<div className="sticky top-32">
							<ApplyForm jobId={job.id} onSuccess={() => {}} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
