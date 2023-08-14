import Lottie from 'lottie-react'
import notFoundAnimations from '../assets/animations/spacenotfound.json'
import { useNavigate } from 'react-router-dom'

export const NotFound = () => {
    const navigate = useNavigate()
    const handleGoToHome = () => {
        navigate('/')
    }
    return (
        <section className='flex flex-col items-center w-full h-full' >
            <div className='w-[50%] h-auto'>
                <Lottie animationData={notFoundAnimations} width={600} height={600}/>
            </div>
            
            <section className='flex flex-col justify-center gap-2'>
                <h1 className='text-4xl font-bold text-center'>Lo sentimos!</h1>
                <h2 className='text-xl font-bold text-center'>No encontramos la pagina</h2>
                <button className='m-auto mt-4 btn btn-primary' onClick={handleGoToHome}>Ir a inicio</button>
            </section>
        </section>
            
    )
}