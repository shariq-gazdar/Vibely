import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
function SideNotify({ children, show, onClose, code }) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose(); // hide the popup after 2 seconds
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.5 }}
          className="fixed top-10 right-5
           text-white p-2 rounded-lg shadow-lg z-50"
          style={{
            backgroundColor: code === "success" ? "#4CAF50" : "#F44336",
          }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default SideNotify;
