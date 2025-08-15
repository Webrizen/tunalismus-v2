// Navbar.jsx
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import Logo from "../assets/logo.png";

// Navigation links
const navItems = [
    { title: "Home", href: "/" },
    { title: "Courses", href: "/courses" },
    { title: "Blog", href: "/blog" },
    { title: "Resources", href: "/resources" },
    { title: "About", href: "/about" },
    { title: "Contact", href: "/contact" },
];

// Animation variants
const menuSlide = {
    initial: { x: "calc(100% + 100px)" },
    enter: {
        x: 0,
        transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
    },
    exit: {
        x: "calc(100% + 100px)",
        transition: { duration: 0.5, ease: [0.55, 0.06, 0.68, 0.19] },
    },
};
const slide = {
    initial: { x: 80, opacity: 0 },
    enter: (i) => ({
        x: 0,
        opacity: 1,
        transition: {
            duration: 0.5,
            ease: [0.25, 0.46, 0.45, 0.94],
            delay: 0.03 * i,
        },
    }),
    exit: (i) => ({
        x: 80,
        opacity: 0,
        transition: {
            duration: 0.4,
            ease: [0.55, 0.06, 0.68, 0.19],
            delay: 0.02 * i,
        },
    }),
};
const scale = {
    open: { scale: 1, transition: { duration: 0.25 } },
    closed: { scale: 0, transition: { duration: 0.2 } },
};

// Curved background shape
function Curve() {
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const resize = () =>
            setDimensions({ width: window.innerWidth, height: window.innerHeight });
        resize();
        window.addEventListener("resize", resize);
        return () => window.removeEventListener("resize", resize);
    }, []);

    const initialPath = `M100 0 L100 ${dimensions.height} Q-100 ${dimensions.height / 2} 100 0`;
    const targetPath = `M100 0 L100 ${dimensions.height} Q100 ${dimensions.height / 2} 100 0`;

    const curve = {
        initial: { d: initialPath },
        enter: { d: targetPath, transition: { duration: 0.8 } },
        exit: { d: initialPath, transition: { duration: 0.6 } },
    };

    return (
        <svg className="absolute top-0 -left-24 w-24 h-full fill-[var(--color-soft-blue)] stroke-none">
            <motion.path variants={curve} initial="initial" animate="enter" exit="exit" />
        </svg>
    );
}

// Single nav link
function NavLink({ data, isActive, setSelectedIndicator }) {
    const { title, href, index } = data;
    return (
        <motion.div
            className="relative flex items-center"
            onMouseEnter={() => setSelectedIndicator(href)}
            custom={index}
            variants={slide}
            initial="initial"
            animate="enter"
            exit="exit"
        >
            <motion.div
                variants={scale}
                animate={isActive ? "open" : "closed"}
                className="w-2.5 h-2.5 bg-white rounded-full absolute -left-7"
            />
            <a
                href={href}
                className="text-white hover:text-[var(--color-dusty-rose)] transition-all duration-300 ease-out hover:translate-x-1"
            >
                {title}
            </a>
        </motion.div>
    );
}

