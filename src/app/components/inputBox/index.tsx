type inputBoxProps = {
    placeholder: string;
    variant: "primary" | "secondary";
}
export default function InputBox({
    placeholder,
    variant = "primary",
}: inputBoxProps) {
    const inputBoxStyles = variant === "primary"
        ? "bg-white text-black border-black"
        : "bg-black text-white border-white";

    return (
        <input type="text" placeholder={`${placeholder}`} className={`border-2 px-6 py-4 rounded-md ${inputBoxStyles}`}/>
    )   
}