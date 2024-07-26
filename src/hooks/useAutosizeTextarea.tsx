import React, { useEffect } from "react";

export default function useAutosizeTextarea(ref: React.RefObject<HTMLTextAreaElement>, value: string) {
    useEffect(() => {
        if (!ref.current || !value) return;
        const scrollHeight = ref.current?.scrollHeight ?? 30;
        ref.current.style.height = scrollHeight + "px";
    }, [ref, value])
}
