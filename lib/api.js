const ENTRY_QUERY = `
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

const NAME_QUERY = `
{
  blogPostCollection {
    items {
      sys {
        id
      }
      title
    }
  }
}
`

async function fetchGraphQL(query, preview = false) {
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

function extractEntries(resp) {
    return resp?.data?.blogPostCollection?.items.map((entry) => {
        return {
            id: entry.sys.id,
            title: entry.title,
            creation: entry.creation
        }
    });
}

function extractBlogPostNames(resp) {
    return resp?.data?.blogPostCollection?.items.map((entry) => {
        return {
            title: entry.title,
            id: entry.sys.id
        }
    });
}

export async function fetchEntries() {
    const entries = await fetchGraphQL(ENTRY_QUERY);
    return extractEntries(entries);
}

export async function fetchBlogPostNames() {
    const names = await fetchGraphQL(NAME_QUERY);
    return extractBlogPostNames(names);
}


