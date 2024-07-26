export interface ILocalStorageData {
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
