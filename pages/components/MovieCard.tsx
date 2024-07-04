import React from "react";
import Image from "next/image";
import { BsFillPlayFill } from "react-icons/bs";

interface MovieCardProps {
	data: Record<string, any>;
}

const MovieCard: React.FC<MovieCardProps> = ({ data }) => {
	return (
		<div className="group bg-zinc-900 col-span relative h-[12vw]">
			<Image
				className="
                    cursor-pointer
                    object-cover
                    transition
                    duration
                    shadow-xl
                    rounded-md
                    group-hover-opacity-90
                    sm:group-hover:opacity-0
                    delay-300
                    w-full
                    h-[12vw]"
				src={data?.thumbnailUrl}
				alt=""
			/>
			<div
				className="opacity-0
                      absolute top-0 
                      transition d
                      uration-200 
                      z-10 invisible 
                      delay-300 
                      w-full 
                      scale-0 g
                      roup-hover:scale-110
                      group-hover:translate-y-[6vw] g
                      roup-hover:transalate-x-[2vw]
                      group-hover:opacity-100"
			>
				{/* i will check this image later */}

				<image
					className="
                    cursor-pointer
                    object-cover
                    transition
                    duration
                    shadow-xl
                    rounded-t-md
                    w-full
                    j-[12vw]
                    
                    "
					xlinkHref={data?.thumbnailUrl}
				/>
				<div
					className="
        z-10bg-zinc-800
        p-2
        lg:p-4
        absolute
        w-rull
        transistion
        shadow-module.exports = {
          rounded-b-md
        };
        
        "
				>
					<div
						className="
          flex flex-row item-center gap-3"
					>
						<div
							className="
            cursor-pointer
            w-6
            h-6
            lg:w-10
            lg:h-10
            bg-whiterounded-full
            flex
            justify-center
            items-center
            transition
            hover:bg-neutral-300 "
							onClick={() => {}}
						>
							<BsFillPlayFill size={32} />
						</div>
					</div>
					<p className="text-green-400 fot-semi-bold mt-4">
						New <span className="text-white">2024</span>
					</p>
					<div className="flex flex-row mt-4 gap-2 items-center">
						<p className="text-white text-[10px] lg:text-sm">
							{ data?. duration }
						</p>
					</div>
					<div className="flex flex-row mt-4 gap-2 items-center">
						<p className="text-white text-[10px] lg:text-sm">
							{ data ?. genre }
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MovieCard;
