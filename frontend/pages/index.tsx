import React from "react";
import { WelcomeStep } from "../components/steps/WelcomeStep";
import { EnterNameStep } from "../components/steps/EnterNameStep";
import { GoogleStep } from "../components/steps/GoogleStep";
import { ChooseAvatarStep } from "../components/steps/ChooseAvatarStep";
import { EnterPhoneStep } from "../components/steps/EnterPhoneStep";
import { EnterCodeStep } from "../components/steps/EnterCodeStep";
import { User } from "../types";
import { checkAuth } from "../utils/checkAuth";
import { GetServerSidePropsContext } from "next";
import { axios } from "../core/axios";

const stepsComponents = {
  0: WelcomeStep,
  1: GoogleStep,
  2: EnterNameStep,
  3: ChooseAvatarStep,
  4: EnterPhoneStep,
  5: EnterCodeStep,
};

type MainContextProps = {
  onNextStep: () => void;
  setFieldValue: (field: keyof User, value: string) => void;
  setUserData: React.Dispatch<React.SetStateAction<User>>;
  step: number;
  userData: User;
};

export const MainContext = React.createContext<MainContextProps>(
  {} as MainContextProps
);
const getUserData = (): User | null => {
  try {
    return JSON.parse(window.localStorage.getItem("userData"));
  } catch (error) {
    return null;
  }
};

const getFormStep = (): number => {
  const json = getUserData();

  if (json) {
    if (json.phone) {
      return 5;
    } else {
      return 4;
    }
  }
  return 0;
};

export default function Home() {
  const [step, setStep] = React.useState<number>(0);
  const [userData, setUserData] = React.useState<User>();
  const Step = stepsComponents[step];

  const onNextStep = () => {
    setStep((prev) => prev + 1);
  };

  const setFieldValue = (field: string, value: string) => {
    setUserData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const json = getUserData();
      if (json) {
        setUserData(json);
        setStep(getFormStep());
      }
    }
  }, []);

  React.useEffect(() => {
    window.localStorage.setItem(
      "userData",
      userData ? JSON.stringify(userData) : ""
    );
    axios.defaults.headers["Authorization"] = `bearer ${userData?.token}`;
  }, [userData]);

  return (
    <MainContext.Provider
      value={{ step, onNextStep, userData, setUserData, setFieldValue }}
    >
      <Step />
    </MainContext.Provider>
  );
}
export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const user = await checkAuth(ctx);

    if (user) {
      return {
        props: {},
        redirect: {
          destination: "/rooms",
          permanent: false,
        },
      };
    }
  } catch (err) {}

  return { props: {} };
};
