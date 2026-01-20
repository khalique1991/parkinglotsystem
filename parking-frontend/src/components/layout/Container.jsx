import Header from './Header'
import Sidebar from './Sidebar'
import Footer from '../Footer'

export default function Container({ children }) {
  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 p-8 bg-gray-50">{children}</main>
        <Footer />
      </div>
    </div>
  )
}
