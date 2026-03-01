const API_URL = "http://localhost:5000/api";

export const jobService = {
	getAllJobs: async () => {
		const response = await fetch(`${API_URL}/jobs`);
		return response.json();
	},

	getJobById: async (id: string) => {
		const response = await fetch(`${API_URL}/jobs/${id}`);
		return response.json();
	},

	createJob: async (jobData: any) => {
		const response = await fetch(`${API_URL}/jobs`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(jobData),
		});
		return response.json();
	},

	deleteJob: async (id: string) => {
		const response = await fetch(`${API_URL}/jobs/${id}`, {
			method: "DELETE",
		});
		return response.json();
	},
};

export const applicationService = {
	submitApplication: async (applicationData: any) => {
		const response = await fetch(`${API_URL}/applications`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(applicationData),
		});
		return response.json();
	},
	getApplicationsByJobId: async (jobId: string) => {
		const response = await fetch(`${API_URL}/applications/job/${jobId}`);
		return response.json();
	},
};
