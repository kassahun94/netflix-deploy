import React from 'react'
import { signOut } from 'next-auth/react'
import Image from 'next/image';

interface AccountMenuProps {
  visible?: boolean
}

const AccountMenu: React.FC<AccountMenuProps> = ({
  visible
}) => {
  if (!visible) 
    {return null;}


  return (
		<div className="bg-black w-56 absolute top-14 right-0 py-5 flex-col border-gray-800 flex">
			<div className="flex flex-col gap-3">
				<div className="px-3 group-3/item flex flex-row gap-3 items-center w-full">
					<Image src="/images/avatar.png" alt="" width={44} height={44} />
					<p className="text-whitetext-sm group-hover/item:underline">user</p>
				</div>
        <hr className="border-gray-800 border-0 h-px mu-4" />
		<div onClick={() => signOut()} className="px-3 text-white hover:underline"> sign out of Netflix
		
		</div>
			</div>
		</div>
	);
}

export default AccountMenu