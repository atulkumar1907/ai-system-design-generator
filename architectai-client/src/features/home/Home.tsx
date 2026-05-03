import React from 'react'
import { Hero } from './components/Hero/Hero'
import FeatureGrid from './components/FeatureGrid/FeatureGrid'
import { Navbar } from '@/components/shared/navbar/Navbar'

const Home = () => {
  return (
    <div>
      <Navbar/>
      <div className='mt-30'>
        <Hero />
      <FeatureGrid />
      </div>
    </div>
  )
}

export default Home
