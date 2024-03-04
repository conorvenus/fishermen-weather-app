function GlowCircle({ x, y, opacity, blur }) {
    return (
        <div 
            className={`absolute bg-blue w-full h-[200px] rounded-full pointer-events-none z-20`}
            style={{
                top: y + "px",
                left: x + "px",
                opacity: opacity,
                filter: `blur(${blur}px)`
            }}>
        </div>
    )
}

export default GlowCircle