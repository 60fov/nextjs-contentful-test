import Link from "next/link"

export default function EntryListItem({title, creation}) {
    // console.log(title, creation)
    return (
        <Link 
        href={`/posts/${title}`}>
            <li
            className={"cursor-pointer w-full flex justify-between"}>
                {/* TODO: link */}
                <span className="border-b-4 border-white border-solid">{title}</span>
                {/* TODO: format */}
                <span>{creation}</span>
            </li>
        </Link>        
    )
}