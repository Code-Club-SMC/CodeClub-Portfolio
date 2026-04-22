import React from "react";
import { motion } from "framer-motion";

const getGradientColor = (index) => {
    const blue = "#2a7de3";
    const yellow = "rgb(250, 204, 21)";
    const black = "rgb(30, 30, 30)";

    const gradients = [
        [blue, black],
        [black, yellow],
    ];

    return gradients[index % gradients.length];
};

const TeamCard = ({ member, index = 0 }) => {
    const [startColor, endColor] = getGradientColor(index);

    return (
        <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
        >
            <motion.div
                className="relative w-80 h-96 rounded-xl p-px overflow-hidden group shadow-xl transition-all"
                initial={{
                    background: `linear-gradient(to right, ${startColor}, ${endColor})`,
                }}
                whileHover={{
                    background: `linear-gradient(to right, ${endColor}, ${startColor})`,
                }}
                transition={{ duration: 0.5 }}
            >
                <div className="relative z-10 bg-black/60 backdrop-blur-md p-6 h-full w-full rounded-[11px] flex flex-col items-center justify-center text-center border border-gray-700 hover:border-yellow-300 transition-all duration-300">
                    <img
                        src={member.image}
                        alt={member.name}
                        className="w-24 h-24 rounded-full shadow-md my-4 object-cover"
                    />
                    <h2 className="text-2xl font-bold text-white mb-1">{member.name}</h2>
                    <p className="text-sm text-yellow-300 font-medium mb-3">{member.role}</p>
                    <p className="text-sm text-slate-300 mb-4 px-4">{member.bio}</p>
                    <div className="flex space-x-4 text-xl text-slate-300">
                        <i className="fab fa-github hover:text-yellow-400 transition"></i>
                        <i className="fab fa-linkedin hover:text-yellow-400 transition"></i>
                        <i className="fab fa-twitter hover:text-yellow-400 transition"></i>
                    </div>
                </div>
            </motion.div>
        </a>
    );
};

export default TeamCard;
