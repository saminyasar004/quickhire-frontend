"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { authService } from "@/services/api";

export default function UserRegisterPage() {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
	});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const router = useRouter();

	const handleRegister = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError("");
		try {
			const data = await authService.register(formData);
			if (data.id) {
				alert("Registration successful! Please login.");
				router.push("/auth/login");
			} else {
				setError(data.message || "Registration failed");
			}
		} catch (err) {
			setError("Failed to connect to the server");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-[#F8F9FF] flex items-center justify-center p-4 pt-24 pb-12">
			<div className="w-full max-w-md bg-white rounded-4xl shadow-2xl shadow-primary/5 p-8 lg:p-12 border border-gray-100 animate-in fade-in zoom-in duration-500">
				<div className="text-center mb-10">
					<Link
						href="/"
						className="inline-flex items-center gap-2 mb-6"
					>
						<Image
							src="/logo.svg"
							alt="QuickHire"
							width={40}
							height={40}
							className="w-10 h-10"
						/>
						<span className="text-2xl font-black text-[#18191C] tracking-tight">
							QuickHire
						</span>
					</Link>
					<h1 className="text-3xl font-black text-gray-900 mb-2">
						Create Account
					</h1>
					<p className="text-gray-500 text-base font-medium">
						Join us to find your dream job
					</p>
				</div>

				{error && (
					<div className="mb-6 p-4 bg-red-50 text-red-600 rounded-2xl text-sm font-bold border border-red-100 flex items-center gap-3">
						<span>⚠️</span> {error}
					</div>
				)}

				<form onSubmit={handleRegister} className="space-y-6">
					<div>
						<label className="block text-sm font-bold text-gray-700 mb-2 ml-1">
							Full Name
						</label>
						<input
							required
							value={formData.name}
							onChange={(e) =>
								setFormData({
									...formData,
									name: e.target.value,
								})
							}
							className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-primary focus:bg-white focus:outline-none transition-all font-medium"
							placeholder="John Doe"
						/>
					</div>
					<div>
						<label className="block text-sm font-bold text-gray-700 mb-2 ml-1">
							Email Address
						</label>
						<input
							type="email"
							required
							value={formData.email}
							onChange={(e) =>
								setFormData({
									...formData,
									email: e.target.value,
								})
							}
							className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-primary focus:bg-white focus:outline-none transition-all font-medium"
							placeholder="name@company.com"
						/>
					</div>
					<div>
						<label className="block text-sm font-bold text-gray-700 mb-2 ml-1">
							Password
						</label>
						<input
							type="password"
							required
							value={formData.password}
							onChange={(e) =>
								setFormData({
									...formData,
									password: e.target.value,
								})
							}
							className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-primary focus:bg-white focus:outline-none transition-all font-medium"
							placeholder="••••••••"
						/>
					</div>

					<button
						type="submit"
						disabled={loading}
						className="w-full bg-primary text-white font-black py-4 rounded-2xl hover:shadow-2xl hover:shadow-primary/30 transition-all active:scale-[0.98] disabled:opacity-50"
					>
						{loading ? "Creating Account..." : "Register Now"}
					</button>
				</form>

				<div className="mt-10 text-center">
					<p className="text-gray-500 font-medium">
						Already have an account?{" "}
						<Link
							href="/auth/login"
							className="text-primary font-black hover:underline"
						>
							Sign In
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
}
