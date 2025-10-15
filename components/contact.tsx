export const Contact = () => {
    return (
        <section id="section-3" className="bg-gradient-to-br from-[#EEAECA] via-[#C0B5DA] to-[#94BBE9] w-full h-[250px] flex flex-col justify-center items-center" style={{color: "white"}}>
            <h2 className="text-3xl">Get In Touch</h2>
            <p>새로운 기회와 도전을 환영합니다. 언제든지 연락주세요!</p>
            <div className="contact-links flex gap-4">
                <a href="mailto:better.dev@kakao.com" className="contact-link">📧 Email</a>
                <a href="https://github.com/betterthanhajin" className="contact-link">💻 GitHub</a>
            </div>
        </section>
    )
};