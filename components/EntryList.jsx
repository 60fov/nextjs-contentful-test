import EntryListItem from "./EntryListItem"

export default function EntryList({ entries }) {
    // console.log("enties", entries)
    return (
        <ul
            className="w-1/2 mx-auto">
            {entries.map((entry, i) => {
                {/* console.log(entry) */}
                return <EntryListItem key={i} {...entry}></EntryListItem>
            })}
        </ul>
    )
}