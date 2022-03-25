import Header from '../../components/header/Header'
import './home.css'
import NavBar from '../../components/navBar/NavBar'
import Footer from '../../components/footer/Footer'
import HomeSubComponent from '../../components/homeSubComponent/HomeSubComponent'

export default function Home() {

  return (
      <>
        <Header />
        <HomeSubComponent />
        <Footer />
      </>
    
  )
}
