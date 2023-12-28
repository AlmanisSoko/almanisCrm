import React from 'react';
import HeaderNav from '../../components/HeaderNav';

const Home = ({ }) => {

    const desktopStyle = {
        width: 'calc(100% - 265px)',
        marginLeft: '265px',
    };

    const mobileStyle = {
        width: '100%',
        marginLeft: '0',
    };

    // Apply media queries
    const mediaQuery = window.matchMedia('(min-width: 768px)');
    
    return (
        <div>
            <div className="min-height-300 bg-dark position-absolute w-100"></div>
            <HeaderNav/>
                <div className="container-fluid py-4" style={mediaQuery.matches ? desktopStyle : mobileStyle}>

                    
                    
                </div>
            
        </div>
    )
};
  
export default Home;
  
