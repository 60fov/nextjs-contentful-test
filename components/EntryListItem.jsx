import { useState } from "react"

import Link from "next/link"

import PostTime from "./PostTime"

export default function EntryListItem({ title, creation }) {
    // console.log(title, creation)

    const [isHovering, setHovering] = useState(false);

    const handleMouseOver = () => { setHovering(true) };
    const handleMouseOut = () => { setHovering(false) };

    return (
        <Link
            href={`/posts/${title}`}>
            <li
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
                className={"cursor-pointer w-full flex justify-between"}>
                <span className="border-b-4 border-white border-solid">{title}</span>
                {isHovering ? <PostTime creation={creation} /> : <></>}
            </li>
        </Link>
    )
}