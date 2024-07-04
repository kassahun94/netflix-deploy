import React from "react";

interface InputProps {
	id: string;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	value: string;
	label: string;
	type?: "text" | "password" | "email" | "number";
}

const Input: React.FC<InputProps> = ({
	id,
	onChange,
	value,
	label,
	type = "text",
}) => {
	return (
		<div className="relative">
			<input
				id={id}
				type={type}
				value={value}
				onChange={onChange}
				className="
          block
          rounded-md
          px-6
          pt-6
          pb-1
          w-full
          text-md
          text-white
          bg-neutral-700
          appearance-none
          focus:outline-none
          focus:ring-0
          peer
        "
				placeholder=" "
			/>
			<label
				className="
          absolute
          text-zinc-400
          text-md
          duration-150
          transform
          -translate-y-3
          scale-75
          top-4
          origin-[0]
          z-10
          left-6
          peer-placeholder-shown:scale-100
          peer-placeholder-shown:translate-y-0
          peer-focus:scale-75
          peer-focus:-translate-y-3
        "
				htmlFor={id}
			>
				{label}
			</label>
		</div>
	);
};

export default Input;
