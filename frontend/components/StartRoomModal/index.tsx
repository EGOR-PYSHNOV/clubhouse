import cn from "classnames";
import { useRouter } from "next/router";
import React from "react";
import { RoomApi, RoomType } from "../../api/RoomApi";
import { Button } from "../Button";
import styles from "./StartRoomModal.module.scss";
import Image from "next/image";
import { axios } from "../../core/axios";

export const StartRoomModal = function StartRoomModal(props: {
  onClose: () => void;
}) {
  const router = useRouter();
  const [title, setTitle] = React.useState<string>("");
  const [type, setType] = React.useState<RoomType>("open");

  const onSubmit = async () => {
    try {
      if (!title) {
        return alert("Укажите заголовок комнаты");
      }
      const room = await RoomApi(axios).createRoom({
        title,
        type,
      });

      router.push(`/rooms/${room.id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.closeBtn}>
          <Image
            width="24px"
            height="24px"
            src="/static/close.svg"
            onClick={props.onClose}
            alt="Close"
          />
        </div>

        <div className="mb-30">
          <h3>Topic</h3>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={styles.inputTitle}
            placeholder="Enter the topic to be discussed"
          />
        </div>
        <div className="mb-30">
          <h3>Room type</h3>
          <div className="d-flex justify-content-between">
            <div
              onClick={() => setType("open")}
              className={cn(styles.roomType, {
                [styles.roomTypeActive]: type === "open",
              })}
            >
              <Image
                width="70px"
                height="70px"
                src="/static/room-type-1.png"
                alt="Room type"
              />
              <h5>Open</h5>
            </div>
            <div
              onClick={() => setType("social")}
              className={cn(styles.roomType, {
                [styles.roomTypeActive]: type === "social",
              })}
            >
              <Image
                width="70px"
                height="70px"
                src="/static/room-type-2.png"
                alt="Room type"
              />
              <h5>Social</h5>
            </div>
            <div
              onClick={() => setType("closed")}
              className={cn(styles.roomType, {
                [styles.roomTypeActive]: type === "closed",
              })}
            >
              <Image
                width="70px"
                height="70px"
                src="/static/room-type-3.png"
                alt="Room type"
              />
              <h5>Closed</h5>
            </div>
          </div>
        </div>
        <div className={styles.delimiter}></div>
        <div className="text-center">
          <h3>Start a room open to everyone</h3>
          <Button onClick={onSubmit} color="green">
            <Image
              width="18px"
              height="18px"
              src="/static/celebration.png"
              alt="Celebration"
            />
            Let's go
          </Button>
        </div>
      </div>
    </div>
  );
};
