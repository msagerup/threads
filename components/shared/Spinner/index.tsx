import Image from "next/image";
const Spinner = () => {
  return (
    <div className='flex h-screen justify-center items-center'>
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
