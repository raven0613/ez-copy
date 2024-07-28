import './App.css'
import TagList from './components/TagList'
import CardList from './components/CardList';
import { useEffect, useState } from 'react';
import AddCard from './components/AddCard';
import SearchInput from './components/SearchInput';
import BgButton from './components/button/BgButton';
import logo from "/logo.png";

function App() {
  const [isAddShowing, setIsAddShowing] = useState(false);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    async function handleCopy(e: KeyboardEvent) {
      if (e.ctrlKey && e.key === "c") {

        console.log("copy", await navigator.clipboard.readText())
      }
    }
    document.addEventListener("keydown", handleCopy);

    return () => {
      document.removeEventListener("keydown", handleCopy);
    }
  }, [])


  return (
    <main className="w-full h-full flex flex-col">
      <section className="w-full h-[4rem] grid grid-cols-4 items-center px-5">
        <img src={logo} className="h-[1.75rem] col-span-1" />
        <div className="col-start-4 flex w-full items-center justify-between">
          <SearchInput handleSetKeyword={(keyword) => {
            setKeyword(keyword);
          }} />
          <BgButton
            size={`w-8 h-8`}
            padding={``}
            color={`${isAddShowing ? "bg-accent-100" : "bg-accent-400"} `}
            handleClick={() => {
              setIsAddShowing(pre => !pre);
            }}
          >
            <span className="relative before:contents-[''] before:w-3 before:h-[2px] before:rounded-full before:absolute before:left-1/2 before:-translate-x-1/2 before:top-1/2 before:-translate-y-1/2 before:bg-secondary-800 
            after:contents-[''] after:w-[2px] after:h-3 after:rounded-full after:absolute after:left-1/2 after:-translate-x-1/2 after:top-1/2 after:-translate-y-1/2 after:bg-secondary-800"></span>
          </BgButton>
        </div>
      </section>

      <section className="w-full h-[32rem] shrink-0 grid grid-cols-5 pb-2">
        <TagList />
        <div className="h-full w-full flex flex-col overflow-hidden col-span-4">

          <AddCard isAddShowing={isAddShowing} />
          <CardList searchKeyword={keyword} />

        </div>
      </section>

    </main>
  )
}

export default App
