// import { NotionPage } from '@/components/NotionPage'
import { domain } from '@/lib/config'
import { resolveNotionPage } from '@/lib/resolve-notion-page'

export const getStaticProps = async () => {
  try {
    const props = await resolveNotionPage(domain)

    return { props, revalidate: 10 }
  } catch (err) {
    console.error('page error', domain, err)
    throw err
  }
}

export default function NotionDomainPage(props) {
  return (
    <>
      <div className='justify-center min-h-screen'>
        <div className='flex flex-col space-y-6 items-center justify-center p-16'>
          <span className=' font-bold text-xl'>
            Let s build dark mode with react. {props.pageId}
          </span>
          <button className='btn'>Button</button>
        </div>
      </div>
    </>
  )
}
