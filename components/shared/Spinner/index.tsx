import Image from "next/image";
const Spinner = ({
  isComponent,
  size = 60,
}: {
  isComponent?: boolean;
  size?: number
}) => {


  return (
    <div
      className={`${
        isComponent ? "h-auto" : "h-[calc(100vh-200px)]"
      } flex  justify-center items-center`}
    >
      <Image
        height={size}
        width={size}
        alt='loading'
        src={"/assets/processing.png"}
        unoptimized={true}
        priority={true}
      />
    </div>
  );
};

export default Spinner;
