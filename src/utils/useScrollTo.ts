import React, {useCallback} from "react";

type ScrollOptions = {
    headerOffset?: number;
    scrollBehavior?: ScrollBehavior;
};

export default function useScrollTo<T extends HTMLElement | null>(
    target: React.RefObject<T> | T,
    options: ScrollOptions = {}
) {
    return useCallback(() => {
        if (target === null) {
            return;
        }
        const current = target instanceof HTMLElement ? target : target.current;
        const {scrollBehavior = "auto", headerOffset = 0} = options;
        if (current) {
            const scrollTarget = current.offsetTop - headerOffset;
            window.scroll({top: scrollTarget, behavior: scrollBehavior});
        }
    }, [options, target]);
}
