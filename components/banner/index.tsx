import Image from 'next/image'

import cover from './cover.svg'
import logo from './logo.svg'

const Banner = () => {
  return (
    <div className='indicator w-full h-[360px] mb-14'>
      <span className='indicator-item  indicator-bottom indicator-center badge badge-base-100 w-[168px] h-[168px] p-4 border-0 rounded-full'>
        <div className='flex justify-center items-center rounded-full bg-base-200 w-full h-full p-2'>
          <Image src={logo} alt='logo' layout='fixed' objectFit='fill' />
        </div>
      </span>
      <div className='grid w-full place-items-center'>
        <Image
          src={cover}
          alt='logo'
          layout='fill'
          objectFit='cover'
          objectPosition='center'
        />
      </div>
    </div>
  )
}

export default Banner
