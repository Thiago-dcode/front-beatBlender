import React from "react";
import { cn } from "@/lib/utils";
export default function Section({ className = '', children, flex = 'row', style = {} }: { className?: string, children: React.ReactNode, style?: React.CSSProperties, flex?: 'col' | 'row' }) {
    return (
        <section style={style} className={cn(`w-full flex flex-${flex} items-center justify-center px-1 py-4 md:px-5`, className)}>
            {children}
        </section>
    ); 
}
