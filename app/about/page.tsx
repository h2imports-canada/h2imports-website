export default function AboutPage() {
  const projects = [

    { src: "/Website01.JPG", type: "image", alt: "Kitchen Cabinetry" },
    { src: "/Website02.jpg", type: "image", alt: "Custom Wardrobe" },
    { src: "/Website04.jpeg", type: "image", alt: "Manufacturing Process" },
    { src: "/Website05.jpeg", type: "image", alt: "Completed Installation" },
    { src: "/Website11.mp4", type: "video", alt: "Project Video" },
    { src: "/Website12.JPG", type: "image", alt: "Custom Project" },
    { src: "/Website13.JPG", type: "image", alt: "Custom Project" },
    { src: "/Website14.JPG", type: "image", alt: "Custom Project" },
    { src: "/Website15.JPG", type: "image", alt: "Custom Project" },
    { src: "/Website16.jpg", type: "image", alt: "Custom Project" },
    { src: "/Website17.jpg", type: "image", alt: "Custom Project" },
    { src: "/Website18.jpg", type: "image", alt: "Custom Project" },
    { src: "/Website19.jpg", type: "image", alt: "Custom Project" },
    { src: "/Website20.jpg", type: "image", alt: "Custom Project" },
    { src: "/Website21.jpg", type: "image", alt: "Custom Project" },
    { src: "/Website22.jpg", type: "image", alt: "Custom Project" },
    // Newly added files below
    { src: "/Website23.jpeg", type: "image", alt: "Custom Project" },
    { src: "/Website24.jpeg", type: "image", alt: "Custom Project" },
    { src: "/Website25.jpeg", type: "image", alt: "Custom Project" },
    { src: "/Website26.jpeg", type: "image", alt: "Custom Project" },
    { src: "/Website27.jpeg", type: "image", alt: "Custom Project" },
    { src: "/Website28.jpeg", type: "image", alt: "Custom Project" },
    { src: "/Website29.jpeg", type: "image", alt: "Custom Project" },
    { src: "/Website30.jpeg", type: "image", alt: "Custom Project" },
    { src: "/Website31.jpeg", type: "image", alt: "Custom Project" },
    { src: "/Website32.jpeg", type: "image", alt: "Custom Project" },
    { src: "/Website33.jpeg", type: "image", alt: "Custom Project" },
    { src: "/Website34.jpeg", type: "image", alt: "Custom Project" },
    { src: "/Website35.jpeg", type: "image", alt: "Custom Project" },
    { src: "/Website36.jpeg", type: "image", alt: "Custom Project" },
    { src: "/Website37.jpeg", type: "image", alt: "Custom Project" },
    { src: "/Website38.jpeg", type: "image", alt: "Custom Project" },
    { src: "/Website39.jpeg", type: "image", alt: "Custom Project" },
    { src: "/Website40.mp4", type: "video", alt: "Project Video" },
    // Added from screenshots
    { src: "/Website45.jpeg", type: "image", alt: "Custom Project" },
    { src: "/Website46.jpeg", type: "image", alt: "Custom Project" },
    { src: "/Website47.jpeg", type: "image", alt: "Custom Project" },
    { src: "/Website48.jpeg", type: "image", alt: "Custom Project" },
    { src: "/Website49.jpeg", type: "image", alt: "Custom Project" },
    { src: "/Website50.jpeg", type: "image", alt: "Custom Project" },
    { src: "/Website51.jpeg", type: "image", alt: "Custom Project" },
    { src: "/Website52.jpeg", type: "image", alt: "Custom Project" },
    { src: "/Website53.jpeg", type: "image", alt: "Custom Project" },
    { src: "/Website54.jpeg", type: "image", alt: "Custom Project" },
    { src: "/Website55.jpeg", type: "image", alt: "Custom Project" },
    { src: "/Website56.jpeg", type: "image", alt: "Custom Project" },
    { src: "/Website57.jpeg", type: "image", alt: "Custom Project" },
    { src: "/Website58.jpeg", type: "image", alt: "Custom Project" },
    { src: "/Website59.jpeg", type: "image", alt: "Custom Project" },

    { src: "/Website64.mp4", type: "video", alt: "Project Video" },
  ];

  return (
    <main className="min-h-screen pt-12 pb-24 bg-white text-black">
      {/* 1. ABOUT US TEXT SECTION */}
      <section className="w-full py-12 px-8 md:px-14">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-8">
            About Us
          </h1>
          <p className="text-gray-600 leading-relaxed mb-6 text-lg text-left md:text-center">
            Operating out of our local Winnipeg factory, H2 Imports and Blinds
            specializes in high-end cabinetry, modern window treatments, and
            custom home renovations. We pride ourselves on being a true
            end-to-end provider.
          </p>
          <p className="text-gray-600 leading-relaxed text-lg text-left md:text-center">
            From our precise measurement technicians and expert 3D designers to
            our dedicated delivery drivers and professional installation crews,
            we manage every single step of your project to guarantee strict
            quality control and a flawless finish.
          </p>
        </div>
      </section>

      {/* 2. OUR PROJECTS GALLERY SECTION */}
      <section className="w-full py-16 px-8 md:px-14 mt-8 bg-[#F5F5EB] rounded-t-[2.5rem]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-12 text-center">
            Our Projects
          </h2>

          {/* Adaptive Masonry Layout: Uses CSS columns instead of CSS Grid! */}
          <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 md:gap-6">
            {projects.map((project, index) => (
              <div
                key={index}
                // We added 'break-inside-avoid' so images don't get split across columns
                // We added 'mb-4 md:mb-6' to create vertical spacing between items
                className="rounded-2xl overflow-hidden shadow-sm relative group bg-black break-inside-avoid mb-4 md:mb-6 w-full"
              >
                {project.type === "video" ? (
                  <video
                    src={project.src}
                    autoPlay
                    loop
                    muted
                    playsInline
                    // Changed to h-auto so the video dictates its own natural height
                    className="w-full h-auto block transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <img
                    src={project.src}
                    alt={project.alt}
                    // Changed to h-auto so the image dictates its own natural height
                    className="w-full h-auto block transition-transform duration-500 group-hover:scale-105"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
