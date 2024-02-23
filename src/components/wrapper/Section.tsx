import React from "react";

export default function Section({ children ,style={}}: { children: React.ReactNode,style?: React.CSSProperties}) {
    return (
        <section style={style} className="w-screen flex px-10 items-center justify-center py-8">
            {children}
        </section>
    );
}
