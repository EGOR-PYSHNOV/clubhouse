import React from 'react'
import { WelcomeStep } from '../components/steps/WelcomeStep'
import { EnterNameStep } from '../components/steps/EnterNameStep'
import { GoogleStep } from '../components/steps/GoogleStep'
import { ChooseAvatarStep } from '../components/steps/ChooseAvatarStep'
import { EnterPhoneStep } from '../components/steps/EnterPhoneStep'
import { EnterCodeStep } from '../components/steps/EnterCodeStep'
import { User } from '../types'

const stepsComponents = {
    0: WelcomeStep,
    1: GoogleStep,
    2: EnterNameStep,
    3: ChooseAvatarStep,
    4: EnterPhoneStep,
    5: EnterCodeStep,
}

type MainContextProps = {
    onNextStep: () => void
    setFieldValue: (field: keyof User, value: string) => void
    setUserData: React.Dispatch<React.SetStateAction<User>>
    step: number
    userData: User
}

export const MainContext = React.createContext<MainContextProps>(
    {} as MainContextProps
)

export default function Home() {
    const [step, setStep] = React.useState<number>(0)
    const [userData, setUserData] = React.useState<User>()
    const Step = stepsComponents[step]

    const onNextStep = () => {
        setStep((prev) => prev + 1)
    }

    const setFieldValue = (field: string, value: string) => {
        setUserData((prev) => ({
            ...prev,
            [field]: value,
        }))
    }

    React.useEffect(() => {
        window.localStorage.setItem(
            'userData',
            userData ? JSON.stringify(userData) : ''
        )
    }, [userData])

    return (
        <MainContext.Provider
            value={{ step, onNextStep, userData, setUserData, setFieldValue }}
        >
            <Step />
        </MainContext.Provider>
    )
}
