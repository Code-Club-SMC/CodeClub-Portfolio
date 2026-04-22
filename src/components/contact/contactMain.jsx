import React, { useRef, useState } from "react";
import { Paperclip, Mic, Info } from "lucide-react";
import emailjs from "@emailjs/browser";

const ContactMain = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState("");
  const [company, setCompany] = useState("");
  const [loading, setLoading] = useState(false);

  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleMessage = (e) => {
    setMessage(e.target.value);
  };
  const handleNumber = (e) => {
    setNumber(e.target.value);
  };
  const handleCompany = (e) => {
    setCompany(e.target.value);
  };
  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);
    emailjs
      .sendForm("service_eyo8hk4", "template_dfs32cr", form.current, {
        publicKey: "QUXxa6No-djZfWLxa",
      })
      .then(
        () => {
          setLoading(false);
          setName("");
          setEmail("");
          setMessage("");
          setNumber("");
          setCompany("");
          setSuccess("Message Sent Successfully");
        },
        (error) => {
          setLoading(false);
          console.log("FAILED...", error.text);
        }
      );
  };
  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen">
      {/* Left Panel */}
      <div className="bg-blue-600 text-white lg:w-1/3 w-full p-20">
        <h2 className="text-2xl font-semibold mb-4">Let’s connect</h2>
        <p className="mb-6">Fill out the form, and we’ve got you covered.</p>

        <h3 className="font-bold mb-4">What happens next?</h3>

        <ul className="space-y-6 border-l border-white pl-6 relative">
          {[
            "Our expert will follow up after reviewing your needs.",
            "If required, we’ll sign an NDA to ensure privacy.",
            "Our Pre-Sales Manager will send you a proposal.",
            "Then, we get started on your project.",
          ].map((step, i) => (
            <li key={i} className="relative ">
              <span className="absolute -left-8 top-1 w-4 h-4 rounded-full border-2 border-white bg-blue-600 flex items-center justify-center">
                <span className="w-2 h-2 rounded-full bg-white"></span>
              </span>
              {step}
            </li>
          ))}
        </ul>
      </div>

      {/* Right Panel */}
      <div className="bg-[#001c3d] text-white lg:w-2/3 w-full p-20">
        <h2 className="text-3xl font-semibold mb-4">Contact us</h2>
        <p className="mb-8 text-gray-300">
          Our team would love to hear from you.
        </p>

        <form
          className="space-y-6"
          ref={form}
          name="contact-form"
          onSubmit={sendEmail}
        >
          <div>
            <label className="block text-sm mb-1">Your challenge/goal*</label>
            <input
              type="text"
              value={message}
              name="message"
              onChange={handleMessage}
              className="w-full bg-transparent border-b border-gray-500 focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm mb-1">Name*</label>
              <input
                type="text"
                value={name}
                name="user_name"
                onChange={handleName}
                className="w-full bg-transparent border-b border-gray-500 focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Corporate email*</label>
              <input
                type="email"
                name="user_email"
                value={email}
                onChange={handleEmail}
                className="w-full bg-transparent border-b border-gray-500 focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Phone number</label>
              <input
                type="text"
                name="user_phone"
                value={number}
                onChange={handleNumber}
                className="w-full bg-transparent border-b border-gray-500 focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Company</label>
              <input
                type="text"
                name="user_company"
                value={company}
                onChange={handleCompany}
                className="w-full bg-transparent border-b border-gray-500 focus:outline-none focus:border-blue-500"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-6 bg-blue-600 hover:bg-blue-700 transition-colors text-white py-3 px-6 rounded"
          >
            {loading ? "Sending..." : "Send message"}
          </button>

          {success && (
            <div className="mt-4 text-green-400 text-sm font-medium">
              ✅ {success}
            </div>
          )}

          <p className="text-xs text-gray-400 mt-6 leading-relaxed">
            Sending the information provided in this form you agree to the
            processing of your personal data according to CodeClub{" "}
            <a href="#" className="underline text-white">
              Privacy Policy
            </a>{" "}
            and{" "}
            <a href="#" className="underline text-white">
              Cookies Policy
            </a>{" "}
            to handle the request and respond to it.
          </p>
        </form>
      </div>
    </div>
  );
};

export default ContactMain;
