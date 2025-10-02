import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Play, Volume2 } from 'lucide-react';
import DTCBlock from './components/DTCBlock';
import HamburgerMenu from './components/HamburgerMenu';
import CustomizationPanel from './components/CustomizationPanel';
import Upsell1 from './pages/Upsell1';
import Downsell1 from './pages/Downsell1';
import Presell from './pages/Presell';
import { getAllParams, storeParams, type UTMParams } from './utils/urlUtils';

interface CustomizationData {
  headline: string;
  videoPlaceholderText: string;
  audioWarningTitle: string;
  audioWarningSubtitle: string;
  videoWarningTitle: string;
  videoWarningSubtitle: string;
  guaranteeTitle: string;
  guaranteeSubtitle: string;
  guaranteeDescription: string;
  mainOfferImage: string;
  offer1Image: string;
  offer2Image: string;
  mainOfferCheckoutUrl: string;
  offer1CheckoutUrl: string;
  offer2CheckoutUrl: string;
}

const defaultCustomizationData: CustomizationData = {
  headline: "your headline here",
  videoPlaceholderText: "Video will be added here",
  audioWarningTitle: "Please make sure your sound is on",
  audioWarningSubtitle: "This video contains important audio information",
  videoWarningTitle: "This video may be taken down at any time",
  videoWarningSubtitle: "Watch now before it's removed from the internet",
  guaranteeTitle: "180 Days Guarantee",
  guaranteeSubtitle: "100% money-back guarantee",
  guaranteeDescription: "Your order today is protected by our iron-clad 180-day 100% money-back guarantee. If you're not amazed by how well YOUR BRAND enhances your vitality and performance, helping you overcome the challenges of performance problems, or if you don't feel more confident and satisfied, just let us know at any time within the next 180 days, and we'll refund every penny of your investment. No questions asked.",
  mainOfferImage: "https://i.imgur.com/favx8kc.png",
  offer1Image: "https://i.imgur.com/qKGOtUf.png",
  offer2Image: "https://i.imgur.com/XiIuUjg.png",
  mainOfferCheckoutUrl: "https://your-checkout-domain.com/checkout",
  offer1CheckoutUrl: "https://your-checkout-domain.com/checkout",
  offer2CheckoutUrl: "https://your-checkout-domain.com/checkout"
};

