import React from 'react';
import { CiFacebook, CiInstagram, CiYoutube } from 'react-icons/ci';

const Footer = () => {
  return (
		<div className="bg-black text-gray-400 flex justify-center py-8  max-w-980 ">
			<div className="w-full max-w-7xl mx-auto px-4">
				<div className="flex justify-items-space-around">
					<CiFacebook />
					<CiInstagram />
					<CiYoutube />
				</div>
				<div className="flex justify-between mt-4">
					<div>
						<ul className="flex flex-col space-y-2">
							<li className="cursor-pointer">Audio description</li>
							<li className="cursor-pointer">Investor Relations</li>
							<li className="cursor-pointer">Legal Notices</li>
						</ul>
					</div>
					<div>
						<ul className="flex flex-col space-y-2">
							<li className="cursor-pointer">Gift Cards</li>
							<li className="cursor-pointer">Terms of Use</li>
							<li className="cursor-pointer">Corporate Information</li>
						</ul>
					</div>
					<div>
						<ul className="flex flex-col space-y-2">
							<li className="cursor-pointer">Media Center</li>
							<li className="cursor-pointer">Privacy</li>
							<li className="cursor-pointer">Contact Us</li>
						</ul>
					</div>
				</div>
				<div className="flex items-center justify-center border border-white w-1/5 mt-4 cursor-pointer py-2">
					<p className="text-xs">Service code</p>
				</div>
				<div className="text-xs mt-4">
					&copy; {new Date().getFullYear()} Netflix, Inc.
				</div>
			</div>
		</div>
	);
}

export default Footer;
