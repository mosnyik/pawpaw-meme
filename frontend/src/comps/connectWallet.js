 

// import Link from 'next/link';
// import { useState } from 'react';
// import {
//   useDisconnect,
//   useEnsAvatar,
//   useEnsName, useAccount, useConnect } from 'wagmi'

// function ConnectWallet() {
//   const { address, connector, isConnected } = useAccount()
//   const { data: ensAvatar } = useEnsAvatar({ address })
//   const { data: ensName } = useEnsName({ address })
//   const { connect, connectors, error, isLoading, pendingConnector } =
//     useConnect()
//   const { disconnect } = useDisconnect()
//   const [] = useState()

 
 
//   if (isConnected) {
//     return (
//       <div>
//         <div>{ensName ? `${ensName} (${address})` : `Connected to ${address}`}</div>
//         <div className='bold hover:underline '>
//                     <Link href = {'/gallery'}>
//                     Check our Media
//                     </Link>
//                 </div>
//       </div>
      
//     )
//   }
//   return (
//     <div>
//       {connectors.map((connector) => (
//         <button
//           disabled={!connector.ready}
//           key={connector.id}
//           onClick={() => connect({ connector })}
//           className=" px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
//         >
//           {connector.name}
//           {!connector.ready && '(unsupported)'}
//           {isLoading &&
//             connector.id === pendingConnector?.id &&
//             ' (connecting...)'}
//         </button>
//       ))}
//       {error && <div>{error.message}</div>}
//     </div>
//   )

// }

// export default ConnectWallet;




