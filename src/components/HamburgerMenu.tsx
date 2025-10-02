import React, { useState } from 'react';
import { Menu, X, Settings, Eye, EyeOff, Link, Target, TrendingUp, TrendingDown, Palette, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { buildURLWithParams, type UTMParams } from '../utils/urlUtils';

import { CloakingConfig, loadCloakingConfig, saveCloakingConfig } from '../utils/cloaking';

interface HamburgerMenuProps {
  showDTC: boolean;
  onToggleDTC: (show: boolean) => void;
  urlParams: UTMParams;
  onOpenCustomization: () => void;
}

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ 
  showDTC, 
  onToggleDTC, 
  urlParams,
  onOpenCustomization
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleToggleDTC = () => {
    onToggleDTC(!showDTC);
    setIsOpen(false);
  };

  const handleNavigateToUpsell = () => {
    // Navigate to upsell with all parameters preserved
    const upsellUrl = buildURLWithParams('/up1', {
      ...urlParams,
      source: 'hamburger_menu'
    });
    
    // Use navigate with search params
    const url = new URL(upsellUrl, window.location.origin);
    navigate(`${url.pathname}${url.search}`);
    setIsOpen(false);
  };

  const handleNavigateToDownsell = () => {
    // Navigate to downsell with all parameters preserved
    const downsellUrl = buildURLWithParams('/dw1', {
      ...urlParams,
      source: 'hamburger_menu'
    });
    
    // Use navigate with search params
    const url = new URL(downsellUrl, window.location.origin);
    navigate(`${url.pathname}${url.search}`);
    setIsOpen(false);
  };

  const handleNavigateToPresell = () => {
    // Navigate to presell with all parameters preserved
    const presellUrl = buildURLWithParams('/pr', {
      ...urlParams,
      source: 'hamburger_menu'
    });
    
    // Use navigate with search params
    const url = new URL(presellUrl, window.location.origin);
    navigate(`${url.pathname}${url.search}`);
    setIsOpen(false);
  };

  const handleOpenCustomization = () => {
    onOpenCustomization();
    setIsOpen(false);
  };

  // Check if Meta Pixel is loaded
  const checkMetaPixel = () => {
    const hasMetaPixel = typeof window !== 'undefined' && 
      (window as any).fbq !== undefined;
    return hasMetaPixel;
  };

  // Check if Google Analytics/GTM is loaded
  const checkGooglePixel = () => {
    const hasGA = typeof window !== 'undefined' && 
      ((window as any).gtag !== undefined || 
       (window as any).ga !== undefined ||
       (window as any).dataLayer !== undefined);
    return hasGA;
  };

  // Check if TikTok Pixel is loaded
  const checkTikTokPixel = () => {
    const hasTikTokPixel = typeof window !== 'undefined' && 
      ((window as any).ttq !== undefined ||
       (window as any).TiktokAnalyticsObject !== undefined);
    return hasTikTokPixel;
  };

  const hasUrlParams = Object.keys(urlParams).length > 0;
  const metaPixelActive = checkMetaPixel();
  const googlePixelActive = checkGooglePixel();
  const tiktokPixelActive = checkTikTokPixel();

  // Show hamburger menu in development or when accessing /admin
  const isAdminPath = typeof window !== 'undefined' && window.location.pathname === '/admin';
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  // Always show menu if it's admin path, regardless of environment
  if (!isDevelopment && !isAdminPath) {
    return null;
  }

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={toggleMenu}
        className="fixed top-4 right-4 z-50 p-2 bg-white rounded-lg shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors"
        aria-label="Menu"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-gray-700" />
        ) : (
          <Menu className="w-6 h-6 text-gray-700" />
        )}
      </button>

      {/* Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-50" onClick={toggleMenu} />
      )}

      {/* Menu Panel */}
      <div className={`fixed top-0 right-0 z-40 w-80 h-full bg-white shadow-xl transform transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      } overflow-y-auto`}>
        <div className="p-6 pt-16 min-h-full">
          <div className="flex items-center mb-6">
            <Settings className="w-5 h-5 text-gray-600 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900">Configurações</h2>
          </div>

          <div className="space-y-6">
            {/* Navigation */}
            <div className="border-b border-gray-200 pb-4">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Navegação</h3>
              <div className="space-y-2">
                <button
                  onClick={() => {
                    const homeUrl = buildURLWithParams('/', {
                      ...urlParams,
                      source: 'hamburger_menu'
                    });
                    const url = new URL(homeUrl, window.location.origin);
                    navigate(`${url.pathname}${url.search}`);
                    setIsOpen(false);
                  }}
                  className="flex items-center w-full p-3 rounded-lg border border-gray-200 bg-gray-50 text-gray-800 hover:bg-gray-100 transition-colors"
                >
                  <Home className="w-4 h-4 mr-2" />
                  <span className="font-medium">Página Principal</span>
                </button>
                <button
                  onClick={handleOpenCustomization}
                  className="flex items-center w-full p-3 rounded-lg border border-purple-200 bg-purple-50 text-purple-800 hover:bg-purple-100 transition-colors"
                >
                  <Palette className="w-4 h-4 mr-2" />
                  <span className="font-medium">Personalizar Página</span>
                </button>
                <button
                  onClick={handleNavigateToPresell}
                  className="flex items-center w-full p-3 rounded-lg border border-indigo-200 bg-indigo-50 text-indigo-800 hover:bg-indigo-100 transition-colors"
                >
                  <TrendingUp className="w-4 h-4 mr-2" />
                  <span className="font-medium">Ir para Presell</span>
                </button>
                <button
                  onClick={handleNavigateToUpsell}
                  className="flex items-center w-full p-3 rounded-lg border border-blue-200 bg-blue-50 text-blue-800 hover:bg-blue-100 transition-colors"
                >
                  <TrendingUp className="w-4 h-4 mr-2" />
                  <span className="font-medium">Ir para Upsell 1</span>
                </button>
                <button
                  onClick={handleNavigateToDownsell}
                  className="flex items-center w-full p-3 rounded-lg border border-orange-200 bg-orange-50 text-orange-800 hover:bg-orange-100 transition-colors"
                >
                  <TrendingDown className="w-4 h-4 mr-2" />
                  <span className="font-medium">Ir para Downsell 1</span>
                </button>
              </div>
            </div>

            {/* DTC Toggle */}
            <div className="border-b border-gray-200 pb-4">
              <h3 className="text-sm font-medium text-gray-900 mb-3">DTC Control</h3>
              <button
                onClick={handleToggleDTC}
                className={`flex items-center justify-between w-full p-3 rounded-lg border transition-colors ${
                  showDTC 
                    ? 'bg-green-50 border-green-200 text-green-800' 
                    : 'bg-red-50 border-red-200 text-red-800'
                }`}
              >
                <div className="flex items-center">
                  {showDTC ? (
                    <Eye className="w-4 h-4 mr-2" />
                  ) : (
                    <EyeOff className="w-4 h-4 mr-2" />
                  )}
                  <span className="font-medium">
                    DTC {showDTC ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <div className={`w-3 h-3 rounded-full ${
                  showDTC ? 'bg-green-500' : 'bg-red-500'
                }`} />
              </button>
            </div>

            {/* URL Parameters Status */}
            <div className="border-b border-gray-200 pb-4">
              <h3 className="text-sm font-medium text-gray-900 mb-3">URL Parameters</h3>
              <div className={`p-3 rounded-lg border ${
                hasUrlParams 
                  ? 'bg-green-50 border-green-200' 
                  : 'bg-yellow-50 border-yellow-200'
              }`}>
                <div className="flex items-center mb-2">
                  <Link className="w-4 h-4 mr-2 text-gray-600" />
                  <span className={`font-medium ${
                    hasUrlParams ? 'text-green-800' : 'text-yellow-800'
                  }`}>
                    {hasUrlParams ? 'Parameters Detected' : 'No Parameters'}
                  </span>
                </div>
                {hasUrlParams && (
                  <div className="text-xs text-gray-600 space-y-1">
                    {Object.entries(urlParams).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="font-mono">{key}:</span>
                        <span className="font-mono text-blue-600">{value}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Pixel Status */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">Pixel Status</h3>
              <div className="space-y-3">
                {/* Meta Pixel */}
                <div className={`p-3 rounded-lg border ${
                  metaPixelActive 
                    ? 'bg-green-50 border-green-200' 
                    : 'bg-red-50 border-red-200'
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Target className="w-4 h-4 mr-2 text-gray-600" />
                      <span className={`font-medium ${
                        metaPixelActive ? 'text-green-800' : 'text-red-800'
                      }`}>
                        Meta Pixel
                      </span>
                    </div>
                    <div className={`w-3 h-3 rounded-full ${
                      metaPixelActive ? 'bg-green-500' : 'bg-red-500'
                    }`} />
                  </div>
                  <p className="text-xs text-gray-600 mt-1">
                    {metaPixelActive ? 'Active and working' : 'Not detected'}
                  </p>
                </div>

                {/* Google Pixel */}
                <div className={`p-3 rounded-lg border ${
                  googlePixelActive 
                    ? 'bg-green-50 border-green-200' 
                    : 'bg-red-50 border-red-200'
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Target className="w-4 h-4 mr-2 text-gray-600" />
                      <span className={`font-medium ${
                        googlePixelActive ? 'text-green-800' : 'text-red-800'
                      }`}>
                        Google Pixel
                      </span>
                    </div>
                    <div className={`w-3 h-3 rounded-full ${
                      googlePixelActive ? 'bg-green-500' : 'bg-red-500'
                    }`} />
                  </div>
                  <p className="text-xs text-gray-600 mt-1">
                    {googlePixelActive ? 'Active and working' : 'Not detected'}
                  </p>
                </div>

                {/* TikTok Pixel */}
                <div className={`p-3 rounded-lg border ${
                  tiktokPixelActive 
                    ? 'bg-green-50 border-green-200' 
                    : 'bg-red-50 border-red-200'
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Target className="w-4 h-4 mr-2 text-gray-600" />
                      <span className={`font-medium ${
                        tiktokPixelActive ? 'text-green-800' : 'text-red-800'
                      }`}>
                        TikTok Pixel
                      </span>
                    </div>
                    <div className={`w-3 h-3 rounded-full ${
                      tiktokPixelActive ? 'bg-green-500' : 'bg-red-500'
                    }`} />
                  </div>
                  <p className="text-xs text-gray-600 mt-1">
                    {tiktokPixelActive ? 'Active and working' : 'Not detected'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Debug Info */}
          <div className="mt-8 pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              Development environment
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default HamburgerMenu;