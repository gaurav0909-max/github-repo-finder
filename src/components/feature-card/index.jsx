import React from "react";
import { featureItems } from "@/lib/utils";

export default function FeatureCard() {
    return (
        <div className="bg-slate-900 py-16">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {featureItems.map((feature, index) => (
                        <div
                            key={index}
                            className="group relative overflow-hidden rounded-xl bg-white/5 p-6 ring-1 ring-white/10 
                          backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:ring-white/20"
                        >
                            {/* Glass effect background */}
                            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-white/5" />

                            {/* Content */}
                            <div className="relative">
                                {/* Icon container */}
                                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-lg 
                                bg-gradient-to-br from-teal-300 via-slate-400 to-yellow-500 text-white shadow-lg">
                                    <span className="text-xl">{feature.icon}</span>
                                </div>

                                {/* Title */}
                                <h3 className="mb-3 text-xl font-medium text-white">
                                    {feature.title}
                                </h3>

                                {/* Description */}
                                <p className="text-sm leading-relaxed text-gray-400">
                                    {feature.description}
                                </p>

                                {/* Subtle highlight effect */}
                                <div className="absolute right-0 top-0 h-px w-full 
                                bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
