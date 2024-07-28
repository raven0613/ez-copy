interface ICardLayout {
    title?: React.ReactNode;
    contentComp: React.ReactNode;
    descriptionComp: React.ReactNode,
    tagComp: React.ReactNode,
    buttonComp: React.ReactNode,
    colorPickerComp: React.ReactNode,
    color: string,
    handleClick: () => void,
    id: string,
}

const CardLayout = ({ title, contentComp, descriptionComp, tagComp, buttonComp, colorPickerComp, color, handleClick, id }: ICardLayout) => {

    return (
        <div
            className={`h-fit w-[calc(100%-6px)] rounded-lg border relative 
                ${id === "new" ? "border-secondary-400" : "border-secondary-700"}
            `}
            onClick={() => {
                handleClick();
            }}
        >
            <label
                htmlFor={`color_${id}`} className={`w-4 absolute z-10 -left-[1px] -top-[1px] -bottom-[1px]`}
                style={{ backgroundColor: color, borderRadius: "7px 0 0 7px" }}
                onClick={e => {
                    e.stopPropagation();
                }}
            >
                {colorPickerComp}
            </label>

            <div className={`flex flex-col h-fit gap-2 p-2 bg-primary-950 pl-8 rounded-[7px]
            ${id === "new" ? "" : "hover:brightness-125 transition duration-150"} 
            `}>

                <p className="text-sm text-primary-300  text-start overflow-x-hidden">
                    {title}
                </p>

                {/* content */}
                <span className="w-full max-h-32 text-sm whitespace-pre-wrap text-light-300 text-start overflow-x-hidden">
                    {contentComp}
                </span>

                {/* description */}
                {descriptionComp && <span className="w-full max-h-20 text-sm text-accent-400 text-start whitespace-pre-wrap overflow-x-hidden">
                    {descriptionComp}
                </span>}

                {/* bottom */}
                <section className="w-full flex gap-2">
                    {/* tags */}
                    <div className="flex flex-1 gap-2 items-center flex-wrap text-accent-400">
                        {tagComp}
                    </div>
                    {/* buttons */}
                    <div className="flex gap-1.5 items-end">
                        {buttonComp}
                    </div>
                </section>
            </div>
        </div>
    )
}

export default CardLayout;