import React from 'react'
import './AppDownload.css'
import { assets } from '../../assets/assets'
const AppDownload = () => {
  return (
    <div className='App-download' id='App-download'>
        <p>
            For Better Experince Download<br />
            Our App Now
        </p>
        <div className="App-download-icons">
            <img src={assets.app_store} alt="App Store" />
            <img src={assets.play_store} alt="Play Store" />
        </div>
        </div>
  )
}

export default AppDownload