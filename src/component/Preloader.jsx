import React, { useEffect } from 'react';
import '../component/Preloader.css';
// import { gsap } from 'gsap';

function Preloader() {
    useEffect(() => {
        var tl = gsap.timeline();
        
        // Text animations
        tl.to('.loaderrow1 h1', {
            left: '3%',
            duration: 2,
            ease: "back.inOut(2)",
        });
        
        tl.to(".loaderbox1 h1", {
            left: '13%',
            duration: 2,
            ease: "back.inOut(2)",
            delay: '-0.5'
        }, 'same');
        
        tl.to(".loaderbox2 h1", {
            right: '3%',
            duration: 2,
            ease: "back.inOut(2)",
            delay: '-0.5'
        }, 'same');
        
        tl.to('.loaderbox1 h1', {
            scale: 0,
            ease: 'power3.inOut',
            duration: 0.95
        }, 'same2');
        
        tl.to('.loaderbox2 h1', {
            scale: 0,
            ease: 'power3.inOut',
            duration: 0.95
        }, 'same2');
        
        tl.to('.loaderrow1 h1', {
            scale: 0,
            ease: 'power3.inOut',
            duration: 0.95
        }, 'same2');
        
        // Curtain effect animation using clip-path
        tl.to('.loader', {
            clipPath: 'inset(0 0 100% 0)',
            duration: 1.5,
            ease: 'power4.inOut',
            onComplete: () => {
                // Optional: remove the loader from DOM after animation
                document.querySelector('.loader').style.display = 'none';
            }
        });
    }, []);

    return (
        <>
            <div className="loader">
                <div className="loaderrow1">
                    <h1>Universal</h1>
                </div>
                <div className="loaderrow2">
                    <div className="loaderbox1">
                        <h1>Data</h1>
                    </div>
                    <div className="loaderbox2">
                        <h1>Scrapper</h1>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Preloader;