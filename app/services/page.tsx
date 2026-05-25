export default function ServicesPage() {
  // Data array for your 4 specific services
  const services = [
    {
      id: "tv-walls",
      title: "Custom TV Walls",
      description:
        "Transform your living room into a modern entertainment hub. We design, manufacture, and install bespoke TV wall units featuring integrated LED lighting, acoustic panels, and hidden cable management. Every unit is custom-built to match your home's aesthetic.",
      image: "/Website06.jpg",
    },
    {
      id: "kitchen-cabinets",
      title: "Kitchen Cabinets",
      description:
        "Elevate the heart of your home with luxurious, functional cabinetry. Fabricated in our Winnipeg facility using premium MDF Melamine and advanced Electron Beam technology boards, our kitchen cabinets offer unmatched durability, high-end aesthetics, and a flawless contemporary finish.",
      image: "/Website07.jpeg",
    },
    {
      id: "walk-in-closets",
      title: "Walk-In Closets & Wardrobes",
      description:
        "Maximize your storage without compromising on style. We create custom-designed wardrobes and walk-in closets tailored to your specific needs. From 3D visualization to seamless home integration, we handle the entire process to give you the closet of your dreams.",
      image: "/Website08.jpg",
    },
    {
      id: "window-blinds",
      title: "Custom Window Blinds",
      description:
        "Control the light and enhance your privacy with our premium selection of factory-direct window treatments. From modern zebra blinds to complete blackout options, we measure, manufacture, and professionally install blinds tailored exactly to your home's dimensions.",
      image: "/Website09.jpeg",
    },
  ];

  return (
    <main
      className="min-h-screen pt-12 pb-24"
      style={{ backgroundColor: "#F5F5EB" }}
    >
      <div className="max-w-6xl mx-auto px-8 md:px-14">
        {/* Header Section */}
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter mb-6 text-black">
            Our Services
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed">
            From high-end custom cabinetry to premium window treatments, we
            provide end-to-end design, manufacturing, and installation services
            directly from our local facility.
          </p>
        </div>

        {/* 4 Services Grid (Alternating Layout) */}
        <div className="flex flex-col gap-12">
          {services.map((service, index) => (
            <div
              key={service.id}
              // This line handles the alternating left/right layout!
              className={`flex flex-col ${index % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"} bg-white rounded-3xl overflow-hidden shadow-sm`}
            >
              {/* Image Side */}
              <div className="w-full lg:w-1/2 relative min-h-[300px] lg:min-h-[400px]">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover absolute inset-0"
                />
              </div>

              {/* Text Side */}
              <div className="w-full lg:w-1/2 p-10 lg:p-16 flex flex-col justify-center">
                <div
                  className="w-12 h-1 mb-6"
                  style={{ backgroundColor: "#0033CC" }}
                ></div>
                <h2 className="text-3xl font-black tracking-tight mb-4 text-black">
                  {service.title}
                </h2>
                <p className="text-gray-600 leading-relaxed text-lg mb-8">
                  {service.description}
                </p>
                
                <a 
                  href="/contact" 
                  // We moved the colors directly into Tailwind classes here!
                  className="self-start font-bold transition-colors flex items-center gap-2 text-[#0033CC] hover:text-[#1a4fd6]"
                >
                  Request a Quote
                  <span className="text-xl">→</span>
                </a>

              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
