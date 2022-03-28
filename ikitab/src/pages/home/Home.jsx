import Header from '../../components/header/Header'
import './home.css'
import NavBar from '../../components/navBar/NavBar'
import Footer from '../../components/footer/Footer'
import HomeSubComponent from '../../components/homeSubComponent/HomeSubComponent'
import Benefits from '../../components/benefits/Benefits'

export default function Home() {

  return (
      <>
        <Header />
        <Benefits/>
        <HomeSubComponent />
        <Footer />
      </>
    
  )
}
