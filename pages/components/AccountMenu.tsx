import React from "react";
import useCurrentUser from "../../hooks/useCurrentUser";
import { signOut } from "next-auth/react";
import Image from "next/image";

interface AccountMenuProps {
	visible?: boolean;
}

const AccountMenu: React.FC<AccountMenuProps> = ({ visible }) => {
	const {data} = useCurrentUser();
	if (!visible) {
		return null;
	}

	return (
		<div className="bg-black w-40 absolute top-14 text-white right-0 py-5 flex-col border-gray-800 flex">
			<div className="flex flex-col gap-3">
				<div className="px-3 group-3/item flex flex-row gap-3 items-center w-full">
					<Image src="/images/avatar.png" alt="" width={30} height={30} />
					<p className="text-whitetext-sm group-hover/item:underline"> {data ?. username } </p>
				</div>
				<hr className="border-gray-800 border-0 h-px mu-4" />
				<div
					onClick={() => signOut()}
					className="px-3 text-white hover:underline"
				>
					{" "}
					sign out
				</div>
			</div>
		</div>
	);
};

export default AccountMenu;
