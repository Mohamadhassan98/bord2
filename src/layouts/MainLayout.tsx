import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function ({children, header}: {children: React.ReactElement | React.ReactElement[]; header?: boolean}) {
    const ref = React.useRef<HTMLDivElement | null>(null);
    return (
        <>
            {header && <Header footerRef={ref} />}
            {children}
            {header && <Footer scrollRef={ref} />}
        </>
    );
}
