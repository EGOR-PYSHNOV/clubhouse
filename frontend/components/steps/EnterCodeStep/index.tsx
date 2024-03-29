import React from "react";
import cn from "classnames";
import { useRouter } from "next/router";
import { WhiteBlock } from "../../WhiteBlock";
import { Button } from "../../Button";
import { StepInfo } from "../../StepInfo";
import { axios } from "../../../core/axios";

import styles from "./EnterCodeStep.module.scss";
import { MainContext } from "../../../pages";

export const EnterCodeStep = () => {
  const router = useRouter();
  const { userData } = React.useContext(MainContext);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [codes, setCodes] = React.useState(["", "", "", ""]);

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const index = Number(event.target.getAttribute("id"));
    const value = event.target.value;
    setCodes((prev) => {
      const newArr = [...prev];
      newArr[index] = value;
      return newArr;
    });
    if (event.target.nextSibling) {
      (event.target.nextSibling as HTMLInputElement).focus();
    } else {
      onSubmit([...codes, value].join(""));
    }
  };

  const onSubmit = async (code: string) => {
    try {
      setIsLoading(true);
      await axios.post("/auth/sms/activate", {
        code,
        user: userData,
      });
      router.push("/rooms");
    } catch (error) {
      alert("Error while activate code");
      setCodes(["", "", "", ""]);
    }

    setIsLoading(false);
  };

  return (
    <div className={styles.block}>
      {!isLoading ? (
        <>
          <StepInfo
            icon="/static/numbers.png"
            title="Enter your activate code"
          />
          <WhiteBlock className={cn("m-auto mt-30", styles.whiteBlock)}>
            <div className={styles.codeInput}>
              {codes.map((code, index) => (
                <input
                  key={index}
                  type="tel"
                  placeholder="X"
                  maxLength={1}
                  id={String(index)}
                  onChange={handleChangeInput}
                  value={code}
                />
              ))}
            </div>
          </WhiteBlock>
        </>
      ) : (
        <div className="text-center">
          <div className="loader"></div>
          <h3 className="mt-5">Activation in progress ...</h3>
        </div>
      )}
    </div>
  );
};
