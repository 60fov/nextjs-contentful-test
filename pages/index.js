import Logo from "../components/Logo"
import EntryList from "../components/EntryList"

import { fetchEntries, fetchBlogPostNames } from "../lib/api"

export default function Home({ entries }) {
    return (
        <>
            <Logo></Logo>
            <main className="">
                <EntryList entries={entries}></EntryList>
            </main>
        </>
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