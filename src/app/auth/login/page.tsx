"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { authService } from "@/services/api";
import { Eye, EyeOff } from "lucide-react";

export default function UserLoginPage() {
	const [email, setEmail] = useState("admin@quickhire.com");
	const [password, setPassword] = useState("admin123");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const router = useRouter();

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError("");
		try {
			const data = await authService.login({ email, password });
			if (data.access_token) {
				localStorage.setItem("token", data.access_token);
				localStorage.setItem("user", JSON.stringify(data.user));
				router.push("/dashboard");
			} else {
				setError(data.message || "Invalid credentials");
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
							width={100}
							height={100}
							className="w-40 h-40"
						/>
					</Link>
					<h1 className="text-3xl font-black text-gray-900 mb-2">
						Welcome Back!
					</h1>
					<p className="text-gray-500 text-base font-medium">
						Login to your account to continue
					</p>
				</div>

				{error && (
					<div className="mb-6 p-4 bg-red-50 text-red-600 rounded-2xl text-sm font-bold border border-red-100 flex items-center gap-3">
						<span className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
							⚠️
						</span>
						{error}
					</div>
				)}

				<form onSubmit={handleLogin} className="space-y-6">
					<div>
						<label className="block text-sm font-bold text-gray-700 mb-2 ml-1">
							Email Address
						</label>
						<input
							type="email"
							required
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-primary focus:bg-white focus:outline-none transition-all placeholder:text-gray-300 font-medium"
							placeholder="e.g. name@company.com"
						/>
					</div>
					<div className="relative">
						<label className="block text-sm font-bold text-gray-700 mb-2 ml-1">
							Password
						</label>
						<div className="relative">
							<input
								type={showPassword ? "text" : "password"}
								required
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-primary focus:bg-white focus:outline-none transition-all placeholder:text-gray-300 font-medium"
								placeholder="••••••••"
							/>
							<button
								type="button"
								onClick={() => setShowPassword(!showPassword)}
								className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-primary transition-colors"
							>
								{showPassword ? (
									<EyeOff size={20} />
								) : (
									<Eye size={20} />
								)}
							</button>
						</div>
					</div>

					<button
						type="submit"
						disabled={loading}
						className="w-full bg-primary text-white font-black py-4 rounded-2xl hover:shadow-2xl hover:shadow-primary/30 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
					>
						{loading ? "Signing in..." : "Sign In"}
					</button>
				</form>

				<div className="mt-10 text-center">
					<p className="text-gray-500 font-medium">
						Don't have an account?{" "}
						<Link
							href="/auth/register"
							className="text-primary font-black hover:underline"
						>
							Register Now
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
}
