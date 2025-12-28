import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coldarkDark as theme } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import LazyImage from '@/components/v2/lazyimage';

export default async function CaseStudy(props: {
  mdUrl: string
}) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL!}${props.mdUrl}`)
  const content = await res.text()

  return (
    <div className="">
      <Markdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1(props) {
            const { node, className, ...rest } = props
            return <h1 className="text-base xl:text-lg 2xl:text-xl 3xl:text-2xl 4xl:text-3xl mt-8 text-zinc-500" {...rest} />
          },
          h2(props) {
            const { node, className, ...rest } = props
            return <h2 className="text-base xl:text-lg 2xl:text-xl 3xl:text-2xl 4xl:text-3xl mt-8 text-zinc-500" {...rest} />
          },
          h3(props) {
            const { node, className, ...rest } = props
            return <h3 className="text-base xl:text-lg 2xl:text-xl 3xl:text-2xl 4xl:text-3xl mt-8 text-zinc-500" {...rest} />
          },
          p(props) {
            const { node, className, ...rest } = props
            return <p className="text-base xl:text-lg 2xl:text-xl 3xl:text-2xl 4xl:text-3xl mt-2" {...rest} />
          },
          // h1(props) {
          //   const { node, className, ...rest } = props
          //   return <h1 className="text-2xl xl:text-3xl 2xl:text-4xl 3xl:text-5xl 6xl:text-6xl" {...rest} />
          // },
          // h2(props) {
          //   const { node, className, ...rest } = props
          //   return <h2 className="text-xl xl:text-2xl 2xl:text-3xl 3xl:text-4xl 4xl:text-5xl" {...rest} />
          // },
          // h3(props) {
          //   const { node, className, ...rest } = props
          //   return <h3 className="text-lg xl:text-xl 2xl:text-2xl 3xl:text-3xl 4xl:text-4xl" {...rest} />
          // },
          // p(props) {
          //   const { node, className, ...rest } = props
          //   return <p className="text-base xl:text-lg 2xl:text-xl 3xl:text-2xl 4xl:text-3xl" {...rest} />
          // },
          a(props) {
            const { node, className, children, target, ...rest } = props
            return (
              <a className="inline-flex items-start hover:text-violet-600 transition-colors" target="_blank" {...rest}>
                <span>{children}</span>
                <ArrowOutwardIcon fontSize="small" />
              </a>
            )
          },
          img(props) {
            const { node, className, alt, src, ...rest } = props
            return <LazyImage src={src} alt={alt} className="w-full mt-4" />
          },
          table(props) {
            const { node, className, ...rest } = props
            return (
              <div className="max-w-full overflow-auto">
                <table className="hide-scrollbar" {...rest} />
              </div>
            )
          },
          td(props) {
            const { node, className, ...rest } = props
            return <td className="text-nowrap" {...rest} />
          },
          pre(props) {
            const { node, className, ...rest } = props
            return <pre className="text-sm xl:text-base 2xl:text-lg 3xl:text-xl 4xl:text-2xl mt-6 bg-zinc-800 p-4 rounded-lg overflow-auto" {...rest} />
          },
          code({ node, inline, className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || '');

            return !inline && match ? (
              <SyntaxHighlighter
                style={theme}
                customStyle={{
                  background: 'none',
                  padding: 0,
                  margin: 0,
                }}
                PreTag="div"
                language={match[1]}
                {...props}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      >
        {content}
      </Markdown>
    </div>
  )
}