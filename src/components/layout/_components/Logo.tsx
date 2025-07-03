import { useRouter } from 'next/navigation';
import imgLogo from '/public/assets/icons/ic_logo.svg'
import imgLogoText from '/public/assets/icons/ic_logo_text.svg'
import Image from 'next/image';


export default function Logo() {
  const router = useRouter();
  return (
    <button 
      className="flex justify-between items-center cursor-pointer" 
      onClick={()=> router.push("/")}
    >
     <Image src={imgLogo} alt="무빙 이미지 로고" className="w-8 h-8 md:w-11 md:h-11"/>
     <Image src={imgLogoText} alt="무빙 텍스트 로고" className="w-13 h-8 md:w-18 md:h-10"/>
    </button>
  )
}