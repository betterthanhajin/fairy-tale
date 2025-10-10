"use client";

export const Deco = () => {
    return (
        <section className="flex justify-center">
          <div className="absolute bottom-0 left-0 right-0 overflow-hidden z-10">
                <div className="circleAnimation transition-delay flex">
                    {/* 원본 */}
                    {Array.from({ length: 1 }).map((_, index) => (
                        <div 
                            key={`original-${index}`}
                            className="w-24 h-24 rounded-full bg-blue-400 flex-shrink-0"
                        />
                    ))}
                    
                    {/* 복사본 (끊김 없는 무한 스크롤) */}
                    {/* {Array.from({ length: 12 }).map((_, index) => (
                      <div 
                            key={`copy-${index}`}
                            className="w-24 h-24 rounded-full bg-green-600 flex-shrink-0"
                        />
                    ))} */}
                </div>
            </div>
      </section>
    )
};