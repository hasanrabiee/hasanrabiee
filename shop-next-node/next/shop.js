import React, {useState, useEffect} from 'react';
import MainLayout from "../../components/layout/MainLayout";
import {
    CloseFilterButton, FilterCheckBox, FilterCheckBoxContainer, FilterCheckBoxLabel, FilterDrawer,
    ShopBannerContainer,
} from "../../styles/shop/shop";
import BrandSlider from "../../components/homepage/brandSlider/BrandSlider";
import ShopTitle from "../../components/shop/ShopTitle";
import PCFilters from "../../components/shop/PCFilters";
import MobileFilterIcon from "../../components/shop/MobileFilterIcon";
import ProductsList from "../../components/shop/ProductsList";
import Link from "next/link";
import {getReq} from "../../components/utilities/Env";
import {PRODUCT_URL} from "../../components/utilities/api/API";

const Shop = ({products}) => {
    const [showFilterDrawer, setShowFilterDrawer] = useState(false)
    useEffect(() => {
        if (document) {
            if (showFilterDrawer) {
                document.body.style.overflowY = "hidden"
                window.scrollTo(0, 0)
            } else {
                document.body.style.overflowY = "auto"
            }
        }
    }, [showFilterDrawer])
    const filterDrawer = () => {
        setShowFilterDrawer(s => {
            return !s
        });
    }

    return (
        <MainLayout>
            <ShopTitle/>
            <br/>
            <div className="container mt-3">
                <div className="row">
                    <div className="d-none d-md-block col-md-2">
                        <PCFilters/>
                    </div>
                    <div className="col-12 col-md-10">
                        <div className="row">
                            <ShopBannerContainer className="col-12"></ShopBannerContainer>
                            <BrandSlider heading={""}/>
                            <div className="row mb-2">
                                <MobileFilterIcon filterDrawer={filterDrawer}/>
                                <div className="col-6"></div>
                            </div>
                            <ProductsList products={products}/>
                            <FilterDrawer showFilterDrawer={showFilterDrawer}>
                                <CloseFilterButton onClick={() => setShowFilterDrawer(s => !s)}>
                                    X
                                </CloseFilterButton>
                                <p>دسته بندی ها :</p>
                                <hr/>
                                <FilterCheckBoxContainer>
                                    <Link href="hey">
                                        <a>
                                            <FilterCheckBox active={true}/>
                                        </a>
                                    </Link>
                                    <FilterCheckBoxLabel>
                                        دسته بندی 1
                                    </FilterCheckBoxLabel>
                                </FilterCheckBoxContainer>
                                <p>برندها :</p>
                                <hr/>

                                <FilterCheckBoxContainer>
                                    <FilterCheckBox active={true}/>
                                    <FilterCheckBoxLabel>
                                        برند 1
                                    </FilterCheckBoxLabel>
                                </FilterCheckBoxContainer>
                            </FilterDrawer>
                        </div>
                    </div>
                </div>
            </div>

        </MainLayout>
    );
};


export async function getServerSideProps({query}) {
    const products = await getReq(PRODUCT_URL)
    return {
        props: {
            products
        }
    }
}


export default Shop;