function HomePage() {
  const [showDTC, setShowDTC] = useState(false);
  const [urlParams, setUrlParams] = useState<UTMParams>({});
  const [showCustomizationPanel, setShowCustomizationPanel] = useState(false);
  const [customizationData, setCustomizationData] = useState<CustomizationData>(defaultCustomizationData);
  const dtcBlockRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Capture URL parameters on app load
    const params = getAllParams();
    setUrlParams(params);
    
    // Store parameters for persistence across pages
    storeParams(params);
    
    // Load customization data from localStorage
    const savedCustomization = localStorage.getItem('pageCustomization');
    if (savedCustomization) {
      try {
        setCustomizationData(JSON.parse(savedCustomization));
      } catch (error) {
        console.warn('Failed to load customization data:', error);
      }
    }
    
    // Log captured parameters for debugging
    console.log('Captured URL Parameters:', params);
    
    // Preload DTC images immediately
    const preloadImages = () => {
      const imageUrls = [
        '/image.png',
        'https://i.imgur.com/qKGOtUf.png',
        'https://i.imgur.com/XiIuUjg.png'
      ];

      imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
      });
    };

    preloadImages();
    
    const timer = setTimeout(() => {
      setShowDTC(true);
    }, 10000); // 10 segundos

    return () => clearTimeout(timer);
  }, []);

  const handleDTCMount = () => {
    // Pequeno delay para garantir que o componente foi renderizado
    setTimeout(() => {
      if (dtcBlockRef.current) {
        dtcBlockRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }, 100);
  };

  const handleToggleDTC = (show: boolean) => {
    setShowDTC(show);
    if (show && dtcBlockRef.current) {
      setTimeout(() => {
        dtcBlockRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }, 100);
    }
  };

  const handleSaveCustomization = (data: CustomizationData) => {
    setCustomizationData(data);
    localStorage.setItem('pageCustomization', JSON.stringify(data));
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Hamburger Menu - Only in Bolt environment */}
      {(process.env.NODE_ENV === 'development' || window.location.pathname === '/admin') && (
        <HamburgerMenu 
          showDTC={showDTC}
          onToggleDTC={handleToggleDTC}
          urlParams={urlParams}
          onOpenCustomization={() => setShowCustomizationPanel(true)}
        />
      )}
      
      {/* Customization Panel */}
      <CustomizationPanel
        isOpen={showCustomizationPanel}
        onClose={() => setShowCustomizationPanel(false)}
        onSave={handleSaveCustomization}
        currentData={customizationData}
      />
      
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-sm">
          {/* Headline */}
          <h1 className="text-4xl md:text-5xl font-black text-blue-600 text-center mb-8 leading-tight">
            {customizationData.headline}
          </h1>
          
          {/* Container com proporção 9:16 */}
          <div className="relative w-full aspect-[9/16] bg-gray-100 rounded-lg shadow-lg overflow-hidden border border-gray-200">
            {/* Placeholder content */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-300 rounded-full flex items-center justify-center">
                  <Play className="w-8 h-8 text-gray-600 ml-1" />
                </div>
                <p className="text-gray-500 text-sm font-medium">
                  {customizationData.videoPlaceholderText}
                </p>
              </div>
            </div>
          </div>
          
          {/* Audio warning */}
          <div className="flex items-center justify-center mt-4 text-gray-600">
            <Volume2 className="w-5 h-5 mr-2" />
            <div className="text-center">
              <p className="text-sm font-medium">{customizationData.audioWarningTitle}</p>
              <p className="text-xs">{customizationData.audioWarningSubtitle}</p>
            </div>
          </div>
          
          {/* Video warning block */}
          <div className="mt-6 max-w-sm mx-auto">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="w-5 h-5 text-red-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">
                    {customizationData.videoWarningTitle}
                  </h3>
                  <p className="text-sm text-red-700 mt-1">
                    {customizationData.videoWarningSubtitle}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {showDTC && (
        <div ref={dtcBlockRef}>
          <DTCBlock 
            onMount={handleDTCMount} 
            customImages={{
              mainOffer: customizationData.mainOfferImage,
              offer1: customizationData.offer1Image,
              offer2: customizationData.offer2Image
            }}
            customCheckoutUrls={{
              mainOffer: customizationData.mainOfferCheckoutUrl,
              offer1: customizationData.offer1CheckoutUrl,
              offer2: customizationData.offer2CheckoutUrl
            }}
          />
        </div>
      )}
      
      {/* Guarantee Block */}
      {showDTC && (
        <div className="bg-blue-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Guarantee Icon */}
            <div className="flex-shrink-0">
              <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
            </div>
            
            {/* Guarantee Text */}
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-3xl font-bold text-gray-900 mb-2">
                {customizationData.guaranteeTitle}
              </h3>
              <p className="text-xl text-blue-600 font-semibold mb-4">
                {customizationData.guaranteeSubtitle}
              </p>
              <p className="text-gray-700 leading-relaxed">
                {customizationData.guaranteeDescription}
              </p>
            </div>
          </div>
        </div>
        </div>
      )}
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center space-y-4">
            <p className="text-sm text-gray-300">
              Copyright ©2024 | Your Brand All Rights Reserved
            </p>
            <p className="text-xs text-gray-400 max-w-3xl mx-auto">
              These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/admin" element={<HomePage />} />
      <Route path="/pr" element={<Presell />} />
      <Route path="/up1" element={<Upsell1 />} />
      <Route path="/dw1" element={<Downsell1 />} />
    </Routes>
  );
}

export default App;