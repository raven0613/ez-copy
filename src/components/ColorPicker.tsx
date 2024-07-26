export interface IColorPicker {
    unitId?: string;
    labelFor?: string;
    handleGetColor: (color: string) => void;
    color: string
}

export default function ColorPicker({ labelFor, unitId, handleGetColor, color }: IColorPicker) {

    return (
        <div className={`absolute left-full bottom-full pl-1`}>
            {!labelFor && <label htmlFor={`${labelFor ? labelFor : `color_${unitId}`}`}></label>}
            <input
                className={`opacity-0 pointer-events-none h-0 w-0`}
                type='color' id={`${labelFor ? labelFor : `color_${unitId}`}`}
                onChange={(e) => {
                    handleGetColor(e.target.value);
                }}
                value={color}
            ></input>
        </div>
    )
}