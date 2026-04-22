import React from "react";
import { motion } from "framer-motion";

const stages = [
    {
        title: "1. Ideation & Feasibility",
        desc: "Refine the idea: Who’s the user? What problems are we solving? How do we scope it?",
    },
    {
        title: "2. Requirements & Design",
        desc: "Write functional specs, sketch flows & wireframes, and align all stakeholders early.",
    },
    {
        title: "3. Iterative Development",
        desc: "Deliver in short sprints or increments. Test, demo, and adapt continuously.",
    },
    {
        title: "4. Testing & QA",
        desc: "Embed unit, integration and acceptance tests from day one. Automate through CI.",
    },
    {
        title: "5. Deployment Strategy",
        desc: "Prepare release packages, staging & production pipelines. Practice small, frequent deployments.",
    },
    {
        title: "6. Monitoring & Improvement",
        desc: "Track uptime, performance, feedback. Retrospectives guide process optimization.",
    },
];

const IdeaToLaunch = () => (
    <div className="bg-white text-gray-900 py-24 px-6 md:px-20 lg:px-32">
        {/* Header */}
        <header className="text-center mb-20">
            <h1 className="text-4xl mt-24 sm:text-5xl md:text-6xl font-bold text-gray-900">
                Idea to <span className="text-blue-600">Launch</span>
            </h1>
            <div className="w-28 h-1 bg-gradient-to-r from-blue-500 via-yellow-400 to-black rounded-full mx-auto mt-4"></div>
            <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                A proven roadmap from brainstorming to deployment—built on clarity, feedback loops, and modern workflows.
            </p>
        </header>

        {/* Workflow Steps */}
        <section className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {stages.map((stage, i) => (
                <motion.div
                    key={i}
                    className="bg-gray-100 border border-gray-300 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <h3 className="text-xl font-semibold text-blue-600 mb-2">{stage.title}</h3>
                    <p className="text-gray-700">{stage.desc}</p>
                </motion.div>
            ))}
        </section>

        {/* Footer */}
        <section className="text-center mt-16 px-4">
            <p className="text-gray-500 italic max-w-3xl mx-auto text-sm md:text-base">
                Based on frameworks like Agile, RAD, DevOps, and DevSecOps—this model blends key stages, feedback loops, automation, and quality-first thinking for reliable delivery.
            </p>
        </section>
    </div>
);

export default IdeaToLaunch;
