import React from 'react'


function SeparationBar({ color = 'rgba(255,255,255,0.5)', thick = 1 }: { color?: string, thick?: number }) {
    return (
        <div style={
            {
                borderColor: color,
                borderWidth: `${thick}px`
            }
        } className="border w-full border-white/50"></div>
    )
}

export default SeparationBar