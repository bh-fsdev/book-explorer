
"use client";

import { Github, Twitter } from "lucide-react";

export default function Navbar() {
    return (
        <nav className="w-full py-6">
            <div className="container flex items-center justify-between sm:justify-around mx-auto px-4 sm:px-6 lg:px-8">
                <span
                    className={`flex items-center gap-[4px] sm:gap-[6px] font-bold tracking-tight transition-colors duration-300 text-lg sm:text-xl `}
                >
                    {/* <Image
                        src="/favicon.svg"
                        alt="PatternCraft Logo"
                        width={20}
                        height={20}
                        className="flex-shrink-0 mt-[2px] h-6 w-6 sm:h-6 sm:w-6"
                        priority
                        draggable={false}
                        style={{ userSelect: "none" }}
                    /> */}
                    <span className="whitespace-nowrap">BookStore</span>
                </span>
                <div className="flex items-center gap-3">
                    <div className="flex gap-2 sm:gap-4">
                        <a
                            href="#"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`rounded-full p-1.5 sm:p-2 transition-all duration-300 `}
                            aria-label="GitHub"
                        >
                            <Github
                                className={`h-5 w-5 sm:h-6 sm:w-6 transition-colors duration-300 `}
                                strokeWidth={1.5}
                            />
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
}