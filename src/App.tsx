import React, { useState } from 'react';
import { Sprout, Cloud, Upload, Users, Menu } from 'lucide-react';
import { DiseaseDetection } from './components/DiseaseDetection';
import { WeatherForecast } from './components/WeatherForecast';

function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'disease' | 'weather' | 'community'>('home');

  const renderContent = () => {
    switch (activeTab) {
      case 'disease':
        return <DiseaseDetection />;
      case 'weather':
        return <WeatherForecast />;
      case 'community':
        return (
          <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Community Forum</h2>
            <p className="text-gray-600">Coming soon...(DARKNET CODERS WORKING😁)</p>
          </div>
        );
      default:
        return (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block">IIIT MANIPUR</span>
                <span className="block text-green-600">Empowering Farmers with Smart Technology</span>
              </h1>
              <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                Access AI-powered crop disease detection, real-time weather forecasts, and connect with the farming community.
              </p>
            </div>

            <div className="mt-16 grid gap-8 md:grid-cols-3">
              <FeatureCard
                icon={<Upload className="h-8 w-8 text-green-600" />}
                title="Disease Detection"
                description="Upload photos of your crops to identify diseases and get treatment recommendations."
                onClick={() => setActiveTab('disease')}
              />
              <FeatureCard
                icon={<Cloud className="h-8 w-8 text-blue-600" />}
                title="Weather Forecast"
                description="Get accurate, localized weather forecasts to plan your farming activities."
                onClick={() => setActiveTab('weather')}
              />
              <FeatureCard
                icon={<Users className="h-8 w-8 text-purple-600" />}
                title="Community Forum"
                description="Connect with other farmers, share experiences, and get advice."
                onClick={() => setActiveTab('community')}
              />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      {/* Navigation */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center cursor-pointer" onClick={() => setActiveTab('home')}>
              <Sprout className="h-8 w-8 text-green-600" />
              <span className="ml-2 text-xl font-semibold text-gray-900">FarmAssist</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <NavLink 
                icon={<Upload />} 
                text="Disease Detection" 
                active={activeTab === 'disease'}
                onClick={() => setActiveTab('disease')}
              />
              <NavLink 
                icon={<Cloud />} 
                text="Weather" 
                active={activeTab === 'weather'}
                onClick={() => setActiveTab('weather')}
              />
              <NavLink 
                icon={<Users />} 
                text="Community" 
                active={activeTab === 'community'}
                onClick={() => setActiveTab('community')}
              />
            </div>
            <div className="md:hidden flex items-center">
              <button className="text-gray-500 hover:text-gray-700">
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto py-8 px-4">
        {renderContent()}
      </div>
    </div>
  );
}

function NavLink({ 
  icon, 
  text, 
  active = false, 
  onClick 
}: { 
  icon: React.ReactNode; 
  text: string; 
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <a 
      href="#" 
      className={`flex items-center transition-colors ${
        active 
          ? 'text-green-600' 
          : 'text-gray-700 hover:text-green-600'
      }`}
      onClick={(e) => {
        e.preventDefault();
        onClick?.();
      }}
    >
      {icon}
      <span className="ml-2">{text}</span>
    </a>
  );
}

function FeatureCard({ 
  icon, 
  title, 
  description, 
  onClick 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
  onClick?: () => void;
}) {
  return (
    <div 
      className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-50 mx-auto">
        {icon}
      </div>
      <h3 className="mt-4 text-xl font-semibold text-gray-900 text-center">{title}</h3>
      <p className="mt-2 text-gray-600 text-center">{description}</p>
      <button 
        className="mt-4 w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
        onClick={onClick}
      >
        Get Started
      </button>
    </div>
  );
}

export default App;