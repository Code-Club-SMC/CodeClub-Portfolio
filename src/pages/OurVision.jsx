import React from "react";
import ourvision from "../assets/ourvision.jpg"; // correct image file

export default function VisionPage() {
    return (
        <section className="bg-white py-20 px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                {/* Text Section */}
                <div>
                    <h2 className="text-4xl font-bold text-gray-800 mb-4">Our vision</h2>
                    <p className="text-gray-600 mb-4">
                        Donec facilisis tortor ut augue lacinia, at viverra est semper.
                        Sed sapien metus, scelerisque nec pharetra id, tempor a tortor.
                        Pellentesque non dignissim.
                    </p>
                    <p className="text-gray-600">
                        In hac habitasse platea dictumst. Vivamus adipiscing fermentum
                        quam volutpat aliquam. Integer et elit eget elit facilisis
                        tristique. Nam vel iaculis mauris. Sed ullamcorper tellus erat,
                        non ultrices sem tincidunt euismod.
                    </p>
                </div>

                {/* Image Section */}
                <div className="relative flex justify-center items-center">
                    <img
                        src={ourvision}
                        alt="Vision Illustration"
                        className="max-w-full h-auto drop-shadow-md rounded-lg"
                    />

                    {/* Optional Decorative Icons */}
                    <div className="absolute top-2 left-4 text-yellow-500 text-lg">📄</div>
                    <div className="absolute top-8 right-4 text-yellow-500 text-lg">📈</div>
                    <div className="absolute bottom-4 left-8 text-yellow-500 text-lg">✅</div>
                    <div className="absolute bottom-10 right-8 text-yellow-500 text-lg">💡</div>
                </div>
            </div>
        </section>
    );
}
