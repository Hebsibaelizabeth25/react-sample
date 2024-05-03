import React, { useState, useEffect } from 'react';
import { Galleria } from 'primereact/galleria';
import img1 from '../../assets/about-1.jpg';
import img2 from '../../assets/banner2.jpg';
import { Carousel } from 'primereact/carousel';

import image1 from '../../assets/back-banner.jpg'; // Import the image directly
import './home.css';
import DynamicDemo from '../Provide/provide';


function Home() {
    const [images, setImages] = useState([
        { itemImageSrc: img1, thumbnailImageSrc: img1, alt: 'Image 1', caption: 'Welcome' },
        { itemImageSrc: img2, thumbnailImageSrc: img2, alt: 'Image 2', caption: 'Glow Everywhere' },
    ]);

    useEffect(() => {
    }, []);
    const itemTemplate = (item) => {
        return (
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                <img src={item.itemImageSrc} alt={item.alt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div className="caption" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'white', backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: '5px' }}>{item.caption}</div>
            </div>
        );
    }

    const thumbnailTemplate = (item) => {
        return <img src={item.thumbnailImageSrc} alt={item.alt} style={{ display: 'none' }} />;
    }

    return (
        <div className="card" style={{ overflow: 'hidden' }}>
            <Galleria
                value={images}
                numVisible={5}
                circular
                style={{ width: '100vw', height: '100vh' }}
                thumbnail={thumbnailTemplate}
                autoPlay
                transitionInterval={2000}
                showThumbnails={false}
                showItemNavigators
                item={itemTemplate}
                autoplay
                autoplayInterval={4000}
            />
        </div>
    
    )
}
export default Home