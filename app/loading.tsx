import Image from "next/image";

export default function Loading() {
  return (
    <div className="w-full h-screen flex justify-center items-center bg-white">
      <div  className=" rounded-full  p-4">
        <Image id="img"
          alt="Loading certificate"
          height={100}
          width={100}
          src="/cr.png"
          className="rounded-full"
        />
      </div>
    </div>
  );
}
