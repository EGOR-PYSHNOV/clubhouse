import cn from "classnames";
import { WhiteBlock } from "../../WhiteBlock";
import { Button } from "../../Button";
import { StepInfo } from "../../StepInfo";
import styles from "./GoogleStep.module.scss";
import React from "react";
import { MainContext } from "../../../pages";
import Cookies from "js-cookie";
import { User } from "../../../types";

export const GoogleStep: React.FC = () => {
  const { onNextStep, setUserData } = React.useContext(MainContext);

  const onClickAuth = () => {
    const win = window.open(
      "http://localhost:3002/auth/google",
      "Auth",
      "width=500,height=500,status=yes,toolbar=no,menubar=no,location=no"
    );
  };

  React.useEffect(() => {
    window.addEventListener("message", ({ data }) => {
      const user: string = data;
      if (typeof user === "string" && user.includes("avatarUrl")) {
        Cookies.remove("token");
        const json: User = JSON.parse(user);
        setUserData(json);
        onNextStep();

        Cookies.set("token", json.token);
      }
    });
  }, [onNextStep, setUserData]);

  return (
    <div className={styles.block}>
      <StepInfo
        icon="/static/connect.png"
        title="Do you want import info from Twitter?"
      />
      <WhiteBlock
        className={cn("m-auto mt-40 d-flex flex-column", styles.whiteBlock)}
      >
        <div className={styles.avatar}>
          <b>AD</b>
          <svg
            width="100"
            height="100"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.5 50C0.5 30.5091 3.25846 18.1987 10.7286 10.7286C18.1987 3.25846 30.5091 0.5 50 0.5C69.4909 0.5 81.8014 3.25846 89.2714 10.7286C96.7415 18.1987 99.5 30.5091 99.5 50C99.5 69.4909 96.7415 81.8014 89.2714 89.2714C81.8014 96.7415 69.4909 99.5 50 99.5C30.5091 99.5 18.1987 96.7415 10.7286 89.2714C3.25846 81.8014 0.5 69.4909 0.5 50Z"
              fill="#E0E0E0"
              stroke="#D6D6D6"
            />
          </svg>
        </div>
        <h2 className="mb-40">Archakov Dennis</h2>
        <Button onClick={onClickAuth} className={styles.googleButton}>
          <img
            src="/static/google.svg"
            alt="Google logo"
            className={styles.googleLogo}
          />
          Import from Google
          <img className="d-ib ml-10" src="/static/arrow.svg" />
        </Button>
        <div className="link mt-20 cup d-ib">Enter my info manually</div>
      </WhiteBlock>
    </div>
  );
};
