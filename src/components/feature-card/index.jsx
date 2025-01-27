import React from "react";
import { featureItems } from "./../../lib/utils";

export default function FeatureCard() {
    return (
        <div className="py-24 bg-gradient-to-b from-slate-900 to-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {featureItems.map((feature, index) => (
                        <div
                            key={index}
                            className="relative group rounded-2xl overflow-hidden p-8 
                                shadow-lg transition-transform duration-300 hover:scale-[1.05] 
                                bg-[#fff3db] border border-gray-700/50"
                            style={{
                                background: `linear-gradient(to bottom right, ${feature.gradient})`,
                            }}
                        >
                            <div className="relative z-10">
                                <div
                                    className="w-16 h-16 rounded-xl bg-white/10 backdrop-blur-md 
                                    flex items-center justify-center mb-6 group-hover:scale-110 
                                    transition-transform duration-300 border-2 border-[#3e3d36]"
                                >
                                    {feature.icon}
                                </div>
                                <h3 className="text-2xl font-semibold text-black/80 mb-4 group-hover:text-black">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-700">
                                    {feature.description}
                                </p>
                            </div>
                            <div
                                className="absolute inset-0 bg-gradient-to-br from-[#ffffff]/10 to-[#000000]/10 opacity-0 
                                    group-hover:opacity-20 transition-opacity duration-300"
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span
                                    className="absolute w-0 h-0 rounded-full bg-[#ffffff]/10 
                                    group-hover:w-40 group-hover:h-40 opacity-0 group-hover:opacity-10 
                                    transition-all duration-500 ease-in-out"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
