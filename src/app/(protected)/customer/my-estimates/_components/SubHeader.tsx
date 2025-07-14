interface SubHeaderProps {
  title: string;
}

export default function SubHeader({ title }: SubHeaderProps) {
  return (
    <div className="border-line-100 flex items-center border-b bg-gray-50 px-6 py-4 shadow-[0px_2px_10px_rgba(248,248,248,0.10)] md:px-15 lg:px-103 lg:py-7">
      <h1 className="text-black-500 text-xl font-semibold sm:text-lg lg:text-xl lg:font-bold">{title}</h1>
    </div>
  );
}
