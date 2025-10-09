import Image from "next/image";

export default function Home() {
  return (
        <Image
          className="dark:invert"
          src="/image/main.png"
          alt="main"
          width={1900}
          height={700}
          priority
        />
  );
}
