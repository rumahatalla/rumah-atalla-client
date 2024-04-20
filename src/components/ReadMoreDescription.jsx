/* eslint-disable react/prop-types */
import { AnimatePresence, motion } from "framer-motion";
import Button from "./Button";

export default function ReadMoreDescription({
  description,
  handleClose,
  readMore,
}) {
  return (
    <AnimatePresence>
      {readMore && (
        <div className="fixed z-[1500] top-0 left-0 w-screen h-screen flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0 }}
            onClick={() => {
              handleClose(false);
            }}
            className={`  w-screen h-screen bg-[rgba(0,0,0,0.5)] backdrop-blur-sm absolute`}
          ></motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.2 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.2 }}
            transition={{ duration: 0.5, type: "spring" }}
            className={`  relative overflow-hidden bg-thirdyThin  w-[24rem] px-7 sm:px-10  h-[35rem] max-h-[95vh] sm:w-[40rem] mx-3 sm:mx-10  p-5 z-[1] rounded-2xl shadow-md flex justify-center flex-col`}
          >
            <div className="flex items-center h-fit gap-3 w-full mb-2">
              <div className="w-full h-1 bg-secondary rounded-[0.05rem] mt-3 shadow-md"></div>
              <h1 className="w-[40rem] sm:w-[25rem] text-[1.6rem] sm:text-[2rem] text-center font-semibold text-primaryNormal drop-shadow-md">
                Description
              </h1>
              <div className="w-full h-1 bg-secondary rounded-[0.05rem] mt-3 shadow-md"></div>
            </div>

            {/* FORM */}
            <div
              style={{ whiteSpace: "pre-wrap" }}
              className="w-full h-[75%] rounded-2xl shadow-lg p-3 overflow-y-scroll text-primaryDark bg-white"
            >
              {description}
            </div>

            <div className="w-full flex justify-center">
              <Button
                className={"mt-5 w-fit flex items-center justify-center"}
                onClick={() => handleClose(false)}
                variant={"secondary"}
              >
                <i className="fa-solid fa-arrow-left mr-2 fa-lg scale-[0.8] mt-1"></i>
                Back
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
