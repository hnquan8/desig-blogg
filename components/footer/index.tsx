import { useRouter } from 'next/router'

import Brand from 'components/brand'
import {
  EMAIL,
  GITHUB,
  MIRROR,
  PITCHDECK,
  TWITTER,
  YOUTUBE
} from 'configs/socials.constant'
import { useTheme } from 'providers/ui.provider'

const SOCIALS = [
  {
    name: 'TWITTER',
    link: TWITTER
  },
  {
    name: 'GITHUB',
    link: GITHUB
  },
  {
    name: 'MIRROR',
    link: MIRROR
  },
  {
    name: 'YOUTUBE',
    link: YOUTUBE
  }
]

const ABOUTS = [
  {
    name: 'PICK DECK',
    link: PITCHDECK
  },
  {
    name: 'POLICY',
    link: '/'
  },
  {
    name: 'CONTACT US',
    link: EMAIL
  }
]

export default function Footer() {
  const router = useRouter()
  const { theme } = useTheme()

  return (
    <footer className='text-base-content flex flex-col items-center text-neutral-content text-[14px]'>
      <div className='flex py-[10px] lg:w-[1040px] items-center'>
        <div className='pr-[20px]'>
          <Brand
            onClick={() => router.push('/')}
            style={{ cursor: 'pointer' }}
            theme={theme}
          />
        </div>
        <div className='w-[1px] bg-base-300 h-[36px]' />
        <div className='flex flex-col justify-center pl-[20px]'>
          <div className=' text-base-content'>
            The blockchain-agnostic multisigsolution.
          </div>
          <div>Desig © 2023, All Rights Reserved.</div>
        </div>
      </div>

      <div className='border-t-[1px] border-t-base-300 w-full flex justify-center'>
        <div className='bg-base-300'>
          <div className='grid gap-[1px] grid-cols-4 items-center'>
            {SOCIALS.map((social) => (
              <a
                key={social.name}
                className='flex w-[100px] sm:w-[150px] xl:w-[260px] h-[54px] items-center justify-center bg-base-100'
                href={social.link}
                target='_blank'
                rel='noreferrer'
              >
                {social.name}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className='border-t-[1px] border-t-base-300 w-full flex justify-center'>
        <div className='bg-base-300'>
          <div className='grid gap-[1px] grid-cols-3 items-center'>
            {ABOUTS.map((about) => (
              <a
                key={about.name}
                className='flex w-[100px] sm:w-[150px] xl:w-[260px] h-[54px] items-center justify-center bg-base-100'
                href={about.link}
                target='_blank'
                rel='noreferrer'
              >
                {about.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
