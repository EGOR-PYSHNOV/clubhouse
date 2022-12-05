import Link from "next/link";
import React from "react";
import Image from "next/image";

export const BackButton = function BackButton(props: {
  title: string;
  href: string;
}) {
  return (
    <Link href={props.href} passHref>
      <div className="d-flex mb-30 cup">
        <Image
          src="/static/back-arrow.svg"
          width="24px"
          height="24px"
          alt="Back"
          className="mr-10"
        />
        <h3>{props.title}</h3>
      </div>
    </Link>
  );
};
