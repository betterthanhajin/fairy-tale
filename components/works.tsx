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
        <section className="h-full bg-gradient-to-br from-[#EEAECA] via-[#C0B5DA] to-[#94BBE9]">
            <div className="flex justify-center gap-2">
                
                 {workData.map((work) => (
                    <div 
                        key={work.id}
                        className="bg-pink-300 w-72 h-72 rounded-md p-2 mt-8 text-black"
                    >
                    {work.title}
                    {work.desc}
                    </div>
                ))}
            </div>
            <div className="flex justify-center gap-2">
                {/* 원본 */}
                {Array.from({ length: 4 }).map((_, index) => (
                    <div 
                        key={`original-${index}`}
                        className="bg-pink-300 w-72 h-72 rounded-md p-2 mt-8 text-black"
                    >
                    Works1
                    </div>
                ))}
            </div>
      </section>
    )
};