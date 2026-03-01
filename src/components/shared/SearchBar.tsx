"use client";

import { useState } from "react";
import { Search, MapPin, ChevronDown } from "lucide-react";

interface SearchBarProps {
	onSearch: (query: string, location: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
	const [query, setQuery] = useState("");
	const [location, setLocation] = useState("Florence, Italy");

	const handleSearch = () => {
		onSearch(query, location);
		const element = document.getElementById("featured-jobs");
		if (element) {
			element.scrollIntoView({ behavior: "smooth" });
		}
	};

	return (
		<div className="bg-white p-4 lg:p-2 rounded-xl lg:rounded-lg shadow-2xl shadow-blue-500/10 flex flex-col lg:flex-row items-center gap-4 lg:gap-2 border border-gray-100 mb-6 w-full lg:w-[900px] lg:absolute lg:left-0">
			<div className="flex items-center gap-4 w-full lg:flex-[1.2] px-4 py-3 min-w-0 border-b lg:border-b-0 border-gray-50 lg:border-none">
				<Search className="text-[#4640DE] shrink-0" size={24} />
				<input
					type="text"
					placeholder="Job title or keyword"
					className="w-full focus:outline-none text-gray-700 bg-transparent placeholder:text-gray-400 text-lg"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					onKeyDown={(e) => e.key === "Enter" && handleSearch()}
				/>
			</div>

			<div className="hidden lg:block w-px h-10 bg-gray-100" />

			<div className="flex items-center gap-4 w-full lg:flex-1 px-4 py-3 min-w-0 relative group cursor-pointer border-b lg:border-b-0 border-gray-50 lg:border-none">
				<MapPin className="text-[#4640DE] shrink-0" size={24} />
				<input
					type="text"
					placeholder="Location"
					className="w-full focus:outline-none text-gray-700 bg-transparent placeholder:text-gray-400 text-lg cursor-pointer"
					value={location}
					readOnly
				/>
				<ChevronDown
					className="text-[#4640DE] shrink-0 ml-auto"
					size={20}
				/>
			</div>

			<button
				onClick={handleSearch}
				className="bg-[#4640DE] text-white font-black px-10 py-5 lg:py-4 rounded-lg hover:bg-[#4640DE]/90 transition-all w-full lg:w-auto text-xl lg:text-lg whitespace-nowrap"
			>
				Search my job
			</button>
		</div>
	);
};

export default SearchBar;