// Full slide menu
function NavMenu({ activePath }) {
    const [selectedIndicator, setSelectedIndicator] = useState(activePath);

    return (
        <motion.div
            variants={menuSlide}
            initial="initial"
            animate="enter"
            exit="exit"
            className="h-screen bg-[var(--color-muted-green)] fixed right-0 top-0 text-white z-[9999]"
        >
            <div className="box-border h-full p-24 flex flex-col justify-between">
                <div
                    onMouseLeave={() => setSelectedIndicator(activePath)}
                    className="flex flex-col text-5xl gap-3 mt-20"
                >
                    <div className="text-white/70 border-b border-white/40 uppercase text-xs mb-10 pb-2">
                        Navigation
                    </div>
                    {navItems.map((data, index) => (
                        <NavLink
                            key={index}
                            data={{ ...data, index }}
                            isActive={selectedIndicator === data.href}
                            setSelectedIndicator={setSelectedIndicator}
                        />
                    ))}
                </div>

                <div className="flex flex-wrap">
                    <div className="w-1/2">
                        <div className="text-white/70 border-b border-white/40 uppercase text-xs mb-2 pb-1">
                            Socials
                        </div>
                        <div className="text-white text-sm space-y-1">
                            {["Awwwards", "Instagram", "Dribbble", "LinkedIn"].map((s) => (
                                <div
                                    key={s}
                                    className="hover:text-[var(--color-dusty-rose)] transition-colors duration-200 cursor-pointer"
                                >
                                    {s}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <Curve />
        </motion.div>
    );
}

// Exported Navbar
export default function Navbar() {
   const [isActive, setIsActive] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { scrollY } = useScroll();

    // Track scroll position
    useMotionValueEvent(scrollY, "change", (latest) => {
        const halfViewport = window.innerHeight / 1.5;
        setScrolled(latest > halfViewport);
    });


    return (
        <>
            {/* Top nav bar */}
            <motion.header 
                className={`fixed inset-x-0 z-[99999] h-20 flex items-center ${scrolled ? "top-0" : "md:top-10 top-2 md:px-8"} transition-all duration-300 ease-in-out`}
                transition={{ duration: 0.6, ease: "easeInOut" }}
            >
                <div className="mx-auto container w-full px-5 sm:px-10 md:px-12 lg:px-5 h-full">
                    <nav className="flex justify-between items-center h-full">
                        <div className="md:flex hidden items-center space-x-3">
                            <a
                                href="#"
                                className={`relative ${scrolled ? "text-gray-700 hover:text-gray-900" : "text-gray-300 hover:text-gray-400"} transition-colors duration-300 group`}
                            >
                                <span className="relative z-10">Educational Resources</span>
                                <span className={`absolute bottom-0 left-0 w-0 h-px ${scrolled ? "bg-gray-900" : "bg-gray-100"} transition-all duration-300 group-hover:w-full`}></span>
                            </a>

                            <span className={`${scrolled ? "text-gray-600" : "text-gray-400"} select-none`}>•</span>

                            <a
                                href="#"
                                className={`relative ${scrolled ? "text-gray-700 hover:text-gray-900" : "text-gray-300 hover:text-gray-400"} transition-colors duration-300 group`}
                            >
                                <span className="relative z-10">Community</span>
                                <span className={`absolute bottom-0 left-0 w-0 h-px ${scrolled ? "bg-gray-900" : "bg-gray-100"} transition-all duration-300 group-hover:w-full`}></span>
                            </a>
                        </div>

                        {/* Left logo */}
                        <div className="flex items-center gap-x-2 font-semibold text-lg">
                            <img
                                src={Logo}
                                alt="Tunalismus Logo"
                                className={`h-8 w-auto object-contain ${scrolled ? "invert" : ""}`}
                            />
                            <motion.span 
                                className={`px-3 border-l ${scrolled ? "border-gray-300 text-gray-900" : "border-white text-white"}`}
                                animate={{ color: scrolled ? "#111827" : "#ffffff" }}
                                transition={{ duration: 0.3 }}
                            >
                                Tunalismus
                            </motion.span>
                        </div>

                        {/* Right controls */}
                        <motion.div 
                            className="grid grid-cols-[1fr_.3fr] items-center p-1 rounded-full"
                            animate={{
                                backgroundColor: scrolled ? "rgba(31, 41, 55, 0.1)" : "var(--color-muted-green)"
                            }}
                            transition={{ duration: 0.3 }}
                        >
                            <button
                                onClick={() => setIsActive(!isActive)}
                                className={`w-full ${scrolled ? "bg-[var(--color-muted-green)] text-white" : "bg-white text-black"} rounded-full px-4 py-2 flex items-center justify-center transition-all duration-300 cursor-pointer`}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-5 h-5 mr-2"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M3.75 9h16.5m-16.5 6.75h16.5"
                                    />
                                </svg>
                                <span>Menu</span>
                            </button>
                            <div className={`size-8 rounded-full ${scrolled ? "bg-gray-100 text-gray-900" : "bg-[var(--color-muted-green)] text-[var(--color-warm-gray)]"} flex justify-center items-center cursor-pointer hover:bg-accent-hover transition-colors duration-300 p-2 mr-1`}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                                </svg>
                            </div>
                        </motion.div>
                    </nav>
                </div>
            </motion.header>

            {/* Animated menu */}
            <AnimatePresence mode="wait">
                {isActive && <NavMenu activePath="/" />}
            </AnimatePresence>
        </>
    );
}
