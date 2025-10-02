import React from 'react';
import { CheckCircle, Shield } from 'lucide-react';
import HamburgerMenu from '../components/HamburgerMenu';
import { getAllParams, buildURLWithParams, type UTMParams } from '../utils/urlUtils';

const Upsell1: React.FC = () => {
  const [urlParams] = React.useState<UTMParams>(getAllParams());
  const [showDTC, setShowDTC] = React.useState(false);

  const handleToggleDTC = (show: boolean) => {
    setShowDTC(show);
  };

  const handleOpenCustomization = () => {
    console.log('Customization panel not available on this page');
  };

  const handleAcceptOffer = () => {
    console.log('Upsell 1 accepted with params:', urlParams);
    
    // Example: redirect to checkout with all parameters
    const checkoutUrl = buildURLWithParams('/checkout', {
      ...urlParams,
      upsell1: 'accepted',
      offer_type: 'premium_package'
    });
    
    console.log('Redirecting to checkout:', checkoutUrl);
    // window.location.href = checkoutUrl;
  };

  const handleDeclineOffer = () => {
    console.log('Upsell 1 declined with params:', urlParams);
    
    // Example: redirect to next upsell or thank you page
    const nextUrl = buildURLWithParams('/up2', {
      ...urlParams,
      upsell1: 'declined'
    });
    
    console.log('Redirecting to next step:', nextUrl);
    // window.location.href = nextUrl;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hamburger Menu - Only in Bolt environment */}
      {process.env.NODE_ENV === 'development' && (
        <HamburgerMenu 
          showDTC={showDTC}
          onToggleDTC={handleToggleDTC}
          urlParams={urlParams}
          onOpenCustomization={handleOpenCustomization}
        />
      )}
      
      {/* Header */}
      <div className="bg-white shadow-sm h-16"></div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Main Content */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Wait! Special Offer
          </h1>
          
          <p className="text-xl text-gray-600 mb-2">
            Before you continue, we have an exclusive offer for you
          </p>
          
          <div className="inline-block bg-red-100 text-red-800 px-4 py-2 rounded-full text-sm font-semibold">
            ⏰ This offer expires in a few minutes
          </div>
        </div>

        {/* Offer Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Product Image */}
            <div className="text-center">
              <img 
                src="https://i.imgur.com/Psf4kAw.png" 
                alt="Upsell Product" 
                className="w-full max-w-sm mx-auto rounded-lg shadow-lg"
              />
            </div>

            {/* Offer Details */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Maximize Your Results
              </h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Advanced formula with premium ingredients</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">3x faster results</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Extended 365-day guarantee</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Priority 24/7 support</span>
                </div>
              </div>

              {/* Pricing */}
              <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg mb-6">
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-2">Regular price: <span className="line-through">$297</span></p>
                  <p className="text-3xl font-bold text-green-600 mb-2">$97</p>
                  <p className="text-sm text-gray-600">Exclusive offer - today only</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleAcceptOffer}
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-bold py-4 px-6 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
                >
                  YES! I Want to Maximize My Results
                </button>
                
                <button
                  onClick={handleDeclineOffer}
                  className="w-full bg-gray-200 text-gray-700 font-medium py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  No, thank you. Continue without this offer
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Guarantee */}
        <div className="bg-blue-50 rounded-xl p-6">
          <div className="flex items-center justify-center mb-4">
            <Shield className="w-8 h-8 text-blue-600" />
          </div>
          <h3 className="text-xl font-bold text-center text-gray-900 mb-2">
            Full 365-Day Guarantee
          </h3>
          <p className="text-center text-gray-700">
            If you're not 100% satisfied, we'll refund all your money. No questions, no complications.
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-sm text-gray-300">
            Copyright ©2024 | Your Brand All Rights Reserved
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Upsell1;