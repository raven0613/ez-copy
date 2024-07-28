interface ISearchInput {
    handleSetKeyword: (keyword: string) => void
}

const SearchInput = ({ handleSetKeyword }: ISearchInput) => {
    return (
        <input placeholder="Search keyword" className="rounded-full w-[9.2rem] h-8 leading-8 px-3 bg-secondary-900 text-light-300 placeholder:text-light-500 text-sm"
            onChange={(e) => {
                handleSetKeyword(e.target.value);
            }}
        />
    )
}

export default SearchInput