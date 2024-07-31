export interface IJsonData {
    user: object,
    posts: ITextData[],
    tags: string[],
    shownTag: string[]
}

export interface ITextData {
    id: string,
    value: string,
    description: string,
    tagList: string[],
    bgColor: string
}

export interface IFilter<T> {
    list: Array<T>
    keyword: string;
    shownTagList?: Array<string>;
}

export interface IButton {
    handleClick: () => void,
    children: React.ReactNode,
    size: string,
    position?: string,
    color: string,
    padding: string,
    radius?: string,
    disabled?: boolean
}
