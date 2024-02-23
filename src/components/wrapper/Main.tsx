import React from "react";

export default function Main({ children }: { children: React.ReactNode }) {
    return (
        <main className=" w-full h-screen flex flex-col items-center justify-start">
            {children}
        </main>
    );
}
