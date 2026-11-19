import { useEffect } from 'react'
import { BrowserRouter, Navigate, useLocation } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { motion, AnimatePresence } from 'motion/react'
import { useLibraryStore } from '../entities/library/model/store'
import { Sidebar } from '../widgets/Sidebar'
import { LandingPage } from '../pages/LandingPage'
import { LibraryPage } from '../pages/LibraryPage'
import { DiscoverPage } from '../pages/DiscoverPage'
import { BookDetailsPage } from '../pages/BookDetailsPage'
import { YearInReviewDashboard } from '../widgets/YearInReviewDashboard'
const queryClient=new QueryClient({defaultOptions:{queries:{staleTime:60_000,retry:1}}})
function Shell(){const location=useLocation();const guest=useLibraryStore(s=>s.guest);useEffect(()=>{document.title=`${location.pathname==='/library'?'Библиотека':location.pathname==='/discover'?'Найти книги':location.pathname==='/stats'?'Итоги года':'Bookshelf'} — Bookshelf`},[location.pathname]);if(location.pathname==='/'&&!guest)return <LandingPage/>;if(location.pathname==='/'&&guest)return <Navigate to="/library" replace/>;return <div className="min-h-screen"><Sidebar/><main className="min-h-screen px-4 pb-12 pt-20 md:ml-[270px] md:px-8 md:pt-8 xl:px-12"><div className="mx-auto max-w-7xl"><AnimatePresence mode="wait"><motion.div key={location.pathname+location.search} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-5}} transition={{duration:.18}}>{location.pathname==='/library'?<LibraryPage/>:location.pathname==='/discover'?<DiscoverPage/>:location.pathname==='/stats'?<YearInReviewDashboard/>:location.pathname.startsWith('/book/')?<BookDetailsPage/>:<NotFound/>}</motion.div></AnimatePresence><footer className="mt-14 border-t border-stone-200 pt-5 text-center text-[10px] text-stone-400">У каждой истории своё место · <button onClick={()=>{if(confirm('Сбросить демо-данные библиотеки?')){useLibraryStore.getState().reset();window.location.href='/'}}} className="underline">Сбросить данные</button></footer></div></main></div>}
function NotFound(){return <div className="py-24 text-center"><h1 className="font-serif text-4xl">Страница потерялась между главами</h1><a href="/library" className="mt-4 inline-block text-amber-800 underline">Вернуться в библиотеку</a></div>}
export function App(){return <QueryClientProvider client={queryClient}><BrowserRouter><Shell/></BrowserRouter></QueryClientProvider>}
