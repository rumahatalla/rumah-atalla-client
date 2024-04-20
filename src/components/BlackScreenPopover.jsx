/* eslint-disable react/prop-types */
import { motion } from "framer-motion";

export default function BlackScreenPopover({
  onClick,
  isLoading,
  isShow = true,
  isBlack = true,
  isBlur = true,
}) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClick}
        className={` ${isLoading && "pointer-events-none"} w-screen h-screen ${
          isBlack ? "bg-[rgba(0,0,0,0.5)]" : "bg-transparent"
        } ${
          isShow
            ? "opacity-100 visible "
            : "opacity-0 invisible pointer-events-none"
        } top-0 left-0 ${isBlur && "backdrop-blur-sm"} fixed `}
      ></motion.div>
    </>
  );
}
