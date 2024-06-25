import JacobiMethod from '@/components/JacobiMethod'
import { PaperProvider } from 'react-native-paper'
import { useReducedMotion } from 'react-native-reanimated';

export default function index() {
    const reduceMotion = useReducedMotion();

    if (reduceMotion) {
        return (
            <PaperProvider>
                <JacobiMethod/>
            </PaperProvider>
        )
    }
}
