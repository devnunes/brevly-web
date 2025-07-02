import './app.css'
import { CreateLinkWidget } from './components/create-link-widget'
import { MyLinksWidget } from './components/my-links-widget'

export function App() {
  return (
    <main className="h-dvh flex flex-col items-center p-10">
      <div className="flex justify-center mb-4 mt-10 w-91.5 md:w-187 lg:w-245 md:justify-start">
        <img
          src="./src/assets/brevly-logo.svg"
          alt="Brev.ly Logo"
          className="w-24 h-7.5 mr-2"
        />
      </div>
      <div className="flex flex-col items-center justify-center gap-5 md:flex-row md:items-start md:gap-4">
        <CreateLinkWidget />
        <MyLinksWidget />
      </div>
    </main>
  )
}
