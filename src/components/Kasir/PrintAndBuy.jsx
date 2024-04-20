/* eslint-disable react/prop-types */
import { AnimatePresence, motion } from "framer-motion";
import BlackScreenPopover from "../BlackScreenPopover";
import Title2 from "../Title2";
import Button from "../Button";

const PrintAndBuy = ({ showPopover, togglePopover, handlePrint }) => {
  return (
    <>
      <AnimatePresence>
        {showPopover && (
          <div className="fixed z-[1000] top-0 left-0 w-screen h-screen flex items-center justify-center">
            <BlackScreenPopover onClick={togglePopover} />
            <motion.div
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -100 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className={`bg-thirdyThin flex flex-col justify-between relative w-[30rem] h-[9rem] max-h-[95%] overflow-hidden p-5 z-[1] rounded-2xl shadow-lg 
             `}
            >
              <Title2 title={"Print the transaction?"} />
              <div className="grid grid-cols-2 gap-3">
                <Button variant={"transparent"} onClick={togglePopover}>
                  <i className="fa-solid fa-arrow-left rotate-[45deg] mr-2"></i>
                  Back
                </Button>
                <Button onClick={handlePrint}>
                  Print
                  <i className="fa-solid fa-print ml-2"></i>
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PrintAndBuy;
