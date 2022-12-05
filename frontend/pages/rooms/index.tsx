import { axios } from "../../core/axios";
import { GetServerSideProps } from "next";
import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import Head from "next/head";
import { checkAuth } from "../../utils/checkAuth";
import { useState } from "react";
import { StartRoomModal } from "../../components/StartRoomModal";
import Link from "next/link";
import { ConversationCard } from "../../components/ConversationCard";
import { Api } from "../../api";
import { Room } from "../../api/RoomApi";

export default function RoomsPage(props: { rooms: Array<Room> }) {
  const [visibleModal, setVisibleModal] = useState(false);
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Clubhouse: Drop-in audio chat</title>
      </Head>

      <Header />
      <div className="container">
        <div className="mt-40 d-flex align-items-center justify-content-between">
          <h1>All conversations</h1>
          <Button onClick={() => setVisibleModal(true)} color="green">
            + Start room
          </Button>
        </div>
        <div className="grid mt-30">
          {props.rooms.map((room) => (
            <Link key={room.id} href={`/rooms/${room.id}`}>
              <a className="d-flex">
                <ConversationCard
                  id={room.id}
                  title={room.title}
                  avatars={[]}
                  speakers={room.speakers}
                  listenersCount={room.listenersCount}
                />
              </a>
            </Link>
          ))}
        </div>
      </div>
      {visibleModal && (
        <StartRoomModal onClose={() => setVisibleModal(false)} />
      )}
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const user = await checkAuth(ctx);

    console.log(user);

    if (!user) {
      return {
        props: {},
        redirect: {
          permanent: false,
          destination: "/",
        },
      };
    }
    const rooms = await Api(ctx).getRooms();

    return {
      props: {
        user,
        rooms,
      },
    };
  } catch (error) {
    console.log("ERROR!");
    return {
      props: {
        rooms: [],
      },
    };
  }
};
