import cn from "classnames";
import Link from "next/link";
import React from "react";
import { Button } from "../Button";

import styles from "./Room.module.scss";

interface RoomProps {
  title: string;
}

export const Room: React.FC<RoomProps> = ({ title }) => {
  return (
    <div className={styles.wrapper}>
      <div className="d-flex align-items-center justify-content-between">
        <h2>{title}</h2>
        <div className={cn("d-flex align-items-center", styles.actionButtons)}>
          <Link href="/rooms">
            <Button color="gray" className={styles.leaveButton}>
              <img
                width={18}
                height={18}
                src="/static/peace.png"
                alt="Hand black"
              />
              Leave quietly
            </Button>
          </Link>
        </div>
      </div>

      <div className="users">
        {/* {isLoading && <div className="loader"></div>} */}
        {/* {users.map((obj) => (
              <User {...obj} />
            ))} */}
      </div>
    </div>
  );
};
