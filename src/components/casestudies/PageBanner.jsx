import React from "react";
import { Link } from "react-router-dom";

const PageBanner = ({ title, subtitle }) => {
    return (
        <section className="relative w-full bg-gradient-to-br from-[#46a0dc] via-[#2a7de3] to-[#0d54bd] py-24 text-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-sm text-gray-300 mb-6">
                    <Link to="/" className="text-white font-semibold hover:underline">
                        Home
                    </Link>
                    <span className="mx-2">{">"}</span>
                    <span className="text-white">{title}</span>
                </div>

                <h1 className="text-4xl sm:text-5xl font-bold text-white">
                    <span className="text-yellow-500">{title}</span>{" "}
                    <span className="font-light">we successfully developed</span>
                </h1>

                <p className="mt-4 text-lg text-gray-300">
                    {subtitle || "One look is worth a thousand words."}
                </p>
            </div>
        </section>
    );
};

export default PageBanner;
