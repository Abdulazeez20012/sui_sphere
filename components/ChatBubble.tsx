import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X } from 'lucide-react';
import { ChatWindow } from './ChatWindow';

export const ChatBubble: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <AnimatePresence>
        {isOpen && <ChatWindow onClose={() => setIsOpen(false)} />}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 z-50 w-16 h-16 rounded-full bg-gradient-to-br from-[var(--aqua-gradient-start)] to-[var(--aqua-gradient-end)] text-white flex items-center justify-center shadow-lg"
        style={{ boxShadow: '0 0 20px var(--aqua-gradient-start)' }}
        aria-label="Toggle AI Assistant"
        data-magnetic
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={isOpen ? 'close' : 'open'}
            initial={{ opacity: 0, rotate: -45, scale: 0.5 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 45, scale: 0.5 }}
            transition={{ duration: 0.2 }}
          >
            {isOpen ? <X size={28} /> : <Bot size={28} />}
          </motion.div>
        </AnimatePresence>
      </motion.button>
    </>
  );
};