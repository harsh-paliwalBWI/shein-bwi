import React from 'react'
import ReferAndEarn from '../../components/referAndEarn/ReferAndEarn'
import HowItWorks from '../../components/referAndEarn/HowItWorks'
import BonusPoints from '../../components/referAndEarn/BonusPoints'
import SimilarProducts from '../../components/SimilarProducts/SimilarProducts'
import ReviewSlider from '../../components/reviews/ReviewSlider'
import VideoSlider from '../../components/HomePage/widgets/VideoSlider'
import Advertisement from '../../components/advertisement/Advertisement'
import InstaFamilySlider from '../../components/instaFamily/InstaFamilySlider'
import WatchShopSlider from '../../components/watchAndShop/WatchShopSlider'
// import CategoryGrid from '../../components/HomePage/widgets/CategoryGrid'

const ReferAndEarnPage = () => {
  return (
    <div className='md:pb-10'>
      {/* <CategoryGrid/> */}
      {/* <SimilarProducts /> */}
      {/* <Advertisement/> */}
      {/* <ReviewSlider/> */}
      <InstaFamilySlider/>
      <WatchShopSlider/>
      {/* <VideoSlider/> */}
        <ReferAndEarn/>
        <HowItWorks/>
        {/* <BonusPoints/> */}
    </div>
  )
}

export default ReferAndEarnPage