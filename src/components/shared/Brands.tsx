import Image from "next/image";

const Brands = () => {
	const brands = [
		{ name: "Vodafone", logo: "/vodafone.svg" },
		{ name: "Intel", logo: "/intel.svg" },
		{ name: "Tesla", logo: "/tesla.svg" },
		{ name: "AMD", logo: "/amd.svg" },
		{ name: "Talkit", logo: "/talkit.svg" },
	];

	return (
		<section className="py-20 border-b border-gray-50">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<p className="text-gray-400 text-center mb-10 text-sm font-medium uppercase tracking-widest">
					Companies we helped grow
				</p>
				<div className="flex flex-wrap justify-center items-center gap-12 lg:gap-24 opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
					{brands.map((brand) => (
						<div key={brand.name} className="relative w-32 h-12">
							<Image
								src={brand.logo}
								alt={brand.name}
								fill
								className="object-contain"
							/>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Brands;
