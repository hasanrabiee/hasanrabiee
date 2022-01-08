import React, {useEffect} from 'react';
import MainLayout from "../components/layout/MainLayout";
import Slider, {SliderData} from "../components/homepage/topslider/Slider";
import BrandSlider from "../components/homepage/brandSlider/BrandSlider";
import {HorizontalDividerDiv} from "../styles/utilities/Divider";
import BestSellerSlider from "../components/homepage/bestSellerSlider/BestSellerSlider";
import UnderBestSellerBanners from "../components/homepage/banners/UnderBestSellerBanners";
import NewArrivalsSlider from "../components/homepage/newArrivalsSlider/NewArrivalsSlider";
import UnderNewArrivalBanners from "../components/homepage/banners/UnderNewArrivalBanners";
import RowBanners from "../components/homepage/banners/RowBanners";
import SocialMediaSection from "../components/homepage/socialMediaSection/SocialMediaSection";
import Services from "../components/homepage/services/Services";
import {BACK_END_URL, getReq} from "../components/utilities/Env";
import cookies from "js-cookie";
import {PRODUCT_URL} from "../components/utilities/api/API";

const MyComponent = ({topProducts}) => {
    useEffect(() => {
        const main = async () => {
            const user = await getReq(`${BACK_END_URL}/users/me`, cookies.get("token"))
        }
        main()
    }, [])
    return (
        <MainLayout>
            <Slider/>
            <BrandSlider/>
            <HorizontalDividerDiv/>
            <BestSellerSlider topProducts={topProducts}/>
            <UnderBestSellerBanners/>
            <NewArrivalsSlider/>
            <UnderNewArrivalBanners/>
            <RowBanners/>
            <SocialMediaSection/>
            <HorizontalDividerDiv/>
            <Services/>
        </MainLayout>


    );
};


export async function getServerSideProps() {
    const topProducts = await getReq(`${PRODUCT_URL}?top=true&limit=8`)
    return {
        props: {
            topProducts
        }
    }
}


export default MyComponent;
