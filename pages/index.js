import Logo from "../components/Logo"
import EntryList from "../components/EntryList"

import { fetchEntries, fetchBlogPostNames } from "../lib/api"

export default function Home({entries}) {
    return (
        <main className="m-4">
            <Logo></Logo>
            <EntryList entries={entries}></EntryList>
        </main>
    )
}

export async function getStaticProps(context) {
    const entries = await fetchEntries();
    return {
        props: {
            entries
        }
    }
}