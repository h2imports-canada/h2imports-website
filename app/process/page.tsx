"use client";

import { useEffect, useRef, useState, ReactNode } from "react";
import Link from "next/link";

// Reusable Scroll Animation Component
function FadeInSection({
  children,
  delay = "0ms",
}: {
  children: ReactNode;
  delay?: string;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 },
    );
    const el = domRef.current;
    if (el) observer.observe(el);
    return () => {
      if (el) observer.unobserve(el);
    };
  }, []);

  return (
    <div
      ref={domRef}
      className={`transition-all duration-1000 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
      style={{ transitionDelay: delay }}
    >
      {children}
    </div>
  );
}

export default function ProcessPage() {
  const steps = [
    {
      num: "01",
      title: "Precision Measurement",
      desc: "Every flawless space begins with millimeter-perfect data. Our sales experts visit your location to conduct professional, comprehensive measurements for your kitchen, wardrobes, TV walls, or window blinds.",
      img: "/Measurement.jpg", // Swap with a photo of a tape measure, blueprint, or empty room
    },
    {
      num: "02",
      title: "MOZAIK™ 3D Design",
      desc: "Your measurements are handed over to our professional architectural designers. Using industry-leading MOZAIK software, we engineer a hyper-accurate 3D model of your custom cabinetry.",
      img: "/Mozaik.jpg", // Swap with a screenshot of your 3D software
    },
    {
      num: "03",
      title: "Review & Refinement",
      desc: "We believe in total transparency. You receive the complete 3D design for review, allowing you to visualize the final product and make adjustments until it perfectly matches your vision.",
      img: "/Client.jpg", // Swap with a photo of a client meeting or a rendering
    },
    {
      num: "04",
      title: "Advanced Manufacturing",
      desc: "Once approved, blueprints hit our factory floor. Each piece is cut with staggering accuracy using advanced CNC machinery. We then apply industrial edge-banding to seal exposed edges, guaranteeing a tight seal that completely locks out moisture and steam.",
      img: "/Factory1.jpg", // Your factory/machine photo!
    },
    {
      num: "05",
      title: "White-Glove Delivery",
      desc: "Your finished components are carefully packaged and transported by our dedicated in-house delivery team, ensuring every single piece arrives at your location in pristine condition.",
      img: "/Delivery.jpg", // Swap with a photo of wrapped cabinets or your van
    },
    {
      num: "06",
      title: "Master Installation",
      desc: "The final step is executed by our veteran installation crew. Highly experienced and detail-oriented, they integrate your new cabinets and closets into your home for a flawless, seamless finish.",
      img: "/Installation.jpg", // Swap with a photo of a finished, installed kitchen
    },
  ];

  return (
    <main
      className="min-h-screen font-sans overflow-hidden"
      style={{ backgroundColor: "#F5F5EB" }}
    >
      {/* HEADER SECTION */}
      <section className="pt-24 pb-16 px-8 md:px-14 max-w-5xl mx-auto text-center">
        <FadeInSection>
          <div className="inline-block px-4 py-1.5 mb-6 text-xs font-black tracking-widest text-[#0033CC] uppercase bg-[#F7FA9A] rounded-full">
            The H2 Standard
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-black mb-6 leading-tight">
            How We Build <br /> Excellence.
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            From the initial blueprint to the final tightening of a hinge, we
            control every aspect of the manufacturing process to guarantee
            uncompromising quality.
          </p>
        </FadeInSection>
      </section>

      {/* TIMELINE SECTION */}
      <section className="py-16 px-8 md:px-14 max-w-6xl mx-auto relative">
        <div className="flex flex-col gap-32 md:gap-40">
          {steps.map((step, index) => {
            const isEven = index % 2 !== 0;

            return (
              <div
                key={step.num}
                className={`relative flex flex-col ${
                  isEven ? "md:flex-row-reverse" : "md:flex-row"
                } items-center gap-10 md:gap-20`}
              >
                {/* MASSIVE BACKGROUND NUMBER */}
                <div
                  className={`absolute top-0 -translate-y-1/4 select-none pointer-events-none z-0 ${
                    isEven ? "md:-right-10" : "md:-left-10"
                  } text-center w-full md:w-auto`}
                >
                  <span
                    className="font-black text-gray-200/60"
                    style={{
                      fontSize: "clamp(10rem, 25vw, 18rem)",
                      lineHeight: 0.8,
                    }}
                  >
                    {step.num}
                  </span>
                </div>

                {/* TEXT CONTENT */}
                <div className="relative z-10 w-full md:w-1/2 flex flex-col justify-center">
                  <FadeInSection>
                    <div className="w-12 h-1 bg-[#0033CC] mb-6"></div>
                    <h2 className="text-3xl md:text-4xl font-black tracking-tight text-black mb-4">
                      {step.title}
                    </h2>
                    <p className="text-lg text-gray-600 leading-relaxed">
                      {step.desc}
                    </p>
                  </FadeInSection>
                </div>

                {/* IMAGE BLOCK */}
                <div className="relative z-10 w-full md:w-1/2 aspect-[4/3] rounded-3xl overflow-hidden shadow-xl">
                  <FadeInSection delay="200ms">
                    <img
                      src={step.img}
                      alt={step.title}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </FadeInSection>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="py-32 px-8 md:px-14 bg-white text-center rounded-t-[3rem] shadow-[0_-20px_60px_rgba(0,0,0,0.05)] mt-20 relative z-20">
        <FadeInSection>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-black mb-6">
            Ready to start your project?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10">
            Experience the difference of true factory-direct custom
            manufacturing. Reach out today for a transparent quote.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-[#0033CC] text-white px-10 py-4 text-lg font-bold rounded-xl hover:bg-blue-800 transition-transform hover:-translate-y-1 shadow-xl"
          >
            Speak with an Expert
          </Link>
        </FadeInSection>
      </section>
    </main>
  );
}
