import { LIST_GNB } from "@/constant/constant";
import Image from "next/image";

import MenuButton from "/public/assets/icons/ic_menu.svg";
import { useRouter } from "next/navigation";

export default function GnbList({ lg }: { lg?: string; className?: string }) {
  //const md = breakpoint;
  const router = useRouter();
  return (
    <div>
      {lg ? (
        <div className="md:flex-1 lg:ml-20 lg:flex lg:gap-10">
          {LIST_GNB.map(({ idx, label, path }) => (
            <button key={idx} onClick={() => router.push(path)} className="cursor-pointer">
              <span className="text-black-500 text-lg font-bold">{label}</span>
            </button>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <button className="cursor-pointer">
            <Image src={MenuButton} alt="메뉴 버튼" height={26} width={26} />
          </button>
        </div>
      )}
    </div>
  );
}
