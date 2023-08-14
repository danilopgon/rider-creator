import { BandProvider } from "../context/BandContext"
import { BandCreator } from "../components/bandCreator/BandCreator"
import { StepOne } from "../components/bandCreator/stepOne"
import { StepTwo } from "../components/bandCreator/stepTwo"
import { StepFinal } from "../components/bandCreator/stepFinal"


export const CreateBand = () => {

    return (
        <BandProvider>
            <BandCreator>
            </BandCreator>
        </BandProvider>
    )
}