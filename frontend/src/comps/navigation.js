import Link from 'next/link'




const Navigation = () => {
    return ( 

        (<div className= 'p-10 flex flex-nowrap space-x-4 drop-shadow-lg bg-slate-100 h-13 justify-around ' >
            <h1 className="text-5xl font-bold mb-4 lg:mb-0">Image Palace</h1>
            <div className='px-10 flex flex-row justify-around space-x-6'>  
                <div className='hover:underline '>
                    <Link href = {'/'}>
                        Home
                    </Link>
                </div>
                <div className='hover:underline '>
                    <Link href = {'/gallery'}>
                        View Gallery
                    </Link>
                </div>
                <div className='hover:underline '>
                    <Link href = {'/bid'}>
                        See Movies
                    </Link>
                </div>
            </div>
            {/* <div>
                <ConnectWallet />
            </div> */}
        </div>)
         
     );
     
}
 
export default Navigation;