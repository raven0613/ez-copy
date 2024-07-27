import DeleteIcon from "./svg/DeleteIcon";
import EditIcon from "./svg/EditIcon";
import ColorPicker from "./ColorPicker";
import CardLayout from "./CardLayout";
import { ITextData } from "../type/type";



interface ICard {
    data: ITextData,
    handleChangeData: (data: ITextData) => void,
    handleEdit: (id: string) => void,
    handleDelete: (id: string) => void
}

const Card = ({ data, handleEdit, handleDelete, handleChangeData }: ICard) => {
    const { id, value, description, tagList, bgColor } = data;

    return (
        <>
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
                    <button
                        className={`w-7 h-7 p-1 rounded-full bg-accent-400 hover:brightness-125 transition hover:duration-200 ease-in-out`}
                        onClick={e => {
                            e.stopPropagation();
                            handleEdit(id);
                        }}
                    >
                        <EditIcon classProps={"stroke-primary-950"} />
                    </button>
                    <button
                        className={`w-7 h-7 p-1 rounded-full bg-accent-400 hover:brightness-125 transition hover:duration-200 ease-in-out`}
                        onClick={e => {
                            e.stopPropagation();
                            handleDelete(id);
                        }}
                    >
                        <DeleteIcon classProps={"stroke-primary-950"} />
                    </button>
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
                    navigator.clipboard.writeText(value);
                }}
            />
        </>
    )
}

export default Card;