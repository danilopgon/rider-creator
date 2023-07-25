import Lottie from 'react-lottie'
import notFoundAnimations from '../assets/animations/spacenotfound.json'
import { useNavigate } from 'react-router-dom'
const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: notFoundAnimations,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }
}
export const NotFound = () => {
    const navigate = useNavigate()
    const handleGoToHome = () => {
        navigate('/')
    }
    return (
        <section className='w-full h-full' >
            <Lottie options={{animationData: notFoundAnimations,...defaultOptions}} width={600} height={600}/>
            <section className='flex flex-col justify-center gap-2'>
                <h1 className='text-4xl font-bold text-center'>Lo sentimos!</h1>
                <h2 className='text-xl font-bold text-center'>No encontramos la pagina</h2>
                <button className='m-auto mt-4 btn btn-primary' onClick={handleGoToHome}>Ir a inicio</button>
            </section>
        </section>
            
    )
}