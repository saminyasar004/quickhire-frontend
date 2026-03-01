"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { applicationService } from "@/services/api";

export default function UserDashboard() {
	const [applications, setApplications] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);
	const [user, setUser] = useState<any>(null);
	const router = useRouter();

	useEffect(() => {
		const token = localStorage.getItem("token");
		const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
		if (!token) {
			router.push("/auth/login");
			return;
		}
		setUser(storedUser);
		fetchApplications();
	}, []);

	const fetchApplications = async () => {
		try {
			const data = await applicationService.getMyApplications();
			setApplications(data);
		} catch (error) {
			console.error("Failed to fetch applications:", error);
		} finally {
			setLoading(false);
		}
	};

	const handleLogout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("user");
		router.push("/auth/login");
	};

	if (loading) return null;

	return (
		<div className="min-h-screen bg-[#F8F9FF] pt-32 pb-20">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Header Section */}
				<div className="bg-[#18191C] rounded-4xl p-8 lg:p-12 mb-12 relative overflow-hidden shadow-2xl shadow-primary/10">
					<div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
						<div>
							<h1 className="text-3xl lg:text-4xl font-black text-white mb-2">
								Hi,{" "}
								<span className="text-primary">
									{user?.name || "Candidate"}
								</span>
								!
							</h1>
							<p className="text-gray-400 font-medium">
								Ready to take the next step in your career?
								Track your applications here.
							</p>
						</div>
						<div className="flex gap-4">
							<Link
								href="/jobs"
								className="bg-primary text-white font-black px-8 py-4 rounded-2xl hover:shadow-2xl hover:shadow-primary/30 transition-all active:scale-[0.98]"
							>
								Find More Jobs
							</Link>
							<button
								onClick={handleLogout}
								className="bg-white/5 text-white font-black px-6 py-4 rounded-2xl border border-white/10 hover:bg-white/10 transition-all"
							>
								Logout
							</button>
						</div>
					</div>
					{/* Decorative Shape */}
					<div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[120px] rounded-full -mr-20 -mt-20 shrink-0"></div>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
					{/* Profile Summary */}
					<div className="lg:col-span-1 space-y-8">
						<div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-xl shadow-gray-200/20">
							<h2 className="text-xl font-black text-gray-900 mb-6">
								Profile Summary
							</h2>
							<div className="space-y-4">
								<div className="flex justify-between items-center py-3 border-b border-gray-50">
									<span className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">
										Email
									</span>
									<span className="text-gray-900 font-bold text-sm">
										{user?.email}
									</span>
								</div>
								<div className="flex justify-between items-center py-3 border-b border-gray-50">
									<span className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">
										Total Applied
									</span>
									<span className="text-primary font-black text-sm">
										{applications.length} Jobs
									</span>
								</div>
								<div className="flex justify-between items-center py-3">
									<span className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">
										Role
									</span>
									<span className="bg-green-50 text-green-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
										{user?.role}
									</span>
								</div>
							</div>
						</div>
					</div>

					{/* Application History */}
					<div className="lg:col-span-2">
						<div className="bg-white p-8 lg:p-10 rounded-4xl border border-gray-100 shadow-xl shadow-gray-200/20 min-h-[500px]">
							<h2 className="text-2xl font-black text-gray-900 mb-8">
								Application History
							</h2>
							<div className="space-y-6">
								{applications.length === 0 ? (
									<div className="text-center py-20">
										<p className="text-gray-400 font-medium text-lg">
											You haven't applied for any jobs
											yet.
										</p>
										<Link
											href="/jobs"
											className="text-primary font-black mt-4 inline-block hover:underline italic"
										>
											Start exploring now →
										</Link>
									</div>
								) : (
									applications.map((app) => (
										<div
											key={app.id}
											className="group p-6 rounded-3xl border border-gray-50 hover:border-primary/20 hover:bg-gray-50/50 transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
										>
											<div className="flex items-center gap-6">
												<div className="w-16 h-16 bg-white rounded-2xl border border-gray-100 flex items-center justify-center text-3xl shadow-sm overflow-hidden shrink-0">
													{app.job?.logo ? (
														<img
															src={`http://localhost:5000/public/uploads/${app.job.logo}`}
															alt=""
															className="w-full h-full object-contain"
														/>
													) : (
														"🏢"
													)}
												</div>
												<div>
													<h3 className="text-lg font-black text-gray-900 leading-tight group-hover:text-primary transition-colors">
														{app.job?.title ||
															"Deleted Job Position"}
													</h3>
													<p className="text-gray-400 font-bold text-sm mt-0.5">
														{app.job?.company ||
															"Unknown Company"}{" "}
														• Viewed on{" "}
														{new Date(
															app.createdAt,
														).toLocaleDateString()}
													</p>
												</div>
											</div>
											<div className="flex items-center gap-4 w-full md:w-auto">
												<span className="bg-primary/5 text-primary text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl border border-primary/10">
													Under Review
												</span>
												<Link
													href={`/jobs/${app.job_id}`}
													className="text-gray-400 hover:text-gray-900 font-bold text-sm px-4"
												>
													Details
												</Link>
											</div>
										</div>
									))
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
