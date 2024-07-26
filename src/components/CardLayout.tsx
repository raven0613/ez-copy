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
        <div className="w-full h-fit rounded-lg border border-[#4c5361] relative pl-6" onClick={() => {
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

            <div className="flex-1 flex flex-col h-fit gap-2 p-2">

                {/* content */}
                <span className="w-full h-fit text-sm whitespace-pre-wrap text-[#d6d5d5] text-start">
                    {contentComp}
                </span>

                {/* description */}
                {descriptionComp && <span className="w-full h-fit text-sm text-[#669699] text-start whitespace-pre-wrap">
                    {/* <span className="text-xs align-text-top">// </span> */}
                    {descriptionComp}
                </span>}

                {/* bottom */}
                <section className="w-full flex gap-2">
                    {/* tags */}
                    <div className="flex flex-1 gap-2 items-center flex-wrap text-[#659396]">
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