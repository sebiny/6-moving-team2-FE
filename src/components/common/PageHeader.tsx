"use client";

interface PageHeaderProps {
  title: string;
}

export default function PageHeader({ title }: PageHeaderProps) {
  return (
    <div className="flex h-[74px] w-full items-center bg-gray-50 px-6 shadow-[0px_2px_10px_0px_#F8F8F81A] md:h-[54px] md:justify-center md:px-12 lg:h-24">
      <h1 className="text-black-400 text-lg font-semibold md:w-[600px] lg:w-[1200px] lg:text-2xl">{title}</h1>
    </div>
  );
}
