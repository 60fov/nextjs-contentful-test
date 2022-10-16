import Logo from "../../components/Logo"

import { fetchBlogPostNames, fetchBlogPostByTitle } from "../../lib/api"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

export default function Post({ title, creation, body }) {
    // console.log("props", props);
    return (
        <>
            <Logo></Logo>
            <article
                className={"w-1/2 mx-auto mb-32"}>
                <h1 className="text-6xl">{title}</h1>
                <p>{creation}</p>
                {documentToReactComponents(body.json)}
            </article>
        </>
    )
}

export async function getStaticPaths() {
    const names = await fetchBlogPostNames();
    const paths = names.map(title => ({
        params: { id: title }
    }));

    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps(context) {
    const doc = await fetchBlogPostByTitle(context.params.id);
    return {
        props: doc
    }
}