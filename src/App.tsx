import './App.css'
import TagList from './components/TagList'
import CardList from './components/CardList';

function App() {
  // const [count, setCount] = useState(0);

  return (
    <main className="w-full h-full flex flex-col">
      <section className="w-full h-[4rem]">

      </section>

      <section className="w-full h-[32rem] grid grid-cols-5">
        <TagList />
        <div className="h-full w-full flex flex-col overflow-hidden col-span-4">
          <CardList searchKeyword={""} />
          <textarea className="outline-none border border-neutral-800 resize-none"></textarea>
        </div>
      </section>

    </main>
  )
}

export default App
