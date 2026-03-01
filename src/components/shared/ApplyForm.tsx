"use client";

import { useState } from "react";
import { applicationService } from "@/services/api";

interface ApplyFormProps {
	jobId: string;
	onSuccess: () => void;
}

const ApplyForm = ({ jobId, onSuccess }: ApplyFormProps) => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		resume_link: "",
		cover_note: "",
	});
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setMessage("");

		try {
			await applicationService.submitApplication({
				...formData,
				job_id: jobId,
			});
			setMessage("Application submitted successfully!");
			onSuccess();
		} catch (error) {
			setMessage("Failed to submit application. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="space-y-6 bg-white p-8 rounded-2xl border border-gray-100 shadow-xl shadow-gray-100/50"
		>
			<h3 className="text-2xl font-bold text-gray-900 mb-6">Apply Now</h3>

			<div>
				<label className="block text-sm font-bold text-gray-700 mb-2">
					Full Name
				</label>
				<input
					type="text"
					required
					className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all"
					placeholder="Enter your full name"
					value={formData.name}
					onChange={(e) =>
						setFormData({ ...formData, name: e.target.value })
					}
				/>
			</div>

			<div>
				<label className="block text-sm font-bold text-gray-700 mb-2">
					Email Address
				</label>
				<input
					type="email"
					required
					className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all"
					placeholder="Enter your email"
					value={formData.email}
					onChange={(e) =>
						setFormData({ ...formData, email: e.target.value })
					}
				/>
			</div>

			<div>
				<label className="block text-sm font-bold text-gray-700 mb-2">
					Resume link (URL)
				</label>
				<input
					type="url"
					required
					className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all"
					placeholder="https://example.com/resume.pdf"
					value={formData.resume_link}
					onChange={(e) =>
						setFormData({
							...formData,
							resume_link: e.target.value,
						})
					}
				/>
			</div>

			<div>
				<label className="block text-sm font-bold text-gray-700 mb-2">
					Cover note
				</label>
				<textarea
					required
					rows={4}
					className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all"
					placeholder="Write a brief cover note"
					value={formData.cover_note}
					onChange={(e) =>
						setFormData({ ...formData, cover_note: e.target.value })
					}
				/>
			</div>

			{message && (
				<p
					className={`text-sm font-bold ${message.includes("success") ? "text-green-600" : "text-red-600"}`}
				>
					{message}
				</p>
			)}

			<button
				type="submit"
				disabled={loading}
				className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:shadow-xl hover:shadow-primary/30 transition-all disabled:opacity-50"
			>
				{loading ? "Submitting..." : "Submit Application"}
			</button>
		</form>
	);
};

export default ApplyForm;
