import React from "react";

export default function Section({ children }: { children: React.ReactNode }) {
    return (
        <section className="w-full flex  items-center justify-center pt-4">
            {children}
        </section>
    );
}
