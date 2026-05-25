"use client";

import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "Custom Cabinetry",
    message: "",
  });

  // NEW: Added status state for the button feedback
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      // NEW: Web3Forms Fetch Request
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          // ---> PASTE YOUR KEY FROM YOUR EMAIL RIGHT HERE <---
          access_key: "95d8db47-8e6a-4a56-95f0-0e6348e896c9", 
          subject: `New Lead: ${formData.service} from ${formData.name}`,
          ...formData,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setStatus("success");
        setFormData({ name: "", email: "", phone: "", service: "Custom Cabinetry", message: "" });
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <main
      className="min-h-screen pt-12 pb-24"
      style={{ backgroundColor: "#F5F5EB" }}
    >
      <div className="max-w-6xl mx-auto px-8 md:px-14">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter mb-4">
            Let's Talk
          </h1>
          <p className="text-gray-600 text-lg max-w-xl">
            Ready to elevate your home? Fill out the form below and our team
            will get back to you with a transparent quote and next steps.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-12 bg-white rounded-3xl shadow-sm overflow-hidden">
          {/* Left Side - Contact Info */}
          <div className="bg-[#F7FA9A] p-10 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-black tracking-tight mb-6">
                Contact Information
              </h2>
              <div className="space-y-6 text-gray-800 text-sm">
                <div>
                  <p className="font-bold text-black mb-1">Our Facility</p>
                  <p>1654 Field Street</p>
                  <p>Winnipeg, MB</p>
                </div>
                <div>
                  <p className="font-bold text-black mb-1">Call Us</p>
                  <p>204-962-8424</p>
                  <p>204-963-2749</p>

                  <p className="font-bold text-black mb-1">For Window Blinds:</p>
                  <p>431-360-0047</p>
                </div>
                <div>
                  <p className="font-bold text-black mb-1">Email</p>
                  <p>info@h2imports.ca</p>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <p className="text-xs text-gray-600 font-medium uppercase tracking-wider mb-3">
                Opening Hours
              </p>
              <p className="text-sm font-semibold">
                Mon - Sat: 10:00 AM - 6:00 PM
              </p>
              <p className="text-sm font-semibold text-gray-600">Sun: Closed</p>
            </div>
          </div>

          {/* Right Side - The Form */}
          <div className="p-10">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="name"
                    className="text-sm font-bold text-black"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    className="border border-gray-300 rounded-lg p-3 outline-none focus:border-[#0033CC] transition-colors"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="phone"
                    className="text-sm font-bold text-black"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    required
                    className="border border-gray-300 rounded-lg p-3 outline-none focus:border-[#0033CC] transition-colors"
                    placeholder="(204) 555-0000"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-bold text-black">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  className="border border-gray-300 rounded-lg p-3 outline-none focus:border-[#0033CC] transition-colors"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="service"
                  className="text-sm font-bold text-black"
                >
                  Service of Interest
                </label>
                <select
                  id="service"
                  className="border border-gray-300 rounded-lg p-3 outline-none focus:border-[#0033CC] transition-colors bg-white"
                  value={formData.service}
                  onChange={(e) =>
                    setFormData({ ...formData, service: e.target.value })
                  }
                >
                  <option value="Custom Cabinetry">
                    Custom Kitchen Cabinetry
                  </option>
                  <option value="Walk-in Closets">
                    Walk-in Closets & Wardrobes
                  </option>
                  <option value="Custom Blinds">Zebra & Blackout Blinds</option>
                  <option value="TV Walls">Custom TV Walls</option>
                  <option value="Other">Other / General Inquiry</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="message"
                  className="text-sm font-bold text-black"
                >
                  Project Details
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="border border-gray-300 rounded-lg p-3 outline-none focus:border-[#0033CC] transition-colors resize-none"
                  placeholder="Tell us a bit about your space and what you're looking to build..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                ></textarea>
              </div>

              {/* NEW: Dynamic Button State */}
              <button
                type="submit"
                disabled={status === "submitting" || status === "success"}
                className={`font-bold py-4 rounded-lg transition-colors mt-2 text-white ${
                  status === "submitting" ? "bg-gray-400 cursor-not-allowed" : 
                  status === "success" ? "bg-green-600" : 
                  "bg-[#0033CC] hover:bg-blue-800"
                }`}
              >
                {status === "submitting" ? "Sending Request..." : 
                 status === "success" ? "Message Sent!" : 
                 "Submit Request"}
              </button>

              {/* NEW: Error Message text */}
              {status === "error" && (
                <p className="text-red-600 text-sm font-semibold text-center mt-2">
                  Something went wrong. Please try emailing us directly.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}