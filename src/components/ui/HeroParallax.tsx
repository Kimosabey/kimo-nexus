"use client";
import React from "react";
import {
    motion,
    useScroll,
    useTransform,
    useSpring,
    MotionValue,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export const HeroParallax = ({
    products,
}: {
    products: {
        title: string;
        link: string;
        thumbnail: string;
    }[];
}) => {
    // Dynamically calculate row distribution to show ALL projects
    const total = products.length;
    const itemsPerRow = Math.ceil(total / 3);
    const firstRow = products.slice(0, itemsPerRow);
    const secondRow = products.slice(itemsPerRow, itemsPerRow * 2);
    const thirdRow = products.slice(itemsPerRow * 2);

    const ref = React.useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

    const translateX = useSpring(
        useTransform(scrollYProgress, [0, 1], [0, 800]),
        springConfig
    );
    const translateXReverse = useSpring(
        useTransform(scrollYProgress, [0, 1], [0, -800]),
        springConfig
    );
    const rotateX = useSpring(
        useTransform(scrollYProgress, [0, 0.2], [15, 0]),
        springConfig
    );
    const opacity = useSpring(
        useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
        springConfig
    );
    const rotateZ = useSpring(
        useTransform(scrollYProgress, [0, 0.2], [10, 0]),
        springConfig
    );
    const translateY = useSpring(
        useTransform(scrollYProgress, [0, 0.2], [-600, 200]),
        springConfig
    );

    return (
        <div
            ref={ref}
            className="h-[300vh] py-10 md:py-20 overflow-hidden antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
        >
            <Header />
            <motion.div
                style={{
                    rotateX,
                    rotateZ,
                    translateY,
                    opacity,
                }}
            >
                <div className="flex flex-col gap-10 md:gap-20">
                    <motion.div className="flex flex-row-reverse space-x-reverse space-x-10 md:space-x-20">
                        {firstRow.map((product) => (
                            <ProductCard
                                product={product}
                                translate={translateX}
                                key={product.title}
                            />
                        ))}
                    </motion.div>
                    <motion.div className="flex flex-row space-x-10 md:space-x-20">
                        {secondRow.map((product) => (
                            <ProductCard
                                product={product}
                                translate={translateXReverse}
                                key={product.title}
                            />
                        ))}
                    </motion.div>
                    <motion.div className="flex flex-row-reverse space-x-reverse space-x-10 md:space-x-20">
                        {thirdRow.map((product) => (
                            <ProductCard
                                product={product}
                                translate={translateX}
                                key={product.title}
                            />
                        ))}
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export const Header = () => {
    return (
        <div className="max-w-7xl relative mx-auto py-10 md:py-32 px-4 w-full left-0 top-0">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <span className="text-cyan-400 font-mono text-[10px] md:text-sm tracking-[0.3em] uppercase mb-4 block">
                    Curated Collection
                </span>
                <h2 className="text-4xl md:text-7xl lg:text-8xl font-black text-white leading-[0.9] tracking-tighter uppercase mb-6 md:mb-8">
                    Digital <br /> Masterpieces
                </h2>
                <p className="max-w-3xl text-sm md:text-xl text-neutral-400 font-light leading-relaxed">
                    A definitive gallery of high-performance architectural prototypes,
                    distributed systems, and neural intelligence interfaces.
                    Forged with precision and built for scale.
                </p>
            </motion.div>
        </div>
    );
};

export const ProductCard = ({
    product,
    translate,
}: {
    product: {
        title: string;
        link: string;
        thumbnail: string;
    };
    translate: MotionValue<number>;
}) => {
    return (
        <motion.div
            style={{
                x: translate,
            }}
            whileHover={{
                y: -15,
            }}
            key={product.title}
            className="group/product h-64 w-[20rem] md:h-96 md:w-[30rem] relative flex-shrink-0"
        >
            <Link
                href={product.link}
                className="block group-hover/product:shadow-2xl "
            >
                <Image
                    src={product.thumbnail}
                    height="600"
                    width="600"
                    className="object-cover object-left-top absolute h-full w-full inset-0 rounded-2xl md:rounded-3xl"
                    alt={product.title}
                />
            </Link>
            <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-80 bg-black rounded-2xl md:rounded-3xl pointer-events-none transition duration-200"></div>
            <h2 className="absolute bottom-4 left-4 opacity-0 group-hover/product:opacity-100 text-white text-sm md:text-base transition duration-200">
                {product.title}
            </h2>
        </motion.div>
    );
};
