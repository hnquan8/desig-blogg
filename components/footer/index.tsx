import { useRouter } from 'next/router'

import {
  email,
  github,
  mirror,
  pitchdeck,
  twitter,
  youtube
} from 'configs/socials.constant'
import { useTheme } from 'providers/ui.provider'

import Brand from '../brand'

const socials = [
  {
    id: 1,
    name: 'TWITTER',
    link: twitter
  },
  {
    id: 2,
    name: 'GITHUB',
    link: github
  },
  {
    id: 3,
    name: 'MIRROR',
    link: mirror
  },
  {
    id: 4,
    name: 'YOUTUBE',
    link: youtube
  }
]

const abouts = [
  {
    id: 1,
    name: 'PICK DECK',
    link: pitchdeck
  },
  {
    id: 2,
    name: 'POLICY',
    link: '/'
  },
  {
    id: 3,
    name: 'CONTACT US',
    link: email
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
            {socials.map((social) => (
              <a
                key={social.id}
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
            {abouts.map((about) => (
              <a
                key={about.id}
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
