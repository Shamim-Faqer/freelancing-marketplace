import React from 'react'
import Header from '../Components/Header';
import Footer from '../Components/Footer';  
import Hero from '../Components/Hero';
import Services from '../Components/Services';
import Partners from '../Components/Partners';
import About from '../Components/About';



function Home() {
  return (
    <div>
        <Header></Header>
        ami createrted home page
        <Hero></Hero>
        
        <Services></Services>
        <Partners></Partners>
         <About></About>
         <Footer></Footer>  

        </div>
  )
}

export default Home