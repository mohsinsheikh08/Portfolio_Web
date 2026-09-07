
import {motion, type MotionProps} from 'framer-motion'
const Motion = ({children}: MotionProps) => {
  return (
    <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
    {children}
    </motion.div>
  )
}

export default Motion