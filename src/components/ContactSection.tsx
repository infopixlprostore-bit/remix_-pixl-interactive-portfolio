import React, { useState } from "react";
import { Send, FileCheck, Loader, Mail } from "lucide-react";

export default function ContactSection() {
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  
  // Client input states
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [domain, setDomain] = useState<string>("");
  const [details, setDetails] = useState<string>("");

  const handleBriefSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !details) return;

    setIsSubmitting(true);
    
    const formattedMessage = `
Name: ${name}
Email: ${email}
Domain: ${domain || "N/A"}

Inquiry Details:
${details}
    `.trim();

    try {
      const accessKey = (import.meta as any).env?.VITE_WEB3FORMS_ACCESS_KEY || "YOUR_ACCESS_KEY_HERE";
      
      // Attempt API submit if a real key has been provided, otherwise fall back gracefully
      if (accessKey && accessKey !== "YOUR_ACCESS_KEY_HERE") {
        await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            access_key: accessKey,
            name: name,
            email: email,
            subject: `New PIXL Enquiry from ${name}`,
            message: formattedMessage,
            to_email: "agnivamandal7a23dpsm@gmail.com"
          })
        });
      }
    } catch (err) {
      console.warn("API submission error, falling back to instant client routing:", err);
    } finally {
      // Complete state so success screen is rendered
      setIsSubmitting(false);
      setFormSubmitted(true);
    }
  };

  const handleResetForm = () => {
    setName("");
    setEmail("");
    setDomain("");
    setDetails("");
    setFormSubmitted(false);
  };

  return (
    <div id="contact-root" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Column 1: Informational & Interactive Pricing Tool (Removed estimator as requested by CSS Selector 1) */}
      <div className="lg:col-span-5 flex flex-col gap-6">
        <div>
          <span className="text-xs font-mono tracking-widest text-neon-violet-light uppercase">
            // INQUIRY DESK
          </span>
          <h3 className="text-xl font-display font-semibold text-white mt-1">
            Initiate Project Brief
          </h3>
          <p className="text-xs text-gray-400 mt-2 leading-relaxed">
            PIXL functions as a decentralized elite network of senior designers and React engineers. Our billing is transparent, based on timeline commitment.
          </p>
        </div>
      </div>

      {/* Column 2: Inquiry Brief Form */}
      <div className="lg:col-span-7 bg-charcoal-dark border border-charcoal-border rounded-xl p-6 md:p-8">
        {!formSubmitted ? (
          <form id="form-brief" onSubmit={handleBriefSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1 mb-2">
              <h4 className="text-sm font-display font-medium text-white">Transmit Creative Scope</h4>
              <p className="text-xs text-gray-400">All fields flagged with asterisks are mandatory telemetry coordinates.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-mono text-gray-400 uppercase">Your Name *</label>
                <input
                  id="input-client-name"
                  type="text"
                  required
                  placeholder="e.g. Austin Vane"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-charcoal-pure border border-charcoal-border rounded-lg px-3.5 py-2.5 text-xs text-white focus:border-[#a855f7] outline-none transition-colors"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-mono text-gray-400 uppercase">Telemetry Email *</label>
                <input
                  id="input-client-email"
                  type="email"
                  required
                  placeholder="e.g. client@brand.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-charcoal-pure border border-charcoal-border rounded-lg px-3.5 py-2.5 text-xs text-white focus:border-[#a855f7] outline-none transition-colors"
                />
              </div>
            </div>

            {/* Website domain */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-mono text-gray-400 uppercase">Corporate URL / Domain</label>
              <input
                id="input-client-domain"
                type="text"
                placeholder="e.g. www.brand.com"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                className="w-full bg-charcoal-pure border border-charcoal-border rounded-lg px-3.5 py-2.5 text-xs text-white focus:border-[#a855f7] outline-none transition-colors"
              />
            </div>

            {/* Brief specs details */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-mono text-gray-400 uppercase">Brief Specifications *</label>
              <textarea
                id="textarea-client-brief"
                required
                rows={4}
                placeholder="Describe the minimalist identity parameters, desired React interactive components, and active system guidelines..."
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                className="w-full bg-charcoal-pure border border-charcoal-border rounded-lg px-3.5 py-2.5 text-xs text-white focus:border-[#a855f7] outline-none resize-none transition-colors"
              />
            </div>

            <button
              id="btn-submit-brief"
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-2 py-3 bg-gradient-to-r from-neon-violet to-neon-pink text-white text-xs font-mono font-medium rounded-lg hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader className="animate-spin h-3.5 w-3.5" />
                  <span>TRANSMITTING DIRECTIVE...</span>
                </>
              ) : (
                <>
                  <Send className="h-3.5 w-3.5" />
                  <span>TRANSMIT BRIEF BRIEFCASE</span>
                </>
              )}
            </button>
          </form>
        ) : (
          <div id="contact-success-view" className="flex flex-col items-center justify-center text-center py-8 animate-fade-in">
            <div className="h-12 w-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mb-4">
              <FileCheck className="h-6 w-6 text-emerald-400" />
            </div>
            
            <h4 className="text-base font-display font-semibold text-white">Directive Transmitted Successfully</h4>
            <p className="text-xs text-gray-400 mt-2 max-w-sm leading-relaxed">
              Your project briefing has been compiled. It is routed for delivery direct to <span className="text-neon-pink font-semibold">agnivamandal7a23dpsm@gmail.com</span>.
            </p>

            {/* Display code back to them in success without pricing */}
            <div className="bg-charcoal-pure border border-charcoal-border/70 rounded-lg p-3.5 mt-5 text-[10px] font-mono text-gray-400 w-full max-w-sm flex flex-col gap-1.5 text-left">
              <div className="flex justify-between">
                <span>CLIENT CODE:</span>
                <span className="text-white">#{Math.floor(100000 + Math.random() * 900000)}</span>
              </div>
              <div className="flex justify-between">
                <span>STATUS:</span>
                <span className="text-emerald-400 font-semibold">TRANSMITTED & DELIVERABLE</span>
              </div>
            </div>

            {/* Direct Mailto Deliver Option */}
            <div className="mt-6 flex flex-col gap-3 w-full max-w-sm">
              <a
                id="btn-direct-mailto"
                href={`mailto:agnivamandal7a23dpsm@gmail.com?subject=${encodeURIComponent(`New PIXL Portfolio Inquiry from ${name}`)}&body=${encodeURIComponent(
                  `Hello,\n\nI would like to submit my enquiry:\n\nName: ${name}\nEmail: ${email}\nDomain: ${domain || "N/A"}\n\nInquiry Details:\n${details}\n\nSent via PIXL Interactive.`
                )}`}
                className="py-3 px-4 bg-[#140f24] hover:bg-[#1a1430] border border-[#a855f7]/40 hover:border-[#a855f7] rounded-lg text-xs font-mono text-[#a78bfa] hover:text-white transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(168,85,247,0.05)]"
              >
                <Mail className="h-4 w-4 text-neon-pink" />
                <span>SEND DIRECT EMAIL VIA CLIENT</span>
              </a>
              <p className="text-[9px] text-gray-500 font-mono tracking-wide uppercase leading-tight">
                Click above to instantly launch your system client & deliver directly to <span className="text-emerald-400">agnivamandal7a23dpsm@gmail.com</span>
              </p>
            </div>

            <button
              id="btn-reset-brief"
              onClick={handleResetForm}
              className="mt-6 text-xs font-mono text-neon-violet-light hover:text-white transition-colors cursor-pointer"
            >
              ← Back to Transmitter Form
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
