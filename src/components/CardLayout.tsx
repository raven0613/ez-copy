interface ICardLayout {
    contentComp: React.ReactNode;
    descriptionComp: React.ReactNode,
    tagComp: React.ReactNode,
    buttonComp: React.ReactNode,
    colorPickerComp: React.ReactNode,
    color: string,
    handleClick: () => void,
    id: string
}

const Card = ({ contentComp, descriptionComp, tagComp, buttonComp, colorPickerComp, color, handleClick, id }: ICardLayout) => {

    return (
        <div className="h-fit w-[calc(100%-6px)] rounded-lg border border-secondary-700  relative pl-6" onClick={() => {
            handleClick();
        }}>

            <label
                htmlFor={`color_${id}`} className={`w-6 absolute -left-[1px] -top-[1px] -bottom-[1px]`}
                style={{ backgroundColor: color, borderRadius: "7px 0 0 7px" }}
                onClick={e => {
                    e.stopPropagation();
                }}
            >
                {colorPickerComp}
            </label>

            <div className="flex flex-col h-fit gap-2 p-2">

                {/* content */}
                <span className="w-full max-h-40 text-sm whitespace-pre-wrap text-light text-start overflow-x-hidden">
                    {contentComp}
                </span>

                {/* description */}
                {descriptionComp && <span className="w-full h-fit text-sm text-accent-400 text-start whitespace-pre-wrap">
                    {/* <span className="text-xs align-text-top">// </span> */}
                    {descriptionComp}
                </span>}

                {/* bottom */}
                <section className="w-full flex gap-2">
                    {/* tags */}
                    <div className="flex flex-1 gap-2 items-center flex-wrap text-accent-400">
                        {tagComp}
                    </div>
                    {/* buttons */}
                    <div className="flex gap-2 items-end">
                        {buttonComp}
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Card;