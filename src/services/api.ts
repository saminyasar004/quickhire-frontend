export const STATIC_URL =
	process.env.NEXT_PUBLIC_STATIC_URL || "http://localhost:5000/static";
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const getHeaders = (isMultipart = false) => {
	const token = localStorage.getItem("access_token");
	const headers: any = {};
	if (!isMultipart) {
		headers["Content-Type"] = "application/json";
	}
	if (token) {
		headers["Authorization"] = `Bearer ${token}`;
	}
	return headers;
};

const processedFetch = async (url: string, options: any = {}) => {
	let response = await fetch(url, options);

	if (response.status === 401 && !url.includes("/auth/refresh-token")) {
		const refreshToken = localStorage.getItem("refresh_token");
		if (refreshToken) {
			const refreshResponse = await fetch(
				`${API_URL}/auth/refresh-token`,
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ refresh_token: refreshToken }),
				},
			);

			if (refreshResponse.ok) {
				const data = await refreshResponse.json();
				localStorage.setItem("access_token", data.access_token);
				localStorage.setItem("refresh_token", data.refresh_token);
				localStorage.setItem("user", JSON.stringify(data.user));

				// Retry the original request with new token
				if (!options.headers) options.headers = {};
				const isMultipart = options.body instanceof FormData;
				const updatedHeaders = getHeaders(isMultipart);
				options.headers = { ...options.headers, ...updatedHeaders };

				response = await fetch(url, options);
			} else {
				// Refresh failed, logout
				localStorage.removeItem("access_token");
				localStorage.removeItem("refresh_token");
				localStorage.removeItem("user");
				if (typeof window !== "undefined") {
					window.location.href = "/auth/login";
				}
			}
		}
	}

	return response;
};

export const authService = {
	login: async (credentials: any) => {
		const response = await fetch(`${API_URL}/auth/login`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(credentials),
		});
		const data = await response.json();
		if (data.access_token) {
			localStorage.setItem("access_token", data.access_token);
			localStorage.setItem("refresh_token", data.refresh_token);
			localStorage.setItem("user", JSON.stringify(data.user));
		}
		return data;
	},
	register: async (userData: any) => {
		const response = await fetch(`${API_URL}/auth/register`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(userData),
		});
		const data = await response.json();
		if (data.access_token) {
			localStorage.setItem("access_token", data.access_token);
			localStorage.setItem("refresh_token", data.refresh_token);
			localStorage.setItem("user", JSON.stringify(data.user));
		}
		return data;
	},
};

export const jobService = {
	getAllJobs: async () => {
		const response = await processedFetch(`${API_URL}/jobs`);
		return response.json();
	},

	getJobById: async (id: string) => {
		const response = await processedFetch(`${API_URL}/jobs/${id}`);
		return response.json();
	},

	createJob: async (formData: FormData) => {
		const response = await processedFetch(`${API_URL}/jobs`, {
			method: "POST",
			headers: getHeaders(true),
			body: formData,
		});
		return response.json();
	},

	deleteJob: async (id: string) => {
		const response = await processedFetch(`${API_URL}/jobs/${id}`, {
			method: "DELETE",
			headers: getHeaders(),
		});
		return response.json();
	},
};

export const applicationService = {
	submitApplication: async (applicationData: any) => {
		const response = await processedFetch(`${API_URL}/applications`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(applicationData),
		});
		return response.json();
	},
	getApplicationsByJobId: async (jobId: string) => {
		const response = await processedFetch(
			`${API_URL}/applications/job/${jobId}`,
			{
				headers: getHeaders(),
			},
		);
		return response.json();
	},
	getMyApplications: async () => {
		const response = await processedFetch(
			`${API_URL}/applications/my-applications`,
			{
				headers: getHeaders(),
			},
		);
		return response.json();
	},
	applyWithProfile: async (jobId: string, applicationData: any) => {
		const payload = {
			job_id: jobId,
			...applicationData,
		};

		const response = await processedFetch(`${API_URL}/applications`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(payload),
		});
		return response.json();
	},
};
