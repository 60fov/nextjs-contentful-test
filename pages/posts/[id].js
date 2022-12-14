import Logo from "../../components/Logo"
import PostTime from "../../components/PostTime"

import { fetchBlogPostNames, fetchBlogPostByTitle } from "../../lib/api"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

export default function Post({ title, creation, body }) {
    // console.log("props", props);
    return (
        <>
            <Logo></Logo>
            <article
                className={"w-5/6 mx-auto mb-32 max-w-xl"}>
                <div 
                className="w-full flex items-end justify-between mb-12">
                    <h1 className="text-7xl mr-10">{title}</h1>
                    <PostTime creation={creation}/>
                </div>
                
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