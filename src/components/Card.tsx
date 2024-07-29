import DeleteIcon from "./svg/DeleteIcon";
import EditIcon from "./svg/EditIcon";
import ColorPicker from "./ColorPicker";
import CardLayout from "./CardLayout";
import { ITextData } from "../type/type";
import BgButton from "./button/BgButton";
import useDndMove from "../hooks/useDndMove";
import { useRef, useState } from "react";
import Toast from "./Toast";



interface ICard {
    data: ITextData,
    index: number,
    handleChangeData: (data: ITextData) => void,
    handleEdit: (id: string) => void,
    handleDelete: (id: string) => void,
    handleMoveCard: (dragIndex: number, hoverIndex: number) => void;
}

const Card = ({ data, index, handleEdit, handleDelete, handleChangeData, handleMoveCard }: ICard) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const { id, value, description, tagList, bgColor } = data;
    const { handlerId, isDragging } = useDndMove({
        targetRef: cardRef, id: data.id, index, handleMoveCard
    });
    const [isCopied, setIsCopied] = useState(false);
    const timeoutRef = useRef<number | null>(null);
    return (
        <div ref={cardRef} data-handler-id={handlerId} className={`relative z-30 ${isDragging ? "opacity-0" : ""}`} >
            <CardLayout
                id={id}
                contentComp={value}
                descriptionComp={description}
                tagComp={tagList && tagList.map(item =>
                    <span key={item} className="text-sm">
                        #{item}
                    </span>
                )}
                buttonComp={<>
                    <BgButton
                        size={`w-7 h-7`}
                        padding={`p-1`}
                        color={`bg-primary-950 hover:brightness-125`}
                        handleClick={() => {
                            handleEdit(id);
                        }}
                    >
                        <EditIcon classProps={"stroke-light-300"} />
                    </BgButton>
                    <BgButton
                        size={`w-7 h-7`}
                        padding={`p-1`}
                        color={`bg-primary-950`}
                        handleClick={() => {
                            handleDelete(id);
                        }}
                    >
                        <DeleteIcon classProps={"stroke-light-300 group-hover:stroke-warning transition group-hover:duration-150 ease-linear"} />
                    </BgButton>
                </>}
                colorPickerComp={
                    <ColorPicker unitId={id} labelFor={`color_${id}`} handleGetColor={(color: string) => {
                        handleChangeData({ ...data, bgColor: color })
                    }}
                        color={bgColor}
                    />
                }
                color={bgColor}
                handleClick={() => {
                    if (timeoutRef.current) {
                        timeoutRef.current = null;
                    }

                    navigator.clipboard.writeText(value);
                    setIsCopied(true);
                    timeoutRef.current = setTimeout(() => setIsCopied(false), 1000);
                }}
            />
            {isCopied && <Toast text={"copied"} position={`top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2`} />}
        </div>
    )
}

export default Card;