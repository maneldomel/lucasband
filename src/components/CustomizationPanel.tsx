import React, { useState, useEffect } from 'react';
import { X, Save, Image, Type, RotateCcw } from 'lucide-react';

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

interface CustomizationPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: CustomizationData) => void;
  currentData: CustomizationData;
}

const defaultData: CustomizationData = {
  headline: "sua headline aqui",
  videoPlaceholderText: "Vídeo será adicionado aqui",
  audioWarningTitle: "Please make sure your sound is on",
  audioWarningSubtitle: "This video contains important audio information",
  videoWarningTitle: "This video may be taken down at any time",
  videoWarningSubtitle: "Watch now before it's removed from the internet",
  guaranteeTitle: "180 Days Guarantee",
  guaranteeSubtitle: "100% money-back guarantee",
  guaranteeDescription: "Your order today is protected by our iron-clad 180-day 100% money-back guarantee. If you're not amazed by how well SUA MARCA enhances your vitality and performance, helping you overcome the challenges of performance problems, or if you don't feel more confident and satisfied, just let us know at any time within the next 180 days, and we'll refund every penny of your investment. No questions asked.",
  mainOfferImage: "https://i.imgur.com/favx8kc.png",
  offer1Image: "https://i.imgur.com/qKGOtUf.png",
  offer2Image: "https://i.imgur.com/XiIuUjg.png",
  mainOfferCheckoutUrl: "https://your-checkout-domain.com/checkout",
  offer1CheckoutUrl: "https://your-checkout-domain.com/checkout",
  offer2CheckoutUrl: "https://your-checkout-domain.com/checkout"
};

const CustomizationPanel: React.FC<CustomizationPanelProps> = ({
  isOpen,
  onClose,
  onSave,
  currentData
}) => {
  const [formData, setFormData] = useState<CustomizationData>(currentData);

  useEffect(() => {
    setFormData(currentData);
  }, [currentData]);

  const handleInputChange = (field: keyof CustomizationData, value: string) => {
    // Handle boolean conversion for checkbox fields
    let processedValue: any = value;
    if (field === 'vslAutoplay' || field === 'vslControls' || field === 'vslMuted') {
      processedValue = value === 'true';
    }
    
    setFormData(prev => ({
      ...prev,
      [field]: processedValue
    }));
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  const handleReset = () => {
    setFormData(defaultData);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 z-50 bg-black bg-opacity-50" onClick={onClose} />
      
      {/* Panel */}
      <div className="fixed inset-y-0 right-0 z-50 w-96 bg-white shadow-xl overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Personalizar Página</h2>
            <h2 className="text-xl font-bold text-gray-900">Customize Page</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-6">
            {/* Texts Section */}
            <div>
              <div className="flex items-center mb-4">
                <Type className="w-5 h-5 text-blue-600 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900">Texts</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Main Headline
                  </label>
                  <input
                    type="text"
                    value={formData.headline}
                    onChange={(e) => handleInputChange('headline', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="your headline here"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Video Placeholder Text
                  </label>
                  <input
                    type="text"
                    value={formData.videoPlaceholderText}
                    onChange={(e) => handleInputChange('videoPlaceholderText', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Audio Warning - Title
                  </label>
                  <input
                    type="text"
                    value={formData.audioWarningTitle}
                    onChange={(e) => handleInputChange('audioWarningTitle', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Audio Warning - Subtitle
                  </label>
                  <input
                    type="text"
                    value={formData.audioWarningSubtitle}
                    onChange={(e) => handleInputChange('audioWarningSubtitle', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Video Warning - Title
                  </label>
                  <input
                    type="text"
                    value={formData.videoWarningTitle}
                    onChange={(e) => handleInputChange('videoWarningTitle', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Video Warning - Subtitle
                  </label>
                  <input
                    type="text"
                    value={formData.videoWarningSubtitle}
                    onChange={(e) => handleInputChange('videoWarningSubtitle', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Guarantee - Title
                  </label>
                  <input
                    type="text"
                    value={formData.guaranteeTitle}
                    onChange={(e) => handleInputChange('guaranteeTitle', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Guarantee - Subtitle
                  </label>
                  <input
                    type="text"
                    value={formData.guaranteeSubtitle}
                    onChange={(e) => handleInputChange('guaranteeSubtitle', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Guarantee - Description
                  </label>
                  <textarea
                    value={formData.guaranteeDescription}
                    onChange={(e) => handleInputChange('guaranteeDescription', e.target.value)}
                    rows={4}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Images Section */}
            <div>
              <div className="flex items-center mb-4">
                <Image className="w-5 h-5 text-green-600 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900">Images</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Main Offer Image
                  </label>
                  <input
                    type="url"
                    value={formData.mainOfferImage}
                    onChange={(e) => handleInputChange('mainOfferImage', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://..."
                  />
                  {formData.mainOfferImage && (
                    <img 
                      src={formData.mainOfferImage} 
                      alt="Preview" 
                      className="mt-2 w-full h-32 object-cover rounded-lg border"
                    />
                  )}
                  <label className="block text-sm font-medium text-gray-700 mb-2 mt-3">
                    Checkout Link - Main Offer
                  </label>
                  <input
                    type="url"
                    value={formData.mainOfferCheckoutUrl}
                    onChange={(e) => handleInputChange('mainOfferCheckoutUrl', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://your-checkout-domain.com/checkout"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Offer 1 Image
                  </label>
                  <input
                    type="url"
                    value={formData.offer1Image}
                    onChange={(e) => handleInputChange('offer1Image', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://..."
                  />
                  {formData.offer1Image && (
                    <img 
                      src={formData.offer1Image} 
                      alt="Preview" 
                      className="mt-2 w-full h-32 object-cover rounded-lg border"
                    />
                  )}
                  <label className="block text-sm font-medium text-gray-700 mb-2 mt-3">
                    Checkout Link - Offer 1
                  </label>
                  <input
                    type="url"
                    value={formData.offer1CheckoutUrl}
                    onChange={(e) => handleInputChange('offer1CheckoutUrl', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://your-checkout-domain.com/checkout"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Offer 2 Image
                  </label>
                  <input
                    type="url"
                    value={formData.offer2Image}
                    onChange={(e) => handleInputChange('offer2Image', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://..."
                  />
                  {formData.offer2Image && (
                    <img 
                      src={formData.offer2Image} 
                      alt="Preview" 
                      className="mt-2 w-full h-32 object-cover rounded-lg border"
                    />
                  )}
                  <label className="block text-sm font-medium text-gray-700 mb-2 mt-3">
                    Checkout Link - Offer 2
                  </label>
                  <input
                    type="url"
                    value={formData.offer2CheckoutUrl}
                    onChange={(e) => handleInputChange('offer2CheckoutUrl', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://your-checkout-domain.com/checkout"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-6 border-t border-gray-200">
              <button
                onClick={handleReset}
                className="flex items-center px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </button>
              <button
                onClick={handleSave}
                className="flex-1 flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomizationPanel;