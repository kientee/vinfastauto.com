import React from 'react'

import VinSlide from '../../user/vin-slide/VinSlide'
import Block1 from '../../user/block1/Block1'
import Block2 from '../../user/block2/Block2'
import Block3 from '../../user/block3/Block3'
import Block4 from '../../user/block4/Block4'
// import RegisterSuccess from '../../user/register-success/RegisterSuccess'
import { TabTitle } from '../../../assets/setTitle'
const Home = () => {
    TabTitle('Trang Chủ')
    return (
        <>
            <VinSlide />
            <div className="block__trangchu">
                <div className="container">
                    <Block1 />
                </div>
                <Block2 />
            </div>
            <Block3 />
            <Block4 />
            {/* <RegisterSuccess /> */}
        </>
    )
}

export default Home
