import Page from '../layouts/main'
import BlogSection from  '../components/blog-section'

const metaData = {
  title: 'Nipher - Articles',
  description: 'Articles about web development'
}

const Index = ({ posts, startTransition }) => (
  <Page meta={metaData}>
    <BlogSection className='index-page' posts={ posts } />
  </Page>
)

Index.getInitialProps = async ({ query, req }) => {
	if (query.build && typeof window === 'undefined') return query

  const postEndpoint = `/api/posts.json`
  const fetch = await import('isomorphic-fetch')
  let res = null

  if (req) {
    res = await fetch(`${req.protocol}://${req.get('host')}${postEndpoint}`)
  } else {
    res = await fetch(`${location.origin}${postEndpoint}`)
  }

  return await res.json()
}

export default Index
