import Image from "next/image"


export const Hero = () => {
    return (
        <section className="relative">
            <div className="absolute p-4 text-white font-extrabold text-3xl">
                <h3 className="text-sm">Product Engineer</h3>
                <h5>LEE</h5>
                <h1>HAJIN</h1>
            </div>
            <Image
                className="dark:invert"
                src="/image/main.png"
                alt="main"
                width={1900}
                height={700}
                priority
            />
      </section>
    )
}

export default Hero;