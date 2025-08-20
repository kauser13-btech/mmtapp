
const ScrollAnimation = () => {
    return (
        <div className="mouse_scroll absolute top-[58%] -right-10 max-lg:hidden">
            <div className="mouse">
                <div className="wheel"></div>
            </div>
            <div>
                <span className="m_scroll_arrows unu"></span>
                <span className="m_scroll_arrows doi"></span>
                <span className="m_scroll_arrows trei"></span>
            </div>
        </div>
    )
}

export default ScrollAnimation