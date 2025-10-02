import React from 'react';
import { CheckCircle, Shield, Clock } from 'lucide-react';
import HamburgerMenu from '../components/HamburgerMenu';
import { getAllParams, buildURLWithParams, type UTMParams } from '../utils/urlUtils';

const Downsell1: React.FC = () => {
  const [urlParams] = React.useState<UTMParams>(getAllParams());
  const [showDTC, setShowDTC] = React.useState(false);

  const handleToggleDTC = (show: boolean) => {
    setShowDTC(show);
  };

  const handleOpenCustomization = () => {
    console.log('Customization panel not available on this page');
  };

  const handleAcceptOffer = () => {
    console.log('Downsell 1 accepted with params:', urlParams);
    
    // Example: redirect to checkout with all parameters
    const checkoutUrl = buildURLWithParams('/checkout', {
      ...urlParams,
      downsell1: 'accepted',
      offer_type: 'basic_package'
    });
    
    console.log('Redirecting to checkout:', checkoutUrl);
    // window.location.href = checkoutUrl;
  };

  const handleDeclineOffer = () => {
    console.log('Downsell 1 declined with params:', urlParams);
    
    // Example: redirect to thank you page or exit
    const nextUrl = buildURLWithParams('/thank-you', {
      ...urlParams,
      downsell1: 'declined'
    });
    
    console.log('Redirecting to thank you:', nextUrl);
    // window.location.href = nextUrl;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100">
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
            Last Chance!
          </h1>
          
          <p className="text-xl text-gray-600 mb-2">
            Don't miss this unique opportunity
          </p>
          
          <div className="inline-flex items-center bg-red-100 text-red-800 px-4 py-2 rounded-full text-sm font-semibold">
            <Clock className="w-4 h-4 mr-2" />
            Limited time offer
          </div>
        </div>

        {/* Offer Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Product Image */}
            <div className="text-center">
              <img 
                src="https://i.imgur.com/XiIuUjg.png" 
                alt="Downsell Product" 
                className="w-full max-w-sm mx-auto rounded-lg shadow-lg"
              />
            </div>

            {/* Offer Details */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Essential Version
              </h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Effective basic formula</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Proven results</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">180-day guarantee</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Email support</span>
                </div>
              </div>

              {/* Pricing */}
              <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-lg mb-6">
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-2">Regular price: <span className="line-through">$197</span></p>
                  <p className="text-3xl font-bold text-orange-600 mb-2">$47</p>
                  <p className="text-sm text-gray-600">Special price - last opportunity</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleAcceptOffer}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold py-4 px-6 rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-200 transform hover:scale-105 shadow-lg"
                >
                  YES! I Want to Take This Offer
                </button>
                
                <button
                  onClick={handleDeclineOffer}
                  className="w-full bg-gray-200 text-gray-700 font-medium py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  No, thank you. Exit without buying
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Urgency Section */}
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8">
          <div className="text-center">
            <h3 className="text-xl font-bold text-red-800 mb-2">
              ⚠️ This is your last chance!
            </h3>
            <p className="text-red-700">
              If you leave this page, you won't be able to access this special offer anymore. 
              This is the lowest offer we can make.
            </p>
          </div>
        </div>

        {/* Guarantee */}
        <div className="bg-blue-50 rounded-xl p-6">
          <div className="flex items-center justify-center mb-4">
            <Shield className="w-8 h-8 text-blue-600" />
          </div>
          <h3 className="text-xl font-bold text-center text-gray-900 mb-2">
            Full 180-Day Guarantee
          </h3>
          <p className="text-center text-gray-700">
            Even with this special price, you still have our complete guarantee. 
            If you're not satisfied, we'll refund all your money.
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

export default Downsell1;