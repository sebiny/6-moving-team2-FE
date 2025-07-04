import { LIST_GNB } from '@/constant/constant'
import Image from 'next/image';

import MenuButton from '/public/assets/icons/ic_menu.svg';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function GnbList({md} 
    : 
    {
        md?: string;
        className?: string;
    }) {
    //const md = breakpoint;
   const router = useRouter();
    return (
        <div >
            {md ? 
                (
                    <div className="md:flex md:gap-10 md:ml-20 sm:flex-1">
                        {LIST_GNB.map(({ idx, label, path }) => (
                            <button
                                key={idx}
                                onClick={() => router.push(path)}
                                className="cursor-pointer"
                            >
                                <span className="text-black-500 text-lg font-bold">{label}</span>
                            </button>
                        )) }
                    </div>
                ) : (
                <div className="flex justify-between items-center">
                    <button className="cursor-pointer"><Image src={MenuButton} alt="메뉴 버튼" height={26} width={26}/></button>
                </div>
            )}
        </div>
  )
}