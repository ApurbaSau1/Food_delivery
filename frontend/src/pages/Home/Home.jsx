import React from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreManu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import AppDownload from '../../components/AppDownload/AppDownload'
const Home = () => {
  const [categories, setCategories] = React.useState("All");
  return (
    <div>
      <Header/>
      <ExploreMenu categories={categories} setCategories={setCategories}/>
      <FoodDisplay categories={categories}/>
      <AppDownload/>
            </div>
  )
}

export default Home