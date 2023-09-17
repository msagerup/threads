import Image from "next/image";
const Spinner = () => {
  return (
    <div className='flex h-[calc(100vh-200px)] justify-center items-center '>
      <Image
        height={60}
        width={60}
        alt='loading'
        src={"/assets/processing.png"}
        unoptimized={true} 
      />
    </div>
  );
};

export default Spinner;
