import { motion } from "framer-motion";

export default function LoadingPopover() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="absolute w-full h-full top-0 z-[100] left-0 flex items-center justify-center"
      >
        <div className="w-full h-full bg-[rgba(255,255,255,0.4)] absolute top-0 left-0 scale-[1.2]"></div>
        <div className="relative flex w-full h-full items-center justify-center">
          <motion.img
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            src="/loading.png"
            className="h-14 opacity-[0.7] animate-spin"
            alt=""
          />
        </div>
      </motion.div>
    </>
  );
}
