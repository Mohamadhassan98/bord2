import React from "react";

export interface HiddenScrollProps {
    horizontal?: boolean;
    vertical?: boolean;
    children: JSX.Element;
    outerClassName?: string;
    innerClassName?: string;
}

export const VerticalHiddenScroll = ({
    children,
    innerClassName,
    outerClassName,
}: Pick<HiddenScrollProps, "children" | "innerClassName" | "outerClassName">) => {
    return (
        <div style={{width: "100%", height: "100%", overflow: "hidden"}} className={outerClassName}>
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    marginInlineEnd: -50,
                    paddingInlineEnd: 50,
                    overflowY: "scroll",
                }}
                className={innerClassName}
            >
                {children}
            </div>
        </div>
    );
};

export const HorizontalHiddenScroll = ({
    children,
    outerClassName,
    innerClassName,
}: Pick<HiddenScrollProps, "children" | "innerClassName" | "outerClassName">) => {
    return (
        <div style={{width: "100%", height: "100%", overflow: "hidden"}} className={outerClassName}>
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    marginBottom: -50,
                    paddingBottom: 50,
                    overflowY: "hidden",
                    overflowX: "scroll",
                }}
                className={innerClassName}
            >
                {children}
            </div>
        </div>
    );
};

export const BidirectionalHiddenScroll = ({
    children,
    innerClassName,
    outerClassName,
}: Pick<HiddenScrollProps, "children" | "innerClassName" | "outerClassName">) => {
    return (
        <div style={{width: "100%", height: "100%", overflow: "hidden"}} className={outerClassName}>
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    marginBottom: -50,
                    paddingBottom: 50,
                    marginInlineEnd: -50,
                    paddingInlineEnd: 50,
                    overflow: "hidden",
                }}
                className={innerClassName}
            >
                {children}
            </div>
        </div>
    );
};
