import Image from "next/image"

import JDS_WHITE from "../public/jds_white.svg"

export default function Logo() {
    return (
        <div
        className={"w-16"}>
            <Image 
            className={"object-contain"} 
            src={JDS_WHITE} 
            alt="j$ logo"/>
        </div>
    )
}