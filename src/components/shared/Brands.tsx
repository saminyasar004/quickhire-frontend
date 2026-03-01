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
		<section className="py-12 lg:py-20 border-b border-gray-50">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<p className="text-gray-400 text-center mb-8 lg:mb-10 text-xs lg:text-sm font-medium uppercase tracking-widest">
					Companies we helped grow
				</p>
				<div className="grid grid-cols-2 sm:grid-cols-3 lg:flex lg:flex-wrap justify-center items-center gap-8 lg:gap-24 opacity-60 lg:opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
					{brands.map((brand) => (
						<div
							key={brand.name}
							className="relative h-8 sm:h-10 lg:w-32 lg:h-12 mx-auto w-full max-w-[120px]"
						>
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
