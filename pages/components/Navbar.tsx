import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import NavbarItem from "./NavbarItem";
import { BsChevronDown, BsSearch, BsBell } from "react-icons/bs";
import MobileMenu from "./MobileMenu";
import AccountMenu from "./AccountMenu";

const TOP_OFFSET = 66;

const Navbar = () => {
	const imagePath = "/images/avatar.png";
	const [showMobileMenu, setShowMobileMenu] = useState(false);
	const [showAccountMenu, setShowAccountMenu] = useState(false);
	const [showBackGround, setShowBackGround] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			const offset = window.scrollY;
			setShowBackGround(offset > TOP_OFFSET);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const toggleMobileMenu = useCallback(() => {
		setShowMobileMenu((current) => !current);
	}, []);

	const toggleAccountMenu = useCallback(() => {
		setShowAccountMenu((current) => !current);
	}, []);

	return (
		<nav className="w-full fixed z-40">
			<div
				className={`px-4 md:px-16 flex py-6 flex-row items-center transition duration-500 ${
					showBackGround ? "bg-zinc-900 bg-opacity-90" : ""
				}`}
			>
				<Image
					src="/images/netflix-logo.png"
					alt="logo"
					width={80}
					height={100}
				/>
				<div className="flex-grow ml-8 gap-7 hidden lg:flex">
					<NavbarItem label="Home" />
					<NavbarItem label="Series" />
					<NavbarItem label="Films" />
					<NavbarItem label="New & Popular" />
					<NavbarItem label="My List" />
					<NavbarItem label="Browse by Languages" />
				</div>
				<div
					className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative"
					onClick={toggleMobileMenu}
				>
					<p className="text-white text-sm">Browse</p>
					<BsChevronDown
						className={`text-white transition ${
							showMobileMenu ? "rotate-180" : "rotate-0"
						}`}
					/>
					<MobileMenu visible={showMobileMenu} />
				</div>
				<div className="flex flex-row ml-auto gap-7 items-center">
					<div className="hidden lg:flex text-gray-200 hover:text-gray-300  cursor-pointer">
						<BsSearch size={20} />
					</div>
					<div className="hidden lg:flex text-gray-200 hover:text-gray-300  cursor-pointer">
						<BsBell size={20} />
					</div>

					<div
						onClick={toggleAccountMenu}
						className="flex flex-row items-center gap-2 cursor-pointer relative"
					>
						<div className="w-10 h-10 rounded-full overflow-hidden relative">
							<Image
								src={imagePath}
								alt="Avatar Image"
								layout="fill"
								objectFit="cover"
							/>
						</div>
						<BsChevronDown
							className={`text-white transition ${
								showAccountMenu ? "rotate-180" : "rotate-0"
							}`}
							size={20}
						/>
						<AccountMenu visible={showAccountMenu} />
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
