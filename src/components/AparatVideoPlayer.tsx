import React from "react";
import "./styles/AparatVideoPlayer.css";

export default function ({src, srcType, title}: {src: string; srcType: "hash" | "embed" | "url"; title?: string}) {
    let source = "";
    switch (srcType) {
        case "embed":
            source = src;
            break;
        case "hash":
            source = `https://www.aparat.com/video/video/embed/videohash/${src}/vt/frame?&recom=none`;
            break;
        case "url": {
            const hash = src.split("/").pop();
            source = `https://www.aparat.com/video/video/embed/videohash/${hash}/vt/frame?&recom=none`;
            break;
        }
        default:
            break;
    }
    return (
        <div className='h_iframe-aparat_embed_frame'>
            <span style={{display: "block", paddingTop: "57%"}} />
            <iframe src={source} allowFullScreen title={title} />
        </div>
    );
}
