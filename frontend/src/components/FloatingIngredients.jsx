import { motion, useScroll, useTransform } from "framer-motion";
import React from "react";

const FloatingIngredients = () => {
    
  const { scrollY } = useScroll();

  const y1 = useTransform(scrollY, [0, 500], [0, 100]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);

  const floatAnimation = {
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <motion.img
        src="/assets/lemon.png"
        alt="Lemon"
        className="absolute hidden md:block left-10 w-100"
        style={{ y: y1 }}
        variants={floatAnimation}
        animate="animate"
        whileHover={{ scale: 1.2, rotate: 10 }}
      />
      <motion.img
        src="/assets/honey.png"
        alt="Coffee"
        className="absolute  right-10 w-100"
        style={{ y: y2 }}
        variants={floatAnimation}
        animate="animate"
        whileHover={{ scale: 1.2, rotate: -10 }}
      />
      <motion.img
        src="/assets/coffee.png"
        alt="Honey"
        className="absolute hidden md:block left-140 w-100"
        style={{ y: y1 }}
        variants={floatAnimation}
        animate="animate"
        whileHover={{ scale: 1.2, rotate: 5 }}
      />
    </div>
  );
};

export default FloatingIngredients;
