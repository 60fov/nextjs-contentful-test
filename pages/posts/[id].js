import { fetchBlogPostNames } from "../../lib/api"

export default function Post({ params }) {
    console.log("fromstaticprops", params);
    return (
        <>

        </>
    )
}

export async function getStaticPaths() {
    const names = await fetchBlogPostNames();
    const paths = names.map(({title}) => ({
        params: { id: title }
    }));

    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({params}) {
    return {
        props: { params }
    }
}