import cover from './cover.svg'
import Image from 'next/image'

const Banner = () => {
  return (
    <div className="indicator w-full">
      <div className="w-[136px] h-[136px] rounded-full indicator-item indicator-bottom indicator-center badge badge-base-100">
        <div className=" rounded-full z-1 badge-base-200"></div>
      </div>
      <Image
        alt=""
        src={cover}
        className="w-full grid w-full h-[360px] place-items-center"
      />
    </div>
  )
}

export default Banner
