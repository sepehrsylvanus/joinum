import { useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Notifications = () => {
  return <Notifs />;
};

export const Notifs = () => {
  const locale = useLocale();
  return (
    <Link
      href={`/${locale}/message/direct`}
      passHref
      prefetch={true}
      className="w-full flex justify-between items-stretch"
    >
      <div className="w-3/4 overflow-hidden">
        <div className="flex w-full gap-2">
          <figure className="flex w-[50px] rounded-full h-[50px] items-center justify-center">
            <Image
              src="https://github.com/shadcn.png"
              alt={"person-icon"}
              width={50}
              height={50}
            />
          </figure>
          <div className={"w-2/3 flex flex-wrap"}>
            <div className="w-full font-bold">Mehdi</div>
            <div className="w-full text-gray-500 line-clamp-1  text-[12px]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ut
              feugiat
            </div>
          </div>
        </div>
      </div>
      <div className="w-1/4 flex flex-wrap items-center justify-end">
        <div className="w-full text-gray-400 text-[10px] text-end">
          20 hours ago
        </div>
        {/*<span className="w-2 h-2 bg-sky-500 rounded-full"></span>*/}
      </div>
    </Link>
  );
};

export default Notifications;
