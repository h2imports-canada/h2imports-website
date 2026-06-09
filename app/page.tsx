"use client";

import { useEffect, useRef, useState, ReactNode, CSSProperties } from "react";
import Link from "next/link";

function AnimatedSection({
  children,
  animationClass = "reveal-up",
  className = "",
  style,
}: {
  children?: ReactNode;
  animationClass?: string;
  className?: string;
  style?: CSSProperties;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setIsVisible(true);
        }),
      { threshold: 0.1 },
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
      style={style}
      className={`${animationClass} ${isVisible ? "is-visible" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

function ScrollSlideSection({
  children,
  className = "",
  startOffset = 300,
  style,
}: {
  children: ReactNode;
  className?: string;
  startOffset?: number;
  style?: CSSProperties;
}) {
  const domRef = useRef<HTMLDivElement>(null);
  const [translateX, setTranslateX] = useState(startOffset);
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!domRef.current) return;
      const rect = domRef.current.getBoundingClientRect();
      const progress = Math.max(
        0,
        Math.min(
          1,
          ((window.innerHeight - rect.top) / (window.innerHeight / 1.5)) * 2.5,
        ),
      );
      setTranslateX(startOffset * (1 - progress));
      setOpacity(progress);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [startOffset]);

  return (
    <div
      ref={domRef}
      className={className}
      style={{
        transform: `translateX(${translateX}px)`,
        opacity,
        transition: "transform 0.1s ease-out, opacity 0.1s ease-out",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function WinnipegMapAnimation() {
  const [hasAnimated, setHasAnimated] = useState(false);
  // NEW: State to track if the GIF is currently open
  const [selectedGif, setSelectedGif] = useState<string | null>(null);

  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.3 },
    );
    const el = mapRef.current;
    if (el) observer.observe(el);
    return () => {
      if (el) observer.unobserve(el);
    };
  }, []);

  const locations = [
    { name: "H2 IMPORTS", x: "50%", y: "50%", delay: "0ms", isCenter: true },
    {
      name: "Assiniboine",
      x: "30%",
      y: "48%",
      delay: "300ms",
      isCenter: false,
    },
    { name: "Kildonan", x: "65%", y: "32%", delay: "500ms", isCenter: false },
    { name: "Transcona", x: "75%", y: "52%", delay: "600ms", isCenter: false },
    { name: "St. Vital", x: "62%", y: "70%", delay: "700ms", isCenter: false },
    {
      name: "Fort Richmond",
      x: "35%",
      y: "75%",
      delay: "800ms",
      isCenter: false,
    },
    { name: "Selkirk", x: "55%", y: "10%", delay: "1000ms", isCenter: false },
    { name: "Steinbach", x: "88%", y: "85%", delay: "1200ms", isCenter: false },
    {
      name: "Niverville",
      x: "50%",
      y: "88%",
      delay: "1300ms",
      isCenter: false,
    },
    {
      name: "Portage la Prairie",
      x: "8%",
      y: "45%",
      delay: "1400ms",
      isCenter: false,
    },
  ];

  return (
    <div
      ref={mapRef}
      className="relative w-full h-[550px] mt-4 mb-4 rounded-xl overflow-hidden"
    >
      {/* 1. THE NEW BACKGROUND MAP LAYER */}
      <div className="absolute inset-0 z-0">
        <img
          src="/Website03.png"
          alt="Map of Winnipeg"
          // We use opacity-30 so it blends nicely into your yellow card without overpowering it
          className="w-full h-full object-cover opacity-70 mix-blend-multiply"
        />
      </div>

      {/* 2. Expanding stylized radar rings (Z-10) */}
      <div
        className={`absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] aspect-square border-2 border-white/40 rounded-full transition-all duration-[1500ms] ease-out ${hasAnimated ? "scale-100 opacity-100" : "scale-0 opacity-0"}`}
      />
      <div
        className={`absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[55%] aspect-square border-2 border-white/60 rounded-full transition-all duration-[1500ms] delay-300 ease-out ${hasAnimated ? "scale-100 opacity-100" : "scale-0 opacity-0"}`}
      />

      {/* 3. The Map Dots (Z-20) */}
      {locations.map((loc, i) => {
        // We put the visual content into a variable so we don't have to write it twice
        const dotContent = (
          <>
            <div
              className={`rounded-full shadow-lg relative z-30 ${loc.isCenter ? "w-4 h-4 bg-black border-2 border-white" : "w-3 h-3 bg-[#0033CC] border border-white"}`}
            />

            {loc.isCenter && (
              <div className="absolute inset-0 w-full h-full bg-black rounded-full animate-ping opacity-50 z-20" />
            )}

            {/* Changed hover:scale-105 to group-hover:scale-105 so the text scales when you hover anywhere near the dot */}
            <div className="absolute top-5 whitespace-nowrap bg-white/90 backdrop-blur-sm text-black text-[9px] sm:text-[10px] font-bold px-2 py-1 rounded-md shadow-sm z-40 transition-transform group-hover:scale-105 border border-gray-100">
              {loc.name}
            </div>
          </>
        );

        return (
          <div
            key={i}
            className="absolute z-20 transition-all duration-1000 ease-out"
            style={{
              top: hasAnimated ? loc.y : "50%",
              left: hasAnimated ? loc.x : "50%",
              transform: "translate(-50%, -50%)",
              opacity: hasAnimated ? 1 : 0,
              transitionDelay: loc.delay,
            }}
          >
            {/* If it is the center dot, render a clickable link! */}
            {loc.isCenter ? (
              <a
                href="https://maps.app.goo.gl/sAu4UijH9vMuhuQJA"
                target="_blank"
                rel="noopener noreferrer"
                className="relative flex flex-col items-center group cursor-pointer"
              >
                {dotContent}
              </a>
            ) : (
              // NEW: Clicking any blue dot opens the common giphy.gif!
              <div
                className="relative flex flex-col items-center group cursor-pointer"
                onClick={() => setSelectedGif("/giphy.gif")}
              >
                {dotContent}
              </div>
            )}
          </div>
        );
      })}

      {/* NEW: THE GIF POPUP MODAL */}
      {selectedGif && (
        <div
          className="absolute inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 cursor-pointer transition-opacity"
          onClick={() => setSelectedGif(null)}
        >
          <div className="relative bg-white p-1 rounded-lg shadow-2xl max-w-full max-h-full flex items-center justify-center">
            <button
              className="absolute -top-3 -right-3 bg-red-600 text-white w-7 h-7 rounded-full font-bold shadow-lg hover:bg-red-700 hover:scale-110 transition-transform z-50 flex items-center justify-center text-sm"
              onClick={() => setSelectedGif(null)}
            >
              ✕
            </button>
            <img
              src={selectedGif}
              alt="Project Showcase"
              className="w-auto h-auto max-w-full max-h-[300px] rounded-md object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default function Home() {
  return (
    <main
      className="min-h-screen text-black font-sans relative"
      style={{ backgroundColor: "#F5F5EB" }}
    >
      {/* FIXED BACKGROUND VIDEO */}
      <div className="fixed top-0 left-0 w-full h-screen z-0 bg-gray-900">
        <video
          src="/outputmp_.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
      </div>

      {/* TOP CURTAIN */}
      <div
        className="relative z-10 w-full"
        style={{ backgroundColor: "#F5F5EB" }}
      >
        {/* 1. HERO */}
        <section className="relative w-full min-h-[85vh] flex items-center justify-center lg:justify-start px-8 md:px-14 py-20 overflow-hidden">
          {/* Background Image (The Kitchen) */}
          <div className="absolute inset-0 z-0">
            <img
              src="/Kitchen.jpg"
              alt="Premium Custom Kitchen"
              className="w-full h-full object-cover"
            />
            {/* Dark gradient overlay so the text card pops and the image isn't overwhelming */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
          </div>

          {/* Floating Content Card */}
          <AnimatedSection
            animationClass="reveal-up"
            className="relative z-10 w-full max-w-2xl bg-[#F5F5EB]/95 backdrop-blur-sm p-8 md:p-12 rounded-3xl shadow-2xl border border-white/20 mt-12 lg:ml-8"
          >
            {/* Small Badge */}
            <div className="inline-block px-4 py-1.5 mb-6 text-xs font-black tracking-widest text-[#0033CC] uppercase bg-[#F7FA9A] rounded-full shadow-sm">
              Winnipeg's Premier Manufacturer
            </div>

            {/* Headline */}
            <h1
              className="leading-[1.05] text-black mb-6"
              style={{
                fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                fontFamily: "'Barlow', sans-serif",
                fontWeight: 900,
                letterSpacing: "-0.02em",
              }}
            >
              Master Crafted <br className="hidden sm:block" />
              Kitchen Cabinetry.
            </h1>

            {/* Subtext explaining the manufacturing */}
            <p
              className="mb-8"
              style={{
                fontFamily: "'Georgia', serif",
                fontSize: "1.15rem",
                lineHeight: "1.7",
                color: "#444",
              }}
            >
              We don't just assemble kitchens; we build them from the ground up.
              Utilizing premium materials and advanced machinery right here in
              our local facility, we deliver flawless custom cabinetry tailored
              exactly to your home.
            </p>

            {/* Call to Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="flex items-center justify-center bg-[#0033CC] text-white px-8 py-4 text-sm font-bold rounded-xl hover:bg-blue-800 transition-transform hover:-translate-y-1 shadow-lg"
              >
                Get a Free Quote
              </Link>
              <Link
                href="/services"
                className="flex items-center justify-center bg-transparent text-black border-2 border-black px-8 py-4 text-sm font-bold rounded-xl hover:bg-black hover:text-white transition-colors"
              >
                Our Manufacturing Process
              </Link>
            </div>
          </AnimatedSection>
        </section>

        {/* 2. OUR EXPERTISE */}
        <section className="w-full py-16 px-8 md:px-14">
          <AnimatedSection className="mb-10">
            <h2 className="font-black tracking-tighter text-4xl md:text-5xl mb-1">
              Our Expertise
            </h2>
            <p className="text-xs text-gray-500 tracking-wide uppercase">
              Contemporary Designs
            </p>
          </AnimatedSection>

          {/* Top 3 cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <AnimatedSection
              className="rounded-2xl p-7 min-h-[190px]"
              style={{ backgroundColor: "#EAEAE0" }}
            >
              <div className="relative w-7 h-7 mb-5">
                <div className="absolute inset-0 rounded-full border-[3px] border-blue-800" />
                <div className="absolute inset-[7px] rounded-full bg-yellow-400" />
              </div>
              <h3 className="text-lg font-bold mb-2">Functional Spaces</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Smart, stylish designs that maximize comfort and flow in your
                home.
              </p>
            </AnimatedSection>

            <AnimatedSection
              animationClass="reveal-left"
              className="rounded-2xl p-7 min-h-[190px]"
              style={{ backgroundColor: "#EAEAE0" }}
            >
              <div
                className="w-7 h-7 rounded-full mb-5"
                style={{
                  background:
                    "linear-gradient(135deg, #1d40af 50%, #facc15 50%)",
                }}
              />
              <h3 className="text-lg font-bold mb-2">Custom TV Walls</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Custom entertainment units with integrated LED lighting and
                acoustic panels.
              </p>
            </AnimatedSection>

            <AnimatedSection
              animationClass="reveal-left"
              className="rounded-2xl p-7 min-h-[190px]"
              style={{ backgroundColor: "#EAEAE0" }}
            >
              <div className="relative w-7 h-7 mb-5">
                <div className="absolute inset-0 rounded-full border-[3px] border-yellow-400" />
                <div
                  className="absolute inset-0 rounded-full border-[3px] border-blue-800"
                  style={{ clipPath: "inset(0 50% 0 0)" }}
                />
              </div>
              <h3 className="text-lg font-bold mb-2">Walk-in Closets</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Seamless home expansions designed for comfort, style, and
                practicality.
              </p>
            </AnimatedSection>
          </div>

          {/* Bottom 2 scroll-slide cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-hidden py-1">
            <ScrollSlideSection
              startOffset={280}
              className="rounded-2xl p-7 min-h-[190px]"
              style={{ backgroundColor: "#EAEAE0" }}
            >
              <div className="flex gap-[3px] mb-5">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className={`w-[5px] h-5 rounded-sm ${i % 2 === 0 ? "bg-blue-800" : "bg-yellow-400"}`}
                  />
                ))}
              </div>
              <h3 className="text-lg font-bold mb-2">Custom Blinds</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Factory direct zebra and blackout blinds, measured and installed
                for you.
              </p>
            </ScrollSlideSection>

            <ScrollSlideSection
              startOffset={380}
              className="rounded-2xl p-7 min-h-[190px]"
              style={{ backgroundColor: "#EAEAE0" }}
            >
              <div className="grid grid-cols-2 gap-[3px] w-7 h-7 mb-5">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className={`rounded-[2px] ${[0, 3].includes(i) ? "bg-blue-800" : "bg-yellow-400"}`}
                  />
                ))}
              </div>
              <h3 className="text-lg font-bold mb-2">Kitchen Cabinets</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Modern, functional, and luxurious cabinetry upgrades tailored to
                your style.
              </p>
            </ScrollSlideSection>
          </div>
        </section>
      </div>

      {/* 3. SERVING CLIENTS — two equal cards side by side */}
      <section
        className="relative z-10 w-full py-8 px-8 md:px-14"
        style={{ backgroundColor: "#F5F5EB" }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
          {/* LEFT: Yellow Card with Map inside */}
          <AnimatedSection
            className="bg-[#F7FA9A] rounded-2xl p-9 flex flex-col justify-between relative overflow-hidden"
            style={{ minHeight: "500px" }}
          >
            {/* Top Text Content */}
            <div className="relative z-20">
              <h2 className="font-black tracking-tighter leading-[0.92] text-4xl md:text-5xl lg:text-6xl mb-3">
                Serving Clients
                <br />
                in Winnipeg and Surrounding Cities
              </h2>
              <p className="text-sm text-gray-700 font-medium mt-2">
                End-to-End Design &amp; Installation
              </p>
            </div>

            {/* The Map Animation takes up the middle space! */}
            <div className="relative z-10 w-full flex-grow flex items-center justify-center">
              <WinnipegMapAnimation />
            </div>

            {/* Bottom Button */}
            <div className="relative z-20">
              <a
                href="mailto:info@h2imports.com"
                className="inline-block self-start bg-[#0033CC] text-white px-7 py-3 text-sm font-semibold rounded-lg hover:bg-blue-800 transition-colors"
              >
                Email Now
              </a>
            </div>
          </AnimatedSection>

          {/* RIGHT: Image Card */}
          <AnimatedSection
            animationClass="reveal-left"
            className="rounded-2xl overflow-hidden"
            style={{ minHeight: "500px" }}
          >
            <img
              src="/Website02.jpg" // Using your specific closet image here!
              alt="Walk in Closet Construction"
              className="w-full h-full object-cover"
            />
          </AnimatedSection>
        </div>
      </section>

      {/* 4. OUR SPECIALIZATIONS */}
      <section
        className="relative z-10 w-full pt-16 pb-20 px-8 md:px-14"
        style={{ backgroundColor: "#F5F5EB" }}
      >
        <AnimatedSection
          animationClass="draw-line"
          className="h-[1px] bg-gray-300 w-full mb-12"
        />
        <div className="flex flex-col md:flex-row justify-between items-start mb-12 gap-6">
          <AnimatedSection>
            <h2 className="font-black tracking-tighter text-4xl md:text-5xl">
              Our Specializations
            </h2>
          </AnimatedSection>
          <AnimatedSection animationClass="reveal-left" className="max-w-xs">
            <h3 className="text-lg font-bold mb-1">Where We Excel</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Explore where we can provide our exceptional manufacturing
              solutions.
            </p>
          </AnimatedSection>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              title: "Custom Cabinetry",
              desc: "Beautiful, durable storage solutions tailored to fit your space.",
            },
            {
              title: "Precision Manufacturing",
              desc: "Engineered using premium MDF, Melamine, and Electron Beam Tech boards.",
            },
            {
              title: "Professional Installation",
              desc: "Upgrade your home with our dedicated Winnipeg-based installation crew.",
            },
          ].map(({ title, desc }) => (
            <AnimatedSection
              key={title}
              className="rounded-2xl p-7 min-h-[190px]"
              style={{ backgroundColor: "#EAEAE0" }}
            >
              <div className="w-4 h-4 rounded-full bg-blue-800 mb-5" />
              <h3 className="text-lg font-bold mb-2">{title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{desc}</p>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* TRANSPARENT GAP — video shows through */}
      <div className="relative z-0 w-full h-[150vh] bg-transparent" />

      {/* BOTTOM CURTAIN */}
      <section
        className="relative z-10 w-full pt-24 pb-20 rounded-t-[2.5rem]"
        style={{
          backgroundColor: "#F5F5EB",
          boxShadow: "0 -20px 60px rgba(0,0,0,0.2)",
        }}
      >
        {/* 5. WHY CHOOSE US */}
        <div className="px-8 md:px-14 grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-20">
          <AnimatedSection>
            <h2 className="font-black tracking-tighter text-4xl md:text-6xl leading-[0.92] mb-5">
              Why Choose Us?
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed max-w-sm">
              We are dedicated to providing reliable and innovative custom
              interior solutions designed exactly to your specifications.
            </p>
          </AnimatedSection>
          <AnimatedSection
            animationClass="scale-up"
            className="w-full rounded-2xl overflow-hidden"
            style={{ aspectRatio: "4/3" }}
          >
            <img
              src="/Website04.jpeg"
              alt="Craftsman at work"
              className="w-full h-full object-cover"
            />
          </AnimatedSection>
        </div>

        {/* 6. SIX PILLARS */}
        <div className="px-8 md:px-14 mb-20 max-w-[1900px] mx-auto">
          {/* Center column widened to 460px */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_460px_1fr] gap-8 lg:gap-10 items-stretch">
            {/* LEFT */}
            <div className="flex flex-col justify-between w-full">
              {[
                {
                  title: "Transparent Pricing",
                  desc: "No hidden fees. Clear quotes before any work begins, so you always know what to expect.",
                },
                {
                  title: "Skilled Craftsmanship",
                  desc: "Expert artisans ensuring impeccable quality and attention to detail in every project.",
                },
                {
                  title: "Advanced 3D Design",
                  desc: "Visualize your space before we build with our state-of-the-art Mozaik 3D software.",
                },
              ].map(({ title, desc }, index) => (
                <div
                  key={title}
                  className={`w-full ${index !== 0 ? "mt-12 lg:mt-0" : ""}`}
                >
                  <AnimatedSection
                    animationClass="draw-line"
                    className="h-[1px] bg-gray-300 w-full mb-6"
                  />
                  <AnimatedSection className="flex items-start gap-3">
                    <div className="w-4 h-4 rounded-full bg-[#0033CC] mt-1 shrink-0" />
                    <div>
                      <h3 className="text-xl font-black tracking-tight mb-2">
                        {title}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed pr-8">
                        {desc}
                      </p>
                    </div>
                  </AnimatedSection>
                </div>
              ))}
            </div>

            {/* CENTRE IMAGE */}
            <AnimatedSection
              animationClass="reveal-up"
              className="w-full rounded-2xl overflow-hidden self-center"
              // REMOVED aspect-ratio, ADDED fixed height. Now it stretches wider without growing taller!
              style={{ height: "480px" }}
            >
              <img
                src="/Website05.jpeg"
                alt="Interior Details"
                className="w-full h-full object-cover shadow-sm"
              />
            </AnimatedSection>

            {/* RIGHT */}
            <div className="flex flex-col justify-between w-full">
              {[
                {
                  title: "Client-Centric Approach",
                  desc: "We prioritize your needs, keeping you involved every step of the way.",
                },
                {
                  title: "Decades of Expertise",
                  desc: "Trusted professionals with years of experience delivering exceptional renovations.",
                },
                {
                  title: "Local Manufacturing",
                  desc: "Proudly fabricated in our Winnipeg facility to guarantee strict quality control and timely delivery.",
                },
              ].map(({ title, desc }, index) => (
                <div
                  key={title}
                  className={`w-full ${index !== 0 ? "mt-12 lg:mt-0" : ""}`}
                >
                  <AnimatedSection
                    animationClass="draw-line"
                    className="h-[1px] bg-gray-300 w-full mb-6"
                  />
                  <AnimatedSection className="flex items-start gap-3">
                    <div className="w-4 h-4 rounded-full bg-[#0033CC] mt-1 shrink-0" />
                    <div>
                      <h3 className="text-xl font-black tracking-tight mb-2">
                        {title}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed pr-8">
                        {desc}
                      </p>
                    </div>
                  </AnimatedSection>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 7. CLIENT REVIEWS */}
        <div className="px-8 md:px-14 mb-8">
          <AnimatedSection
            animationClass="draw-line"
            className="h-[1px] bg-gray-300 w-full mb-12"
          />
          <AnimatedSection>
            <h2 className="font-black tracking-tighter text-4xl md:text-5xl mb-12">
              Client Reviews
            </h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                name: "Annie",
                quote:
                  '"We found H2 on Facebook Marketplace. We went to their shop and picked the style we wanted: dark wood fluted wall panels (with sound proofing) with light. The staff was very easy to talk to, they were professional and they gave us a fair price. We scheduled a time/date for installation. The workers came on time, they were very skilled and professional. The install took close to 4h. So glad we didn’t do it ourselves. The job done is just perfection. It looks 10x better than what I had in mind. I’m so happy!"',
              },
              {
                name: "Muhammad",
                quote:
                  '"Good product , excellent quality and service , in time flawless installation done , best part was they gave me option of installer I can pick or can have my own . Five star for their work ."',
              },
              {
                name: "Stacey Mich",
                quote:
                  '"So impressed with H2 Imports.Fast and Friendly! Really great pricing. I love the result of our blinds! I did not think it would make that much of a difference in our house. I am so impressed!!!"',
              },
            ].map(({ name, quote }) => (
              <AnimatedSection key={name} className="flex flex-col">
                <div className="w-12 h-12 rounded-full bg-gray-300 overflow-hidden mb-4">
                  <img
                    src="/5.jpeg"
                    alt={name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-sm font-semibold mb-2">{name}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{quote}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* 8. FOOTER */}
      <footer className="relative z-10 w-full bg-[#F7FA9A] pt-14 pb-12">
        <div className="px-8 md:px-14">
          <div className="mb-10">
            <h2 className="font-black tracking-tighter text-5xl md:text-6xl mb-5">
              About Services
            </h2>
            {/* 1. Changed to a Next.js Link pointing to your form! */}
            <Link
              href="/contact"
              className="inline-block bg-[#0033CC] text-white px-7 py-3 text-sm font-semibold rounded-lg hover:bg-blue-800 transition-colors"
            >
              Contact
            </Link>
          </div>
          <AnimatedSection
            animationClass="draw-line"
            className="h-[1px] bg-black w-full mb-8"
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm text-gray-800">
            <div className="flex flex-col gap-2">
              <Link
                href="/privacy"
                className="hover:text-blue-700 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/accessibility"
                className="hover:text-blue-700 transition-colors"
              >
                Accessibility Statement
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              {/* 2. Added functional external links. Insert your real URLs inside href="..." */}
              <a
                href="https://www.facebook.com/MahmoodHassanCa/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-700 transition-colors"
              >
                Facebook
              </a>
              <a
                href="www.linkedin.com/in/mahmood-hassan-619169409"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-700 transition-colors"
              >
                LinkedIn
              </a>
            </div>
            <div className="flex flex-col gap-2">
              <p>1654 Field St, R3E 3H8</p>
              <p>Winnipeg, MB</p>
            </div>
            <div className="flex flex-col gap-2">
              <p>204-962-8424</p>
              <p>info@h2imports.ca</p>
              <p className="mt-4 text-gray-500 text-xs">
                © 2026 by H2 Imports.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
