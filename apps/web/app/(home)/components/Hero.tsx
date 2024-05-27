"use client";
import React, { useState } from "react";
import Image from "next/image";
import logo from "@/public/aix_logo.png";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const title = {
  initial: {
    opacity: 1,
  },
  animate: {
    opacity: 1,
    transition: {
      delay: 0.5,
      staggerChildren: 0.1,
    },
  },
};

const word = {
  initial: {
    opacity: 0,
    y: 50,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

const Hero = () => {
  const [cta, setCta] = useState<string>("#candidate");

  React.useEffect(() => {
    const ref = localStorage.getItem("candidate") ? "/careers" : "#candidate";
    setCta(ref);
  });
  return (
    <div
      className="flex justify-center items-center flex-wrap-reverse text-gray-100 
    font-bold tracking-wider text-3xl md:text-5xl lg:p-20 mb-10 lg:gap-10 xl:text-6xl"
    >
      <motion.div
        className="p-3"
        variants={title}
        initial="initial"
        animate="animate"
      >
        <motion.h1 variants={word} className="font-extrabold text-yellow-500">
          AI
        </motion.h1>
        <motion.h1 variants={word} className="">
          FOR CAREER HUNT
        </motion.h1>
        {/* <motion.h2 variants={word} className="mb-5">
          SOFTWARE DEVELOPER
        </motion.h2> */}
        <Link href={cta}>
          <Button className="bg-yellow-500">
            <span className="">Let&apos;s start</span>
          </Button>
        </Link>
      </motion.div>
      <div className="">
        <div className=""></div>
        <Image
          onContextMenu={(e) => e.preventDefault()}
          src={logo}
          alt="logo"
          className=""
        />
      </div>
    </div>
  );
};

export default Hero;
