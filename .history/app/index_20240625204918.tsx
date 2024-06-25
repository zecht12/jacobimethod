import JacobiMethod from '@/components/JacobiMethod'
import { PaperProvider } from 'react-native-paper'

export default function index() {
    const reduceMotion = useReducedMotion();

    if (reduceMotion) {
      // display static content ✨
    } else {
      // run animations ✨
    }
    return (
        <PaperProvider>
            <JacobiMethod/>
        </PaperProvider>
    )
}
