import React from 'react';
import { Calendar, User, Share2, Eye, MessageCircle } from 'lucide-react';
import HamburgerMenu from '../components/HamburgerMenu';
import { getAllParams, buildURLWithParams, type UTMParams } from '../utils/urlUtils';

const Presell: React.FC = () => {
  const [urlParams] = React.useState<UTMParams>(getAllParams());
  const [showDTC, setShowDTC] = React.useState(false);

  const handleToggleDTC = (show: boolean) => {
    setShowDTC(show);
  };

  const handleOpenCustomization = () => {
    console.log('Customization panel not available on this page');
  };

  const handleContinueToOffer = () => {
    console.log('Continuing to main offer with params:', urlParams);
    
    // Navigate to main page with all parameters preserved
    const mainPageUrl = buildURLWithParams('/', {
      ...urlParams,
      source: 'presell_news',
      presell_completed: 'true'
    });
    
    console.log('Redirecting to main page:', mainPageUrl);
    window.location.href = mainPageUrl;
  };

  return (
    <div className="min-h-screen bg-white">
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
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="w-16"></div> {/* Spacer for centering */}
            
            {/* News Site Logo */}
            <div className="text-2xl font-bold text-blue-600">
              HEALTH NEWS
            </div>
            
            <div className="w-16"></div> {/* Spacer for centering */}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Article Header */}
        <article className="bg-white">
          {/* Category Tag */}
          <div className="mb-4">
            <span className="inline-block bg-red-600 text-white px-3 py-1 text-sm font-semibold rounded">
              HEALTH & WELLNESS
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Revolutionary Discovery: Researchers Develop Method That Is Transforming the Lives of Thousands
          </h1>

          {/* Subtitle */}
          <p className="text-xl text-gray-600 mb-6 leading-relaxed">
            Study conducted by renowned university reveals natural solution that promises to revolutionize the treatment of men's health problems
          </p>

          {/* Article Meta */}
          <div className="flex flex-wrap items-center gap-6 mb-8 pb-6 border-b border-gray-200">
            <div className="flex items-center text-gray-600">
              <User className="w-4 h-4 mr-2" />
              <span className="text-sm">By Dr. Ricardo Santos</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Calendar className="w-4 h-4 mr-2" />
              <span className="text-sm">January 15, 2024</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Eye className="w-4 h-4 mr-2" />
              <span className="text-sm">47,382 views</span>
            </div>
            <div className="flex items-center text-gray-600">
              <MessageCircle className="w-4 h-4 mr-2" />
              <span className="text-sm">1,247 comments</span>
            </div>
          </div>

          {/* Featured Image */}
          <div className="mb-8">
            <img 
              src="https://images.pexels.com/photos/3938023/pexels-photo-3938023.jpeg?auto=compress&cs=tinysrgb&w=1200" 
              alt="Researchers in laboratory" 
              className="w-full h-64 md:h-96 object-cover rounded-lg"
            />
            <p className="text-sm text-gray-500 mt-2 italic">
              University researchers during the studies that led to the discovery
            </p>
          </div>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            <p className="text-lg leading-relaxed mb-6">
              <strong>Boston, MA</strong> - A discovery that promises to revolutionize the treatment of men's health problems has just been revealed by researchers from Harvard University. The study, which lasted more than 3 years and involved more than 2,000 volunteers, identified a natural approach that is generating extraordinary results.
            </p>

            <p className="text-lg leading-relaxed mb-6">
              "The results exceeded all our expectations," says Dr. Ricardo Santos, research coordinator. "We are facing a discovery that can change the lives of millions of men who suffer from these problems silently."
            </p>

            {/* Quote Box */}
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 my-8">
              <blockquote className="text-xl italic text-gray-800">
                "In more than 20 years of career, I have never seen such consistent and fast results. It's truly revolutionary."
              </blockquote>
              <cite className="text-gray-600 mt-2 block">- Dr. Ricardo Santos, Research Coordinator</cite>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
              The Problem That Affects Millions
            </h2>

            <p className="text-lg leading-relaxed mb-6">
              According to health department data, more than 15 million men suffer from problems related to performance and vitality. Most seek solutions that promise results, but end up frustrated with the lack of effectiveness of conventional treatments.
            </p>

            <p className="text-lg leading-relaxed mb-6">
              "What we discovered is that the traditional approach was only attacking the symptoms, not the root cause of the problem," explains Dr. Maria Fernanda, integrative medicine specialist who participated in the study.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
              The Revolutionary Discovery
            </h2>

            <p className="text-lg leading-relaxed mb-6">
              The research identified that the specific combination of natural compounds, when administered in the correct proportion, activates biological mechanisms that had been neglected by traditional medicine.
            </p>

            {/* Statistics Box */}
            <div className="bg-green-50 rounded-lg p-6 my-8">
              <h3 className="text-xl font-bold text-green-800 mb-4">Study Results:</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">97%</div>
                  <div className="text-sm text-gray-600">of participants reported significant improvement</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">30 days</div>
                  <div className="text-sm text-gray-600">average time for first results</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">0</div>
                  <div className="text-sm text-gray-600">side effects reported</div>
                </div>
              </div>
            </div>

            <p className="text-lg leading-relaxed mb-6">
              "The most impressive thing is that the results start to appear in the first weeks," says John Silva, 45, one of the study participants. "After years of trying different treatments, I finally found something that really works."
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
              Limited Availability
            </h2>

            <p className="text-lg leading-relaxed mb-6">
              Due to the complexity of the production process and high demand, researchers warn that treatment availability is limited. "We are working to increase production, but for now we can only serve a limited number of people per month," explains Dr. Santos.
            </p>

            {/* Warning Box */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 my-8">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="w-6 h-6 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-semibold text-yellow-800">Warning:</h3>
                  <p className="text-yellow-700 mt-1">
                    Researchers warn about counterfeit products that are circulating in the market. Make sure to purchase only through official channels.
                  </p>
                </div>
              </div>
            </div>

            <p className="text-lg leading-relaxed mb-8">
              For more information about the study and how to access the treatment, interested parties can access the complete research material through the official link provided by the university.
            </p>
          </div>

          {/* CTA Section */}
          <div className="bg-blue-600 text-white rounded-lg p-8 text-center my-8">
            <h3 className="text-2xl font-bold mb-4">
              Access the Complete Study
            </h3>
            <p className="text-lg mb-6 opacity-90">
              See all the research details and learn how to access the treatment
            </p>
            
            <button
              onClick={handleContinueToOffer}
              className="inline-block bg-white text-blue-600 font-bold py-4 px-8 rounded-lg hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 shadow-lg text-lg"
            >
              View Complete Study
            </button>
            
            <p className="text-sm opacity-75 mt-4">
              📊 Access to research data • 🔬 Scientific methodology • ✅ Proven results
            </p>
          </div>

          {/* Social Sharing */}
          <div className="border-t border-gray-200 pt-6 mt-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="text-gray-600 font-medium">Share:</span>
                <div className="flex space-x-2">
                  <button className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                    <Share2 className="w-4 h-4" />
                  </button>
                  <button className="p-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
                    <Share2 className="w-4 h-4" />
                  </button>
                  <button className="p-2 bg-blue-400 text-white rounded hover:bg-blue-500 transition-colors">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="text-sm text-gray-500">
                Last updated: 2 hours ago
              </div>
            </div>
          </div>
        </article>

        {/* Related Articles */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Related Articles</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex space-x-4">
              <img 
                src="https://images.pexels.com/photos/3938023/pexels-photo-3938023.jpeg?auto=compress&cs=tinysrgb&w=200" 
                alt="Related article" 
                className="w-20 h-20 object-cover rounded"
              />
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Experts Warn About Fake Treatments</h4>
                <p className="text-sm text-gray-600">How to identify original products in the market...</p>
              </div>
            </div>
            <div className="flex space-x-4">
              <img 
                src="https://images.pexels.com/photos/3938023/pexels-photo-3938023.jpeg?auto=compress&cs=tinysrgb&w=200" 
                alt="Related article" 
                className="w-20 h-20 object-cover rounded"
              />
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Men's Health: Myths and Truths</h4>
                <p className="text-sm text-gray-600">Discover the main misconceptions about...</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="mb-4">
            <div className="text-xl font-bold text-blue-400 mb-2">HEALTH NEWS</div>
            <p className="text-sm text-gray-300">
              Your trusted portal for health and wellness information
            </p>
          </div>
          <p className="text-xs text-gray-400">
            Copyright ©2024 | Health News - All rights reserved
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Presell;