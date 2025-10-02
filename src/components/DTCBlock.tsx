import React from 'react';
import { getAllParams, buildURLWithParams, type UTMParams } from '../utils/urlUtils';

// Preload images
const preloadImages = () => {
  const imageUrls = [
    'https://i.imgur.com/Psf4kAw.png',
    'https://i.imgur.com/1in1oo5.png',
    'https://i.imgur.com/qKGOtUf.png',
    'https://i.imgur.com/XiIuUjg.png'
  ];

  imageUrls.forEach(url => {
    const img = new Image();
    img.src = url;
  });
};

interface DTCBlockProps {
  onMount?: () => void;
  customImages?: {
    mainOffer: string;
    offer1: string;
    offer2: string;
  };
  customCheckoutUrls?: {
    mainOffer: string;
    offer1: string;
    offer2: string;
  };
}

const DTCBlock: React.FC<DTCBlockProps> = ({ onMount, customImages, customCheckoutUrls }) => {
  const dtcRef = React.useRef<HTMLDivElement>(null);
  const [urlParams, setUrlParams] = React.useState<UTMParams>({});

  React.useEffect(() => {
    // Capture URL parameters when component mounts
    const params = getAllParams();
    setUrlParams(params);
    
    if (onMount) {
      onMount();
    }
  }, [onMount]);

  const handleOfferClick = (offerType: string, customUrl?: string) => {
    // Use custom checkout URL if provided, otherwise use default
    const baseUrl = customUrl || 'https://your-checkout-domain.com/checkout';
    
    // Redirect to checkout with all parameters preserved
    const checkoutUrl = buildURLWithParams(baseUrl, {
      ...urlParams,
      offer: offerType,
      source_page: 'main_dtc',
      timestamp: Date.now().toString()
    });
    
    console.log('Redirecting to:', checkoutUrl);
    console.log('UTM Parameters:', urlParams);
    console.log('Offer Type:', offerType);
    
    // Uncomment to actually redirect:
    // window.location.href = checkoutUrl;
  };

  return (
    <div ref={dtcRef} className="bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center space-y-6">
          <h2 className="text-3xl font-bold text-gray-900">
            Transform Your Life Today
          </h2>
          
          {/* Main DTC Offer Image */}
          <div className="max-w-md mx-auto">
            <button 
              onClick={() => handleOfferClick('6-bottle', customCheckoutUrls?.mainOffer)}
              className="hover:scale-105 transition-transform duration-200 w-full"
            >
              <img 
                src={customImages?.mainOffer || "https://i.imgur.com/favx8kc.png"} 
                alt="6 Bottle Package - Best Value Offer" 
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </button>
          </div>
          
          {/* Additional Offer Images */}
          <div className="flex flex-row gap-2 sm:gap-4 justify-center items-center mt-8 max-w-2xl mx-auto">
            <button 
              onClick={() => handleOfferClick('3-bottle', customCheckoutUrls?.offer1)}
              className="hover:scale-105 transition-transform duration-200"
            >
              <img 
                src={customImages?.offer1 || "https://i.imgur.com/qKGOtUf.png"} 
                alt="Offer 1" 
                className="w-full max-w-xs sm:max-w-sm h-auto rounded-lg shadow-lg"
              />
            </button>
            <button 
              onClick={() => handleOfferClick('1-bottle', customCheckoutUrls?.offer2)}
              className="hover:scale-105 transition-transform duration-200"
            >
              <img 
                src={customImages?.offer2 || "https://i.imgur.com/XiIuUjg.png"} 
                alt="Offer 2" 
                className="w-full max-w-xs sm:max-w-sm h-auto rounded-lg shadow-lg"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DTCBlock;