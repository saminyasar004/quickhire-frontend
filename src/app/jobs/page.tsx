"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { jobService } from "@/services/api";
import JobCard from "@/components/shared/JobCard";
import JobModal from "@/components/shared/JobModal";
import SearchBar from "@/components/shared/SearchBar";

function JobsList() {
	const searchParams = useSearchParams();
	const [jobs, setJobs] = useState<any[]>([]);
	const [filteredJobs, setFilteredJobs] = useState<any[]>([]);
	const [selectedJob, setSelectedJob] = useState<any>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchJobs = async () => {
			setIsLoading(true);
			try {
				const data = await jobService.getAllJobs();
				setJobs(data);
			} catch (error) {
				console.error("Failed to fetch jobs:", error);
			} finally {
				setIsLoading(false);
			}
		};
		fetchJobs();
	}, []);

	useEffect(() => {
		const query = searchParams.get("query")?.toLowerCase() || "";
		const location = searchParams.get("location")?.toLowerCase() || "";

		const filtered = jobs.filter((job) => {
			const matchesQuery =
				!query ||
				job.title.toLowerCase().includes(query) ||
				job.company.toLowerCase().includes(query) ||
				job.description?.toLowerCase().includes(query);

			const matchesLocation =
				!location || job.location.toLowerCase().includes(location);

			return matchesQuery && matchesLocation;
		});

		setFilteredJobs(filtered);
	}, [searchParams, jobs]);

	return (
		<div className="min-h-screen bg-[#F8F9FF] pt-32 pb-20">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<div className="mb-12">
					<h1 className="text-4xl lg:text-5xl font-black text-[#18191C] mb-4">
						Find your{" "}
						<span className="text-primary">dream job</span>
					</h1>
					<p className="text-gray-500 text-lg font-medium">
						Showing {filteredJobs.length} jobs based on your
						criteria
					</p>
				</div>

				<div className="mb-16 relative h-20">
					<SearchBar onSearch={() => {}} />
				</div>

				{isLoading ? (
					<div className="flex justify-center items-center py-20">
						<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
					</div>
				) : filteredJobs.length > 0 ? (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{filteredJobs.map((job) => (
							<JobCard
								key={job.id}
								job={job}
								onClick={() => setSelectedJob(job)}
							/>
						))}
					</div>
				) : (
					<div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
						<h3 className="text-2xl font-black text-gray-900 mb-2">
							No jobs found
						</h3>
						<p className="text-gray-500">
							Try adjusting your search filters
						</p>
					</div>
				)}
			</div>

			{selectedJob && (
				<JobModal
					job={selectedJob}
					onClose={() => setSelectedJob(null)}
				/>
			)}
		</div>
	);
}

export default function JobsPage() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<JobsList />
		</Suspense>
	);
}
