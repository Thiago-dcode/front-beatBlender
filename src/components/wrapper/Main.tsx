import React from "react";

export default function Main({ children }: { children: React.ReactNode }) {

    return (
        <main className="  w-full  h-screen flex flex-col items-center justify-start gap-4 px-4">
            {children}
        </main>
    );
}
