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
	const [step, setStep] = useState<"details" | "form">("details");
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [isApplying, setIsApplying] = useState(false);
	const [applied, setApplied] = useState(false);

	// Form states
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		resume: "",
		coverNote: "",
	});
	const [errors, setErrors] = useState<any>({});

	const router = useRouter();

	useEffect(() => {
		const token = localStorage.getItem("access_token");
		const storedUser = localStorage.getItem("user");
		setIsLoggedIn(!!token);
		if (storedUser) {
			const parsedUser = JSON.parse(storedUser);
			setFormData((prev) => ({
				...prev,
				name: parsedUser.name || "",
				email: parsedUser.email || "",
			}));
		}
	}, []);

	const handleApplyClick = () => {
		if (!isLoggedIn) {
			router.push("/auth/login");
			return;
		}
		setStep("form");
	};

	const validateForm = () => {
		const newErrors: any = {};
		if (!formData.name) newErrors.name = "Name is required";
		if (!formData.email) newErrors.email = "Email is required";
		if (!formData.resume) {
			newErrors.resume = "Resume link is required";
		} else if (!/^https?:\/\/.+/.test(formData.resume)) {
			newErrors.resume =
				"Please enter a valid URL (starting with http:// or https://)";
		}
		if (!formData.coverNote) newErrors.coverNote = "Cover note is required";

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!validateForm()) return;

		setIsApplying(true);
		try {
			const applicationPayload = {
				name: formData.name,
				email: formData.email,
				resume_link: formData.resume,
				cover_note: formData.coverNote,
			};
			await applicationService.applyWithProfile(
				job.id,
				applicationPayload,
			);
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
				className="bg-white rounded-3xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col relative shadow-2xl animate-in zoom-in-95 duration-200"
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
					{step === "details" && !applied ? (
						<>
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

							{/* Apply Button Footer (Details Step) */}
							<div className="mt-12 pt-10 border-t border-gray-100">
								<button
									onClick={handleApplyClick}
									className="w-full py-6 rounded-2xl bg-primary text-white text-xl font-black transition-all shadow-xl hover:shadow-primary/30 active:scale-[0.98]"
								>
									Apply Now
								</button>
								<p className="text-center mt-4 text-gray-400 font-medium">
									Applications are processed automatically
									using your profile.
								</p>
							</div>
						</>
					) : step === "form" && !applied ? (
						<div className="max-w-3xl mx-auto">
							<h2 className="text-3xl lg:text-4xl font-black text-gray-900 mb-2">
								Apply for {job.title}
							</h2>
							<p className="text-gray-500 text-lg mb-10">
								Please fill in the details below to complete
								your application.
							</p>

							<form onSubmit={handleSubmit} className="space-y-8">
								<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
									<div className="space-y-2">
										<label className="text-sm font-bold text-gray-400 uppercase tracking-wider">
											Full Name
										</label>
										<input
											type="text"
											className={`w-full p-5 bg-[#F8F9FF] border ${errors.name ? "border-red-500" : "border-gray-100"} rounded-2xl focus:outline-none focus:border-primary/50 transition-all text-lg font-medium`}
											value={formData.name}
											onChange={(e) =>
												setFormData({
													...formData,
													name: e.target.value,
												})
											}
											placeholder="Your full name"
										/>
										{errors.name && (
											<p className="text-red-500 text-sm font-bold">
												{errors.name}
											</p>
										)}
									</div>
									<div className="space-y-2">
										<label className="text-sm font-bold text-gray-400 uppercase tracking-wider">
											Email Address
										</label>
										<input
											type="email"
											className={`w-full p-5 bg-[#F8F9FF] border ${errors.email ? "border-red-500" : "border-gray-100"} rounded-2xl focus:outline-none focus:border-primary/50 transition-all text-lg font-medium`}
											value={formData.email}
											onChange={(e) =>
												setFormData({
													...formData,
													email: e.target.value,
												})
											}
											placeholder="Your email address"
										/>
										{errors.email && (
											<p className="text-red-500 text-sm font-bold">
												{errors.email}
											</p>
										)}
									</div>
								</div>

								<div className="space-y-2">
									<label className="text-sm font-bold text-gray-400 uppercase tracking-wider">
										Resume Link (URL)
									</label>
									<input
										type="text"
										className={`w-full p-5 bg-[#F8F9FF] border ${errors.resume ? "border-red-500" : "border-gray-100"} rounded-2xl focus:outline-none focus:border-primary/50 transition-all text-lg font-medium`}
										value={formData.resume}
										onChange={(e) =>
											setFormData({
												...formData,
												resume: e.target.value,
											})
										}
										placeholder="https://your-resume-url.com"
									/>
									{errors.resume && (
										<p className="text-red-500 text-sm font-bold">
											{errors.resume}
										</p>
									)}
								</div>

								<div className="space-y-2">
									<label className="text-sm font-bold text-gray-400 uppercase tracking-wider">
										Cover Note
									</label>
									<textarea
										rows={5}
										className={`w-full p-5 bg-[#F8F9FF] border ${errors.coverNote ? "border-red-500" : "border-gray-100"} rounded-2xl focus:outline-none focus:border-primary/50 transition-all text-lg font-medium resize-none`}
										value={formData.coverNote}
										onChange={(e) =>
											setFormData({
												...formData,
												coverNote: e.target.value,
											})
										}
										placeholder="Write a brief cover note about why you're a good fit..."
									/>
									{errors.coverNote && (
										<p className="text-red-500 text-sm font-bold">
											{errors.coverNote}
										</p>
									)}
								</div>

								<div className="pt-6">
									<button
										type="submit"
										disabled={isApplying}
										className="w-full py-6 rounded-2xl bg-primary text-white text-xl font-black transition-all shadow-xl hover:shadow-primary/30 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
									>
										{isApplying
											? "Submitting Application..."
											: "Submit Application"}
									</button>
									<button
										type="button"
										onClick={() => setStep("details")}
										className="w-full mt-4 py-4 text-gray-400 font-bold hover:text-gray-600 transition-colors"
									>
										Back to details
									</button>
								</div>
							</form>
						</div>
					) : (
						<div className="text-center py-20 animate-in zoom-in-95 duration-300">
							<div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8">
								<div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
									<svg
										className="w-8 h-8 text-white"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={3}
											d="M5 13l4 4L19 7"
										/>
									</svg>
								</div>
							</div>
							<h2 className="text-4xl font-black text-gray-900 mb-4">
								Application Sent!
							</h2>
							<p className="text-gray-500 text-xl font-medium max-w-md mx-auto mb-10">
								Your application for{" "}
								<span className="text-primary font-bold">
									{job.title}
								</span>{" "}
								has been submitted successfully.
							</p>
							<button
								onClick={onClose}
								className="px-12 py-5 bg-gray-900 text-white text-lg font-black rounded-2xl hover:shadow-2xl hover:shadow-gray-300 transition-all active:scale-[0.98]"
							>
								Close Modal
							</button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default JobModal;
