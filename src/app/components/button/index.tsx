import React from "react";

type ButtonProps = {
    text: string;
    onClick?: () => void;
    variant: 'primary' | 'secondary';
};

const Button: React.FC<ButtonProps> = ({ text, onClick, variant}) => {
    const buttonStyles = variant === "primary"
        ? "bg-white text-black hover:bg-black hover:text-white border-black"
        : "bg-black text-white hover:bg-white hover:text-black border-white";
    return (
        <button onClick={onClick} className={`px-4 py-2 rounded-md border-solid border-2 transition-colors duration-300 ease-in-out transform active:scale-95 ${buttonStyles}`}>
            {text}
        </button>
    )
}

export default Button;

