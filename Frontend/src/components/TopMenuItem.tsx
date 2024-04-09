import Link from 'next/link'

export default function TopMenuItem({title,pageRef}:{title:string,pageRef:string}) {
  return (
    <Link href={pageRef} className="py-1 border-b-2 text-xl border-transparent">
      <div className="flex items-center gap-2 px-2 py-3.5 rounded-2xl 
      hover:text-primary-default hover:bg-cyan-500 "> 
        {title}
      </div>
        {/* <button className='bg-blue-500 text-white font-semibold py-2 
        px-2 my-8 rounded hover:bg-blue-400   hover:text-blue-500' >{title}</button> */}
        
    </Link>
  )
}