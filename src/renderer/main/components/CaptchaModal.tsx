import { motion, AnimatePresence } from 'motion/react'
import Captcha from '@renderer/components/captcha'

interface CaptchaModalProps {
  isOpen: boolean
  captchaImage: string
  token: string
  onSubmit: (solution: { code: string; token: string }) => void
  onClose: () => void
  refresh: () => Promise<{ token: string; captcha: string }>
}

export default function CaptchaModal({
  isOpen,
  captchaImage,
  token,
  onSubmit,
  onClose,
  refresh
}: CaptchaModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-md overflow-hidden bg-white shadow-2xl rounded-xl h-100 min-h-fit"
            onClick={(e) => e.stopPropagation()}
          >
            <Captcha
              values={{ code: '', token }}
              captcha={captchaImage}
              refresh={refresh}
              send={function (data: { token: string; code: string }) {
                onSubmit(data)
              }}
              cancel={function (): void {
                onClose()
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
