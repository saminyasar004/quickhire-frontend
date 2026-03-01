"use client";

import { useState, useEffect } from "react";
import Hero from "@/components/layout/Hero";
import Brands from "@/components/shared/Brands";
import Categories from "@/components/shared/Categories";
import CTASection from "@/components/shared/CTASection";
import JobCard from "@/components/shared/JobCard";
import { jobService } from "@/services/api";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
	const [jobs, setJobs] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);
	const [searchQuery, setSearchQuery] = useState("");
	const [locationQuery, setLocationQuery] = useState("");

	useEffect(() => {
		fetchJobs();
	}, []);

	const fetchJobs = async () => {
		try {
			const data = await jobService.getAllJobs();
			setJobs(data);
		} catch (error) {
			console.error("Failed to fetch jobs:", error);
		} finally {
			setLoading(false);
		}
	};

	const filteredJobs = jobs.filter((job) => {
		const matchesSearch =
			job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
			job.category.toLowerCase().includes(searchQuery.toLowerCase());
		const matchesLocation = job.location
			.toLowerCase()
			.includes(locationQuery.toLowerCase());
		return matchesSearch && matchesLocation;
	});

	const featuredJobs = filteredJobs.slice(0, 4);
	const latestJobs = filteredJobs.slice(0, 8);

	return (
		<div className="flex flex-col w-full">
			<Hero
				onSearch={(query: string, loc: string) => {
					setSearchQuery(query);
					setLocationQuery(loc);
				}}
			/>
			<Brands />
			<Categories />
			<CTASection />

			{/* Featured Jobs Section */}
			<section className="py-16 lg:py-24 bg-white" id="featured-jobs">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-10 lg:mb-12 gap-4">
						<h2 className="text-4xl lg:text-[56px] font-black text-[#18191C] leading-[1.1]">
							Featured{" "}
							<span className="text-[#007BFF]">jobs</span>
						</h2>
						<Link
							href="/jobs"
							className="text-[#4640DE] font-bold text-lg flex items-center gap-2 group transition-all"
						>
							Show all jobs
							<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-all" />
						</Link>
					</div>

					{loading ? (
						<div className="text-center py-12 text-gray-400">
							Loading featured jobs...
						</div>
					) : featuredJobs.length > 0 ? (
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
							{featuredJobs.map((job) => (
								<JobCard key={job.id} job={job} />
							))}
						</div>
					) : (
						<div className="text-center py-12 text-gray-400">
							No jobs match your search.
						</div>
					)}
				</div>
			</section>

			{/* Latest Jobs Section - Vertical List */}
			<section className="py-16 lg:py-24 bg-[#F8F9FF]">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-10 lg:mb-12 gap-4">
						<h2 className="text-4xl lg:text-[56px] font-black text-[#18191C] leading-[1.1]">
							Latest{" "}
							<span className="text-[#007BFF]">jobs open</span>
						</h2>
						<Link
							href="/jobs"
							className="text-[#4640DE] font-bold text-lg flex items-center gap-2 group transition-all"
						>
							Show all jobs
							<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-all" />
						</Link>
					</div>

					{loading ? (
						<div className="text-center py-12 text-gray-400">
							Loading latest jobs...
						</div>
					) : latestJobs.length > 0 ? (
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
							{latestJobs.map((job) => (
								<Link
									href={`/jobs/${job.id}`}
									key={job.id}
									className="p-4 lg:p-6 bg-white border border-gray-100 rounded-none flex items-center justify-between hover:shadow-xl transition-all group cursor-pointer"
								>
									<div className="flex items-center gap-4 lg:gap-5">
										<div className="w-12 h-12 lg:w-14 lg:h-14 bg-gray-50 rounded-lg flex items-center justify-center text-2xl lg:text-3xl group-hover:bg-[#4640DE]/5 transition-colors">
											{
												[
													"🎨",
													"💻",
													"📈",
													"📢",
													"💰",
													"👥",
													"⚙️",
													"💼",
												][Math.floor(Math.random() * 8)]
											}
										</div>
										<div>
											<h3 className="font-bold text-gray-900 group-hover:text-[#4640DE] transition-colors text-base lg:text-lg line-clamp-1">
												{job.title}
											</h3>
											<p className="text-gray-400 text-xs lg:text-sm">
												{job.company} • {job.location}
											</p>
											<div className="flex gap-2 mt-2">
												<span className="px-2 lg:px-3 py-0.5 bg-green-50 text-green-600 text-[10px] lg:text-xs font-bold rounded-full">
													Full Time
												</span>
												<span className="px-2 lg:px-3 py-0.5 border border-[#4640DE] text-[#4640DE] text-[10px] lg:text-xs font-bold rounded-full">
													Remote
												</span>
											</div>
										</div>
									</div>
									<ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-[#4640DE] group-hover:translate-x-1 transition-all" />
								</Link>
							))}
						</div>
					) : (
						<div className="text-center py-12 text-gray-400">
							No latest jobs found.
						</div>
					)}
				</div>
			</section>
		</div>
	);
}
