/* eslint-disable react/prop-types */
import { AnimatePresence, motion } from "framer-motion";
import BlackScreenPopover from "./BlackScreenPopover";
import Title2 from "./Title2";
import Button from "./Button";

export default function ConfirmDelete({
  isLoading,
  onConfirm,
  onCancel,
  isShow,
  text,
}) {
  return (
    <>
      <AnimatePresence>
        {isShow && (
          <div className="fixed z-[2000] top-0 left-0 w-screen h-screen flex items-center justify-center">
            <BlackScreenPopover onClick={onCancel} isLoading={isLoading} />
            <motion.div
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -100 }}
              transition={{ duration: 0.3 }}
              className={` ${
                isLoading && "pointer-events-none"
              } relative overflow-hidden bg-section  w-[24rem] px-7 sm:px-10 flex flex-col items-center text-center justify-center sm:w-[30rem] mx-10 min-h-[25rem] sm:min-h-[25rem] p-5 z-[1] rounded-2xl shadow-md`}
            >
              <i className="fa-solid fa-triangle-exclamation fa-2xl scale-[5] text-red-400 py-20 mb-2"></i>
              <Title2 title={"Delete items"} className="pb-0" />
              <h1>
                Are you sure want to delete
                <b> {text ?? "this item"}</b>
              </h1>
              <div className="flex w-fit gap-4 mt-5">
                <Button onClick={onCancel} variant="secondary">
                  <i className="fa-solid fa-pen mr-2 scale-[0.95] fa-lg"></i>{" "}
                  Cancel
                </Button>
                <Button variant="red" onClick={onConfirm} className={`ml-auto`}>
                  <i className="fa-solid fa-trash mr-2 scale-[0.95] fa-lg"></i>{" "}
                  Delete
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
