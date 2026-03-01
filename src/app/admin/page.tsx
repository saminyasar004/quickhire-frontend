"use client";

import { useEffect, useState } from "react";
import { jobService, applicationService } from "@/services/api";

export default function AdminDashboard() {
	const [jobs, setJobs] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);
	const [selectedJob, setSelectedJob] = useState<any>(null);
	const [applications, setApplications] = useState<any[]>([]);
	const [appsLoading, setAppsLoading] = useState(false);

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

	const fetchApplications = async (jobId: string) => {
		setAppsLoading(true);
		try {
			const data = await applicationService.getApplicationsByJobId(jobId);
			setApplications(data);
		} catch (error) {
			console.error("Failed to fetch applications:", error);
		} finally {
			setAppsLoading(false);
		}
	};

	const handleDelete = async (id: string) => {
		if (confirm("Are you sure you want to delete this job?")) {
			try {
				await jobService.deleteJob(id);
				fetchJobs();
				if (selectedJob && selectedJob.id === id) {
					setSelectedJob(null);
					setApplications([]);
				}
			} catch (error) {
				console.error("Failed to delete job:", error);
			}
		}
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const jobData = Object.fromEntries(formData.entries()) as any;
		try {
			await jobService.createJob(jobData);
			(e.target as HTMLFormElement).reset();
			fetchJobs();
			alert("Job posted successfully!");
		} catch (error) {
			console.error("Failed to post job:", error);
			alert("Failed to post job");
		}
	};

	return (
		<div className="pt-32 pb-20 bg-[#F8F9FF] min-h-screen">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<h1 className="text-4xl font-bold text-gray-900 mb-12 text-center">
					Admin <span className="text-primary">Dashboard</span>
				</h1>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
					{/* Post Job Form */}
					<div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl shadow-gray-100/50">
						<h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
							<span className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
								📝
							</span>
							Post a New Job
						</h2>
						<form onSubmit={handleSubmit} className="space-y-6">
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
								<div>
									<label className="block text-sm font-bold text-gray-700 mb-2">
										Job Title
									</label>
									<input
										name="title"
										required
										className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-primary focus:bg-white focus:outline-none transition-all"
										placeholder="e.g. Senior Developer"
									/>
								</div>
								<div>
									<label className="block text-sm font-bold text-gray-700 mb-2">
										Company Name
									</label>
									<input
										name="company"
										required
										className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-primary focus:bg-white focus:outline-none transition-all"
										placeholder="e.g. Google"
									/>
								</div>
							</div>

							<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
								<div>
									<label className="block text-sm font-bold text-gray-700 mb-2">
										Location
									</label>
									<input
										name="location"
										required
										className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-primary focus:bg-white focus:outline-none transition-all"
										placeholder="e.g. Remote"
									/>
								</div>
								<div>
									<label className="block text-sm font-bold text-gray-700 mb-2">
										Category
									</label>
									<select
										name="category"
										required
										className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-primary focus:bg-white focus:outline-none transition-all"
									>
										<option value="Technology">
											Technology
										</option>
										<option value="Design">Design</option>
										<option value="Marketing">
											Marketing
										</option>
										<option value="Sales">Sales</option>
										<option value="Finance">Finance</option>
										<option value="Human Resource">
											Human Resource
										</option>
									</select>
								</div>
							</div>

							<div>
								<label className="block text-sm font-bold text-gray-700 mb-2">
									Description
								</label>
								<textarea
									name="description"
									required
									rows={4}
									className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-primary focus:bg-white focus:outline-none transition-all"
									placeholder="Enter full job description..."
								></textarea>
							</div>

							<button
								type="submit"
								className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:shadow-xl hover:shadow-primary/30 transition-all"
							>
								Post Job Opening
							</button>
						</form>
					</div>

					{/* Job List */}
					<div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl shadow-gray-100/50">
						<h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center justify-between">
							<span className="flex items-center gap-3">
								<span className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
									💼
								</span>
								Active Listings
							</span>
							<span className="text-sm font-normal text-gray-400">
								{jobs.length} jobs
							</span>
						</h2>

						<div className="space-y-4 overflow-y-auto max-h-[600px] pr-2 custom-scrollbar">
							{loading ? (
								<p>Loading jobs...</p>
							) : (
								jobs.map((job) => (
									<div
										key={job.id}
										className="p-4 border border-gray-100 rounded-2xl hover:bg-gray-50 transition-all group"
									>
										<div className="flex justify-between items-start mb-2">
											<h3 className="font-bold text-gray-900">
												{job.title}
											</h3>
											<div className="flex gap-2">
												<button
													onClick={() => {
														setSelectedJob(job);
														fetchApplications(
															job.id,
														);
													}}
													className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors"
													title="View Applications"
												>
													👁️
												</button>
												<button
													onClick={() =>
														handleDelete(job.id)
													}
													className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
													title="Delete Job"
												>
													🗑️
												</button>
											</div>
										</div>
										<p className="text-sm text-gray-500">
											{job.company} • {job.location}
										</p>
									</div>
								))
							)}
						</div>
					</div>
				</div>

				{/* Applications List */}
				{selectedJob && (
					<div className="mt-12 bg-white p-8 rounded-3xl border border-gray-100 shadow-xl shadow-gray-100/50 animate-in fade-in slide-in-from-bottom-4">
						<div className="flex justify-between items-center mb-8">
							<h2 className="text-2xl font-bold text-gray-900">
								Applications for{" "}
								<span className="text-primary">
									{selectedJob.title}
								</span>
							</h2>
							<button
								onClick={() => setSelectedJob(null)}
								className="text-gray-400 hover:text-gray-900"
							>
								Close
							</button>
						</div>

						<div className="overflow-x-auto">
							{appsLoading ? (
								<p className="text-center py-8">
									Loading applications...
								</p>
							) : applications.length === 0 ? (
								<p className="text-center py-8 text-gray-400">
									No applications received yet for this job.
								</p>
							) : (
								<table className="w-full text-left">
									<thead>
										<tr className="border-b border-gray-50">
											<th className="pb-4 font-bold text-gray-700">
												Applicant
											</th>
											<th className="pb-4 font-bold text-gray-700">
												Email
											</th>
											<th className="pb-4 font-bold text-gray-700">
												Resume
											</th>
											<th className="pb-4 font-bold text-gray-700">
												Notes
											</th>
										</tr>
									</thead>
									<tbody className="divide-y divide-gray-50">
										{applications.map((app) => (
											<tr key={app.id}>
												<td className="py-4 font-medium">
													{app.name}
												</td>
												<td className="py-4 text-gray-500">
													{app.email}
												</td>
												<td className="py-4">
													<a
														href={app.resume_link}
														target="_blank"
														rel="noopener noreferrer"
														className="text-primary hover:underline"
													>
														View Resume
													</a>
												</td>
												<td className="py-4 text-gray-500 max-w-xs truncate">
													{app.cover_note}
												</td>
											</tr>
										))}
									</tbody>
								</table>
							)}
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
