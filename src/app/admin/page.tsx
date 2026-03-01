"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { jobService, applicationService, STATIC_URL } from "@/services/api";

export default function AdminDashboard() {
	const [jobs, setJobs] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);
	const [selectedJob, setSelectedJob] = useState<any>(null);
	const [applications, setApplications] = useState<any[]>([]);
	const [appsLoading, setAppsLoading] = useState(false);
	const [activeTab, setActiveTab] = useState("jobs");
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const router = useRouter();

	useEffect(() => {
		const token = localStorage.getItem("token");
		const user = JSON.parse(localStorage.getItem("user") || "{}");
		if (!token || user.role !== "ADMIN") {
			router.push("/admin/login");
			return;
		}
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
		if (selectedFile) {
			formData.set("logo", selectedFile);
		}

		try {
			await jobService.createJob(formData);
			(e.target as HTMLFormElement).reset();
			setSelectedFile(null);
			fetchJobs();
			alert("Job posted successfully!");
		} catch (error) {
			console.error("Failed to post job:", error);
			alert("Failed to post job");
		}
	};

	const handleLogout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("user");
		router.push("/admin/login");
	};

	if (loading) return null;

	return (
		<div className="flex min-h-screen bg-[#F8F9FF]">
			{/* Sidebar */}
			<aside className="w-64 bg-[#18191C] text-white hidden lg:flex flex-col fixed inset-y-0 left-0 z-50">
				<div className="p-8 border-b border-white/5">
					<Link href="/" className="flex items-center gap-2">
						<Image
							src="/logo-white.svg"
							alt="QuickHire"
							width={200}
							height={200}
						/>
					</Link>
				</div>
				<nav className="flex-1 p-6 space-y-2">
					<button
						onClick={() => setActiveTab("jobs")}
						className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === "jobs" ? "bg-primary text-white" : "text-gray-400 hover:text-white hover:bg-white/5"}`}
					>
						<span>💼</span> Jobs Management
					</button>
					<button
						onClick={() => setActiveTab("new-job")}
						className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === "new-job" ? "bg-primary text-white" : "text-gray-400 hover:text-white hover:bg-white/5"}`}
					>
						<span>📝</span> Post New Job
					</button>
				</nav>
				<div className="p-6 mt-auto border-t border-white/5">
					<button
						onClick={handleLogout}
						className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-400/5 transition-all"
					>
						<span>🚪</span> Sign Out
					</button>
				</div>
			</aside>

			{/* Main Content */}
			<main className="flex-1 lg:ml-64 p-8 pt-12 lg:p-12">
				<div className="max-w-6xl mx-auto">
					{/* Header */}
					<div className="flex justify-between items-center mb-12">
						<div>
							<h1 className="text-3xl font-black text-gray-900 capitalize">
								{activeTab.replace("-", " ")}
							</h1>
							<p className="text-gray-500 font-medium mt-1">
								Manage your platform effectively
							</p>
						</div>
						<div className="lg:hidden">
							<button
								onClick={handleLogout}
								className="text-red-500 font-bold"
							>
								Logout
							</button>
						</div>
					</div>

					{/* Dashboard Content */}
					{activeTab === "jobs" && (
						<div className="space-y-12">
							{/* Stats Cards */}
							<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
								<div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/20">
									<div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-2xl mb-4">
										💼
									</div>
									<div className="text-3xl font-black text-gray-900">
										{jobs.length}
									</div>
									<div className="text-gray-400 font-bold uppercase text-xs tracking-widest mt-1">
										Total Jobs
									</div>
								</div>
								<div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/20">
									<div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-2xl mb-4">
										👥
									</div>
									<div className="text-3xl font-black text-gray-900">
										{Array.isArray(jobs)
											? jobs.reduce(
													(acc, job) =>
														acc +
														(job.applications
															?.length || 0),
													0,
												)
											: 0}
									</div>
									<div className="text-gray-400 font-bold uppercase text-xs tracking-widest mt-1">
										Total Applications
									</div>
								</div>
								<button
									onClick={() => setActiveTab("new-job")}
									className="bg-primary p-6 rounded-3xl border border-primary shadow-xl shadow-primary/20 flex flex-col items-center justify-center text-white hover:bg-primary/90 transition-all"
								>
									<span className="text-4xl mb-2">+</span>
									<span className="font-black">
										Post a Job
									</span>
								</button>
							</div>

							<div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
								{/* Listings */}
								<div className="bg-white p-8 rounded-4xl border border-gray-100 shadow-2xl shadow-gray-200/30">
									<h2 className="text-xl font-black text-gray-900 mb-8 flex items-center justify-between">
										Active Listings
										<span className="text-sm font-bold text-primary px-3 py-1 bg-primary/5 rounded-full">
											{jobs.length} total
										</span>
									</h2>
									<div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
										{Array.isArray(jobs) ? (
											jobs.map((job) => (
												<div
													key={job.id}
													className={`p-5 rounded-2xl border transition-all ${selectedJob?.id === job.id ? "border-primary bg-primary/5" : "border-gray-50 hover:border-primary/20 hover:bg-gray-50"}`}
												>
													<div className="flex justify-between items-start gap-4">
														<div className="flex items-center gap-4">
															<div className="w-12 h-12 bg-white rounded-xl border border-gray-100 flex items-center justify-center overflow-hidden shrink-0 shadow-sm">
																{job.logo ? (
																	<img
																		src={`${STATIC_URL}/${job.logo}`}
																		alt=""
																		className="w-full h-full object-contain"
																	/>
																) : (
																	<span className="text-lg">
																		🏢
																	</span>
																)}
															</div>
															<div>
																<h3 className="font-black text-gray-900 leading-tight">
																	{job.title}
																</h3>
																<p className="text-sm text-gray-400 font-bold">
																	{
																		job.company
																	}{" "}
																	•{" "}
																	{
																		job.location
																	}
																</p>
															</div>
														</div>
														<div className="flex gap-1 shrink-0">
															<button
																onClick={() => {
																	setSelectedJob(
																		job,
																	);
																	fetchApplications(
																		job.id,
																	);
																}}
																className="p-2 hover:bg-white rounded-lg transition-colors text-primary font-black"
															>
																View
															</button>
															<button
																onClick={() =>
																	handleDelete(
																		job.id,
																	)
																}
																className="p-2 hover:bg-white rounded-lg transition-colors text-red-500 font-black"
															>
																Delete
															</button>
														</div>
													</div>
												</div>
											))
										) : (
											<div className="py-12 text-center text-gray-400 font-medium">
												No jobs found
											</div>
										)}
									</div>
								</div>

								{/* Applications Side Panel */}
								<div className="bg-white p-8 rounded-4xl border border-gray-100 shadow-2xl shadow-gray-200/30 min-h-[500px]">
									{selectedJob ? (
										<div>
											<div className="flex justify-between items-center mb-8">
												<h2 className="text-xl font-black text-gray-900 leading-tight">
													Applications for{" "}
													<span className="text-primary block sm:inline">
														{selectedJob.title}
													</span>
												</h2>
												<button
													onClick={() =>
														setSelectedJob(null)
													}
													className="text-gray-400 hover:text-gray-900 font-bold"
												>
													×
												</button>
											</div>
											<div className="space-y-4">
												{appsLoading ? (
													<p className="text-center py-12 text-gray-400">
														Loading...
													</p>
												) : applications.length ===
												  0 ? (
													<div className="text-center py-12">
														<p className="text-gray-400 font-medium">
															No applications
															found yet.
														</p>
													</div>
												) : (
													applications.map((app) => (
														<div
															key={app.id}
															className="p-5 bg-gray-50 rounded-2xl border border-gray-100/50"
														>
															<div className="flex justify-between items-start mb-3">
																<div>
																	<h4 className="font-black text-gray-900">
																		{
																			app.name
																		}
																	</h4>
																	<p className="text-xs text-gray-400 font-bold">
																		{
																			app.email
																		}
																	</p>
																</div>
																<a
																	href={
																		app.resume_link
																	}
																	target="_blank"
																	className="text-xs font-black text-primary px-3 py-1 bg-white rounded-lg shadow-sm"
																>
																	Resume
																</a>
															</div>
															<p className="text-sm text-gray-500 italic">
																"
																{app.cover_note}
																"
															</p>
														</div>
													))
												)}
											</div>
										</div>
									) : (
										<div className="h-full flex flex-col items-center justify-center text-center p-8">
											<div className="w-20 h-20 bg-[#F8F9FF] rounded-full flex items-center justify-center text-3xl mb-4">
												👀
											</div>
											<h3 className="text-lg font-black text-gray-900 mb-1">
												Select a Job Listing
											</h3>
											<p className="text-gray-400 font-medium max-w-[200px]">
												Choose a job to view its
												candidates
											</p>
										</div>
									)}
								</div>
							</div>
						</div>
					)}

					{activeTab === "new-job" && (
						<div className="bg-white p-10 lg:p-12 rounded-4xl border border-gray-100 shadow-2xl shadow-gray-200/30">
							<form
								onSubmit={handleSubmit}
								className="space-y-8 max-w-2xl mx-auto"
							>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
									<div className="space-y-2">
										<label className="text-sm font-black text-gray-700 ml-1">
											Job Title
										</label>
										<input
											name="title"
											required
											className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-primary focus:bg-white focus:outline-none transition-all font-medium"
											placeholder="Senior Product Designer"
										/>
									</div>
									<div className="space-y-2">
										<label className="text-sm font-black text-gray-700 ml-1">
											Company Name
										</label>
										<input
											name="company"
											required
											className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-primary focus:bg-white focus:outline-none transition-all font-medium"
											placeholder="QuickHire Inc."
										/>
									</div>
								</div>

								<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
									<div className="space-y-2">
										<label className="text-sm font-black text-gray-700 ml-1">
											Location
										</label>
										<input
											name="location"
											required
											className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-primary focus:bg-white focus:outline-none transition-all font-medium"
											placeholder="Remote, Global"
										/>
									</div>
									<div className="space-y-2">
										<label className="text-sm font-black text-gray-700 ml-1">
											Category
										</label>
										<select
											name="category"
											required
											className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-primary focus:bg-white focus:outline-none transition-all font-medium appearance-none"
										>
											<option value="Technology">
												Technology
											</option>
											<option value="Design">
												Design
											</option>
											<option value="Marketing">
												Marketing
											</option>
											<option value="Sales">Sales</option>
											<option value="Finance">
												Finance
											</option>
											<option value="Human Resource">
												Human Resource
											</option>
										</select>
									</div>
								</div>

								<div className="space-y-2">
									<label className="text-sm font-black text-gray-700 ml-1">
										Company Logo
									</label>
									<div className="flex items-center gap-6 p-4 bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl">
										<div className="w-16 h-16 bg-white rounded-xl border border-gray-100 flex items-center justify-center overflow-hidden shrink-0 shadow-sm relative group cursor-pointer">
											{selectedFile ? (
												<img
													src={URL.createObjectURL(
														selectedFile,
													)}
													alt=""
													className="w-full h-full object-contain"
												/>
											) : (
												<span className="text-2xl">
													📷
												</span>
											)}
											<input
												type="file"
												accept="image/*"
												onChange={(e) =>
													setSelectedFile(
														e.target.files?.[0] ||
															null,
													)
												}
												className="absolute inset-0 opacity-0 cursor-pointer"
											/>
										</div>
										<div>
											<p className="text-sm font-black text-gray-900">
												{selectedFile
													? selectedFile.name
													: "Choose Company Logo"}
											</p>
											<p className="text-xs text-gray-400 font-bold uppercase tracking-wider mt-0.5">
												PNG, JPG, SVG up to 5MB
											</p>
										</div>
									</div>
								</div>

								<div className="space-y-2">
									<label className="text-sm font-black text-gray-700 ml-1">
										Job Description
									</label>
									<textarea
										name="description"
										required
										rows={6}
										className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-primary focus:bg-white focus:outline-none transition-all font-medium"
										placeholder="Write the full job description here..."
									></textarea>
								</div>

								<button
									type="submit"
									className="w-full bg-primary text-white font-black py-5 rounded-2xl hover:shadow-2xl hover:shadow-primary/30 transition-all active:scale-[0.98] text-lg"
								>
									Launch Job Listing
								</button>
							</form>
						</div>
					)}
				</div>
			</main>
		</div>
	);
}
