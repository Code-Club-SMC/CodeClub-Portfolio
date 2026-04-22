import React from "react";
import { Link } from "react-router-dom";
import { FiMail, FiPhone } from "react-icons/fi";
import { FaWhatsapp, FaMagnifyingGlassLocation } from "react-icons/fa6";
import secp from "../../assets/secp.jfif";

const FooterMain = () => {
  return (
    <footer className="bg-white text-gray-500/80 pt-8 px-6 md:px-16 lg:px-24 xl:px-32 border-t border-gray-200">
      <div className="flex flex-wrap justify-between gap-12 md:gap-6">
        {/* Left Section - Logo and Socials */}
        <div className="max-w-80">
          <h1 className="text-black font-bold text-2xl">Code Club</h1>
          <p className="text-sm mt-2">
            We build modern, scalable, and intelligent solutions that drive real value.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-3 mt-4 text-gray-700">
            {/* Instagram */}
            <a
              href="https://www.instagram.com/codeclubb_?igsh=MWxpZjJ4OGFkNGN5YQ=="
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                className="w-6 h-6 hover:text-pink-500 transition"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M7.75 2A5.75 5.75 0 002 7.75v8.5A5.75 5.75 0 007.75 22h8.5A5.75 5.75 0 0022 16.25v-8.5A5.75 5.75 0 0016.25 2h-8.5zM4.5 7.75A3.25 3.25 0 017.75 4.5h8.5a3.25 3.25 0 013.25 3.25v8.5a3.25 3.25 0 01-3.25 3.25h-8.5a3.25 3.25 0 01-3.25-3.25v-8.5zm9.5 1a4 4 0 11-4 4 4 4 0 014-4zm0 1.5a2.5 2.5 0 102.5 2.5 2.5 2.5 0 00-2.5-2.5zm3.5-.75a.75.75 0 11.75-.75.75.75 0 01-.75.75z" />
              </svg>
            </a>

            {/* Facebook */}
            <a
              href="https://www.facebook.com/profile.php?id=61578240841971&mibextid=wwXIfr"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                className="w-6 h-6 hover:text-blue-600 transition"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M13.5 9H15V6.5h-1.5c-1.933 0-3.5 1.567-3.5 3.5v1.5H8v3h2.5V21h3v-7.5H16l.5-3h-3z" />
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/company/code-clubb/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                className="w-6 h-6 hover:text-blue-700 transition"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M4.98 3.5C3.88 3.5 3 4.38 3 5.48c0 1.1.88 1.98 1.98 1.98h.02c1.1 0 1.98-.88 1.98-1.98C6.98 4.38 6.1 3.5 4.98 3.5zM3 8.75h3.96V21H3V8.75zm6.25 0h3.8v1.68h.05c.53-.98 1.82-2.02 3.75-2.02 4.01 0 4.75 2.64 4.75 6.07V21H17v-5.63c0-1.34-.03-3.07-1.88-3.07-1.88 0-2.17 1.47-2.17 2.98V21H9.25V8.75z" />
              </svg>
            </a>
          </div>

          {/* SECP Logo + Registration */}
          <div className="flex items-center gap-3 mt-5">
            <img src={secp} className="w-12 h-12" alt="SECP Logo" />
            <p className="text-gray-700 text-sm font-medium">
              SECP Registration No:{" "}
              <span className="font-semibold">0306424</span>
            </p>
          </div>
        </div>

        {/* Expertise */}
        <div>
          <p className="text-lg text-gray-800 font-medium">Expertise</p>
          <ul className="mt-3 flex flex-col gap-2 text-sm">
            {[
              { name: "Web Development", path: "/service/web-development" },
              { name: "App Development", path: "/service/mobile-apps" },
              { name: "UI/UX Design", path: "/service/ui-ux" },
              { name: "Cyber Security", path: "/service/cyber-security" },
              { name: "Artificial Intelligence", path: "/service/ai-ml" },
              { name: "Internet Of Things (IoT)", path: "/service/iot" },
            ].map((item) => (
              <li key={item.name}>
                <Link to={item.path} className="hover:text-blue-600 transition">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <p className="text-lg text-gray-800 font-medium">Company</p>
          <ul className="mt-3 flex flex-col gap-2 text-sm">
            {[
              { name: "About Us", path: "/about" },
              { name: "Our Methodology", path: "/methodology" },
              { name: "Case Studies", path: "/case-studies" },
              { name: "Contact Us", path: "/contact" },
            ].map((item) => (
              <li key={item.name}>
                <Link to={item.path} className="hover:text-blue-600 transition">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="max-w-80">
          <h3 className="text-lg text-gray-800 mb-2 font-medium">Contact Us</h3>
          <p className="text-sm text-gray-500 mb-4">
            Reach out to us for collaboration or queries.
          </p>

          <div className="space-y-4 text-sm text-gray-800">
            {/* Emails */}
            <div className="flex items-center gap-3">
              <FiMail className="text-blue-600 text-lg" />
              <a href="mailto:info@codeclub.tech" className="hover:underline">
                info@codeclub.tech
              </a>
            </div>

            <div className="flex items-center gap-3">
              <FiMail className="text-blue-600 text-lg" />
              <a href="mailto:codeclubb1@gmail.com" className="hover:underline">
                codeclubb1@gmail.com
              </a>
            </div>

            {/* Phone numbers */}
            <div className="flex items-center gap-3">
              <FiPhone className="text-blue-600 text-lg" />
              <a href="tel:+923140078748" className="hover:underline">
                +92 314 0078748
              </a>
            </div>

            {/* WhatsApp */}
            <div className="flex items-center gap-3">
              <FaWhatsapp className="text-green-500 text-lg" />
              <a
                href="https://wa.me/923141334484"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                +92 314 1334484
              </a>
            </div>

            {/* Location */}
            <div className="flex items-start gap-3">
              <FaMagnifyingGlassLocation className="text-blue-600 text-xl mt-1" />
              <p>
                Liberty Mall Opp: Airport runway, University Rd, Tehkal,
                Peshawar, 25000, Pakistan
              </p>
            </div>
          </div>
        </div>
      </div>

      <hr className="border-gray-300 mt-8" />

      {/* Bottom Row */}
      <div className="flex flex-col md:flex-row gap-2 items-center justify-between py-5 text-xs">
        <p>
          © {new Date().getFullYear()}{" "}
          <Link to="/" className="hover:text-blue-600">
            CodeClub
          </Link>
          . All rights reserved.
        </p>
        <ul className="flex items-center gap-4">
          <li>
            <a
              href="https://maps.app.goo.gl/GSV6kStDkwHeHP9G6"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600"
            >
              Sitemap
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default FooterMain;
