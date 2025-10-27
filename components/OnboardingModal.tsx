import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ONBOARDING_STEPS } from '../constants';
import { GlassCard } from './GlassCard';
import { LottiePlayer } from './LottiePlayer';
import { Button } from './Button';

interface OnboardingModalProps {
  onComplete: () => void;
}

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', damping: 25, stiffness: 200 } },
  exit: { opacity: 0, y: 50, scale: 0.95 },
};

export const OnboardingModal: React.FC<OnboardingModalProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);

  const handleNext = () => {
    if (step < ONBOARDING_STEPS.length - 1) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };
  
  const currentStepData = ONBOARDING_STEPS[step];

  return (
    <motion.div
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className="fixed inset-0 bg-black/70 backdrop-blur-md z-[100] flex items-center justify-center p-4"
    >
      <motion.div variants={modalVariants} exit="exit" className="w-full max-w-lg">
        <GlassCard className="p-8 text-center relative overflow-hidden">
          <motion.button
            onClick={onComplete}
            className="absolute top-4 right-6 text-sm text-gray-500 hover:text-white transition-colors z-10"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Skip onboarding"
            data-magnetic
          >
            Skip
          </motion.button>

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center"
            >
              <LottiePlayer animationData={currentStepData.lottieData} className="w-48 h-48 md:w-64 md:h-64" />
              <h2 className="font-heading text-3xl font-bold mt-6 text-gradient">{currentStepData.title}</h2>
              <p className="mt-4 text-gray-300 dark:text-gray-400 max-w-sm">{currentStepData.description}</p>
            </motion.div>
          </AnimatePresence>
          
          {/* Progress Dots */}
          <div className="flex justify-center gap-2 my-8">
            {ONBOARDING_STEPS.map((_, i) => (
              <motion.div
                key={i}
                className={`h-2 rounded-full transition-all duration-300 ${i === step ? 'w-6 bg-[var(--primary-blue)]' : 'w-2 bg-white/20'}`}
                animate={{ width: i === step ? 24 : 8 }}
              />
            ))}
          </div>
          
          {/* Controls */}
          <div className={`flex items-center ${step > 0 ? 'justify-between' : 'justify-end'}`}>
            <AnimatePresence>
              {step > 0 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <Button variant="secondary" onClick={handleBack} data-magnetic>Back</Button>
                </motion.div>
              )}
            </AnimatePresence>
            
            {step === ONBOARDING_STEPS.length - 1 ? (
                 <Button onClick={onComplete} variant="primary" style={{boxShadow: '0 0 20px var(--primary-blue)'}} data-magnetic>
                    Connect Wallet
                 </Button>
            ) : (
                <Button onClick={handleNext} data-magnetic>Next</Button>
            )}
          </div>
        </GlassCard>
      </motion.div>
    </motion.div>
  );
};