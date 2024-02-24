import React from "react";

export default function Section({ className = '', children, flex = 'row', style = {} }: { className?: string, children: React.ReactNode, style?: React.CSSProperties, flex?: 'col' | 'row' }) {
    return (
        <section style={style} className={`w-screen flex flex-${flex} px-10 items-center justify-center py-8 ${className}`}>
            {children}
        </section>
    );
}
