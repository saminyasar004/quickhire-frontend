"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { authService } from "@/services/api";

export default function AdminLoginPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const router = useRouter();

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError("");
		try {
			const data = await authService.login({ email, password });
			if (data.access_token && data.user.role === "ADMIN") {
				localStorage.setItem("token", data.access_token);
				localStorage.setItem("user", JSON.stringify(data.user));
				router.push("/admin");
			} else if (data.access_token) {
				setError("You do not have administrative access.");
				localStorage.removeItem("token");
			} else {
				setError(data.message || "Invalid admin credentials");
			}
		} catch (err) {
			setError("Failed to connect to the server");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-[#111111] flex items-center justify-center p-4">
			<div className="w-full max-w-md bg-[#1a1a1a] rounded-4xl border border-white/5 p-8 lg:p-12 shadow-2xl shadow-black/50 animate-in fade-in zoom-in duration-500">
				<div className="text-center mb-10">
					<div className="inline-flex items-center gap-2 mb-8">
						<Image
							src="/logo-white.svg"
							alt="QuickHire"
							width={100}
							height={100}
							className="w-40 h-40"
						/>
					</div>
					<h1 className="text-2xl font-bold text-white mb-2">
						Restricted Access
					</h1>
					<p className="text-gray-500 font-medium">
						Please sign in with your admin account using email:{" "}
						<span className="text-primary">
							admin@quickhire.com
						</span>{" "}
						and password:{" "}
						<span className="text-primary">admin123</span>
					</p>
				</div>

				{error && (
					<div className="mb-6 p-4 bg-red-500/10 text-red-500 rounded-2xl text-sm font-bold border border-red-500/20 flex items-center gap-3">
						<span>⚠️</span>
						{error}
					</div>
				)}

				<form onSubmit={handleLogin} className="space-y-6">
					<div>
						<label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-2 ml-1">
							Admin Email
						</label>
						<input
							type="email"
							required
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="w-full px-6 py-4 bg-white/5 border border-white/5 rounded-2xl focus:ring-2 focus:ring-primary focus:bg-white/10 focus:outline-none transition-all text-white placeholder:text-gray-700 font-medium outline-none"
							placeholder="admin@quickhire.com"
						/>
					</div>
					<div>
						<label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-2 ml-1">
							Password
						</label>
						<input
							type="password"
							required
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className="w-full px-6 py-4 bg-white/5 border border-white/5 rounded-2xl focus:ring-2 focus:ring-primary focus:bg-white/10 focus:outline-none transition-all text-white placeholder:text-gray-700 font-medium outline-none"
							placeholder="••••••••"
						/>
					</div>

					<button
						type="submit"
						disabled={loading}
						className="w-full bg-primary text-white font-black py-4 rounded-2xl hover:shadow-2xl hover:shadow-primary/30 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed mt-4"
					>
						{loading ? "Authenticating..." : "Login to Portal"}
					</button>
				</form>

				<div className="mt-10 text-center">
					<Link
						href="/"
						className="text-gray-500 hover:text-white transition-colors text-sm font-medium"
					>
						← Back to Homepage
					</Link>
				</div>
			</div>
		</div>
	);
}
