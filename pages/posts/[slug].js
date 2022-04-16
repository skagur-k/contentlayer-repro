import Head from 'next/head'
import Link from 'next/link'
import { format, parseISO } from 'date-fns'
import { allPosts } from 'contentlayer/generated'
import { useMDXComponent } from 'next-contentlayer/hooks'

export async function getStaticPaths() {
	const paths = allPosts.map((post) => post.url)
	return {
		paths,
		fallback: false,
	}
}

export async function getStaticProps({ params }) {
	const post = allPosts.find(
		(post) => post._raw.flattenedPath === params.slug
	)
	return {
		props: {
			post,
		},
	}
}

const PostLayout = ({ post }) => {
	console.log(post)
	const MDXComponent = useMDXComponent(post.body.html)
	return (
		<>
			<Head>
				<title>{post.title}</title>
			</Head>
			<article className='max-w-2xl mx-auto py-16'>
				<div className='text-center mb-6'>
					<Link href='/'>
						<a className='text-sm text-blue-700 uppercase font-bold text-center'>
							Home
						</a>
					</Link>
				</div>
				<div className='text-center mb-6'>
					<h1 className='text-3xl font-bold mb-1'>{post.title}</h1>
					<time
						dateTime={post.date}
						className='text-sm text-gray-600'>
						{format(parseISO(post.date), 'LLLL d, yyyy')}
					</time>
				</div>
				<MDXComponent />
			</article>
		</>
	)
}

export default PostLayout
