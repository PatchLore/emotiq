'use client';

import { AnimatePresence, motion } from 'framer-motion';

type ToastProps = {
  visible: boolean;
  message: string;
};

const Toast = ({ visible, message }: ToastProps) => {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="toast"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{
            duration: 0.4,
            ease: [0.34, 1.56, 0.64, 1]
          }}
        >
          <span className="toast-icon">?</span>
          <span>{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;


