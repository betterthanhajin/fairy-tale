"use client";


const workData = [
    {
        id:0,
        title:"AI 챗봇 라미챗 QR코드 공유기능",
        desc:"afadsfdasfsadfdsa"
    },

    {
        id:1,
        title:"AI 챗봇 라미챗 대시보드 개발",
        desc:"afadsfdasfsadfdsa"
    },

    {
        id:2,
        title:"AI 챗봇 라미 테마 기능 개발",
        desc:"afadsfdasfsadfdsa"
    },
    
    {
        id:3,
        title:"AI 이미지 생성 컴포넌트 개발",
        desc:"afadsfdasfsadfdsa"
    }

]

export const Works = () => {
    return (
        <section id="section-1" className="min-h-screen bg-gradient-to-br from-[#EEAECA] via-[#C0B5DA] to-[#94BBE9]">
            <div className="p-8">
                <h2 className="lg:text-3xl text-xl text-white font-extrabold">WORKS</h2>
            </div>
            <div className="flex flex-col lg:flex-row justify-center items-center gap-8 p-8">
                
                 {workData.map((work) => (
                    <div 
                        key={work.id}
                        className="bg-pink-300/50 w-full h-72 rounded-md p-2 mt-8 text-white font-medium"
                    >
                    {work.title}
                        <div>
                            {work.desc}
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-center gap-2">
                {/* 원본 */}
                {/* {Array.from({ length: 4 }).map((_, index) => (
                    <div 
                        key={`original-${index}`}
                        className="bg-pink-300 w-72 h-72 rounded-md p-2 mt-8 text-black"
                    >
                    Works1
                    </div>
                ))} */}
            </div>
      </section>
    )
};