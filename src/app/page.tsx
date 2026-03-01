"use client";

import { useState, useEffect } from "react";
import Hero from "@/components/layout/Hero";
import Brands from "@/components/shared/Brands";
import Categories from "@/components/shared/Categories";
import CTASection from "@/components/shared/CTASection";
import JobCard from "@/components/shared/JobCard";
import { jobService } from "@/services/api";
import Link from "next/link";

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
			<section className="py-24 bg-white" id="featured-jobs">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between items-end mb-12">
						<h2 className="text-4xl font-bold text-gray-900">
							Featured <span className="text-primary">jobs</span>
						</h2>
						<Link
							href="/jobs"
							className="text-primary font-semibold flex items-center gap-2 hover:gap-3 transition-all"
						>
							Show all jobs
							<svg
								width="20"
								height="20"
								viewBox="0 0 20 20"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M4.16666 10H15.8333M15.8333 10L10 4.16667M15.8333 10L10 15.8333"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
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
			<section className="py-24 bg-[#F8F9FF]">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between items-end mb-12">
						<h2 className="text-4xl font-bold text-gray-900">
							Latest{" "}
							<span className="text-primary">jobs open</span>
						</h2>
						<Link
							href="/jobs"
							className="text-primary font-semibold flex items-center gap-2 hover:gap-3 transition-all"
						>
							Show all jobs
							<svg
								width="20"
								height="20"
								viewBox="0 0 20 20"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M4.16666 10H15.8333M15.8333 10L10 4.16667M15.8333 10L10 15.8333"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						</Link>
					</div>

					{loading ? (
						<div className="text-center py-12 text-gray-400">
							Loading latest jobs...
						</div>
					) : latestJobs.length > 0 ? (
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							{latestJobs.map((job) => (
								<Link
									href={`/jobs/${job.id}`}
									key={job.id}
									className="p-6 bg-white border border-gray-100 rounded-2xl flex items-center justify-between hover:shadow-lg transition-all group cursor-pointer"
								>
									<div className="flex items-center gap-5">
										<div className="w-14 h-14 bg-gray-50 rounded-xl flex items-center justify-center text-3xl group-hover:bg-primary/5 transition-colors">
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
											<h3 className="font-bold text-gray-900 group-hover:text-primary transition-colors text-lg">
												{job.title}
											</h3>
											<p className="text-gray-400 text-sm">
												{job.company} • {job.location}
											</p>
										</div>
									</div>
									<div className="flex gap-2">
										<span className="px-3 py-1 bg-green-50 text-green-600 text-xs font-bold rounded-full">
											Full Time
										</span>
									</div>
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
