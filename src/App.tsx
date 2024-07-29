import './App.css'
import TagList from './components/TagList'
import CardList from './components/CardList';
import { useEffect, useRef, useState } from 'react';
import AddCard from './components/AddCard';
import SearchInput from './components/SearchInput';
import BgButton from './components/button/BgButton';
import logo from "/logo.png";
import CryptoJS from "crypto-js"
import { IJsonData } from './type/type';
import useStore from './zustand';
import { key } from './consts';

export function saveLocalstorage(strData: string) {
  const encrypted = CryptoJS.AES.encrypt(strData, key).toString();
  localStorage.setItem("ez-copy", encrypted);
}

function isJson(str: string) {
  if (typeof str !== "string") return;
  try {
    const parsedStr = JSON.parse(str);
    if (typeof parsedStr === "object") return true;
  }
  catch (e) {
    return false;
  }
  return false;
}

function App() {
  const { setAllTextCard, setAllTag, setShownTag } = useStore((state) => state);
  const [isAddShowing, setIsAddShowing] = useState(false);
  const [keyword, setKeyword] = useState("");
  const jsonData = useRef<IJsonData | null>(null);

  useEffect(() => {
    if (!localStorage.getItem("ez-copy")) return;
    const localStorageData = localStorage.getItem("ez-copy") || "";
    let initialData: IJsonData;
    if (isJson(localStorageData)) {
      initialData = JSON.parse(localStorageData);
    }
    else {
      const decrypted = CryptoJS.AES.decrypt(localStorageData, key).toString(CryptoJS.enc.Utf8);
      initialData = JSON.parse(decrypted);
    }
    jsonData.current = initialData;
    setAllTextCard(initialData.posts || []);
    setAllTag(initialData.tags || []);
    setShownTag(initialData.shownTag || []);
  }, [setAllTextCard, setAllTag, setShownTag]);

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
        <TagList jsonDataRef={jsonData} />
        <div className="h-full w-full flex flex-col overflow-hidden col-span-4">

          <AddCard isAddShowing={isAddShowing} jsonDataRef={jsonData} />
          <CardList searchKeyword={keyword} jsonDataRef={jsonData} />

        </div>
      </section>

    </main>
  )
}

export default App
