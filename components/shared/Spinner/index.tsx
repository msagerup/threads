import Image from "next/image";
const Spinner = ({isComponent}: {isComponent?: boolean}) => {
  return (
    <div className={`${isComponent ? 'h-auto' : 'h-[calc(100vh-200px)]'} flex  justify-center items-center`}>
      <Image
        height={60}
        width={60}
        alt='loading'
        src={"/assets/processing.png"}
        unoptimized={true}
        priority={true}
      />
    </div>
  );
};

export default Spinner;
