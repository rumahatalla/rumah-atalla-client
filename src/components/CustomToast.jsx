/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import toast from "react-hot-toast";
import { AnimatePresence, motion } from "framer-motion";

export default function CustomToast({ t, message, type }) {
  return (
    <>
      <AnimatePresence>
        {t.visible && (
          <motion.div
            initial={{ opacity: 0, translateY: -100 }}
            animate={{ opacity: 1, translateY: 1 }}
            exit={{ opacity: 0, translateY: -100 }}
            transition={{
              duration: 0.1,
              type: "spring",
              stiffness: 60,
            }}
            className={` hover:scale-[0.98] max-w-md w-full bg-white shadow-lg rounded-2xl pointer-events-auto flex ring-1 ring-black ring-opacity-5 overflow-hidden`}
          >
            <div className="flex-1 w-0 p-4">
              <div className="flex h-full items-start">
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{
                    duration: 0.2,
                    type: "spring",
                    stiffness: 180,
                    delay: 0.2,
                  }}
                  className="flex items-center justify-center h-full pt-0.5 drop-shadow-sm"
                >
                  {type === "success" ? (
                    <>
                      <i className="fa-solid fa-circle-check fa-2xl text-green-400"></i>
                    </>
                  ) : type === "failed" ? (
                    <i className="fa-solid fa-circle-exclamation fa-2xl text-red-400"></i>
                  ) : (
                    type === "info" && (
                      <>
                        <i className="fa-solid fa-circle-info fa-2xl text-yellow-400"></i>
                      </>
                    )
                  )}
                </motion.div>
                <div className="ml-3 flex-1">
                  <motion.p
                    initial={{ opacity: 0, translateZ: 50 }}
                    animate={{ opacity: 1, translateX: 0 }}
                    exit={{ opacity: 0, translateZ: 50 }}
                    transition={{
                      duration: 0.2,
                      type: "spring",
                      stiffness: 150,
                      delay: 0.4,
                    }}
                    className={`text-sm drop-shadow-sm capitalize font-semibold`}
                  >
                    {type}
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, translateZ: 50 }}
                    animate={{ opacity: 1, translateX: 0 }}
                    exit={{ opacity: 0, translateZ: 50 }}
                    transition={{
                      duration: 0.2,
                      type: "spring",
                      stiffness: 150,
                      delay: 0.5,
                    }}
                    className="mt-1 text-sm text-gray-500"
                  >
                    {message}
                  </motion.p>
                </div>
              </div>
            </div>
            <div className="flex border-l border-gray-200 group hover:bg-red-400 transition-all duration-300">
              <motion.button
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{
                  duration: 0.2,
                  type: "just",
                  stiffness: 250,
                  delay: 0.4,
                }}
                onClick={() => toast.dismiss(t.id)}
                className="w-[5rem] border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center  group-hover:text-white text-primaryDark transition-all duration-300"
              >
                <i className="fa-solid fa-x"></i>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
