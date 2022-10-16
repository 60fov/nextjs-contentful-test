const QUERY_ENTRY = `
{
  blogPostCollection {
    items {
      sys {
        id
      }
      title
      creation
    }
  }
}
`

const QUERY_NAME = `
query blogPostNames {
  blogPostCollection {
    items {
      title
    }
  }
}
`

const QUERY_POST = `
query getBlogByTitle($title: String!) {
  blogPostCollection (where: {title: $title}) {
    items {
      title
      creation
      body {
        json
      }
    }
  }
}
`
// TODO: type system, query + variables is easy to mess up
async function queryGraphQL(query, variables = {}, preview = false) {
  const url = `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`;

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${preview
        ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
        : process.env.CONTENTFUL_ACCESS_TOKEN
        }`,
    },
    body: JSON.stringify({ query, variables })
  }

  return fetch(url, options).then((resp) => resp.json());
}

function extractEntries(resp) {
  return resp?.data?.blogPostCollection?.items.map((entry) => {
    return {
      id: entry.sys.id,
      title: entry.title,
      creation: entry.creation
    }
  });
}


export async function fetchEntries() {
  const entries = await queryGraphQL(QUERY_ENTRY);
  return extractEntries(entries);
}

export async function fetchBlogPostNames() {
  const names = await queryGraphQL(QUERY_NAME);
  return names?.data?.blogPostCollection?.items?.flatMap((obj => obj.title));
}

export async function fetchBlogPostByTitle(title) {
  const post = await queryGraphQL(QUERY_POST, { title });
  return post?.data?.blogPostCollection?.items?.[0];
}

// ---------- LEGACY -------------
async function _fetchGraphQL(query, preview = false) {
  return fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${preview
          ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
          : process.env.CONTENTFUL_ACCESS_TOKEN
          }`,
      },
      body: JSON.stringify({ query }),
    }
  ).then((response) => response.json())
}