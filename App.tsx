
import React, { useState } from 'react';
import BusinessForm from './components/BusinessForm';
import SuccessScreen from './components/SuccessScreen';

const App: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [businessName, setBusinessName] = useState("");

  const handleSuccess = (name: string) => {
    setBusinessName(name);
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setBusinessName("");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-12 relative overflow-hidden">
      {/* Whimsical Background Elements */}
      <div className="absolute top-[10%] right-[15%] text-6xl opacity-20 pointer-events-none">✨</div>
      <div className="absolute bottom-[20%] left-[10%] text-4xl opacity-20 pointer-events-none">🚀</div>
      <div className="absolute top-[40%] left-[5%] text-5xl opacity-20 pointer-events-none">🎨</div>

      <div className="w-full max-w-[800px] z-10">
        {submitted ? (
          <SuccessScreen businessName={businessName} onReset={handleReset} />
        ) : (
          <div className="bg-white neo-brutalism overflow-hidden">
            <header className="bg-[#FFD700] border-b-4 border-black p-8 text-black text-center relative">
              <div className="absolute top-2 left-2 text-2xl">⭕</div>
              <div className="absolute bottom-2 right-2 text-2xl rotate-45">🔺</div>
              <h1 className="text-4xl font-black tracking-tight mb-2 uppercase">MunculDiGoogle</h1>
              <p className="font-semibold text-lg bg-black text-white inline-block px-3 py-1">
                Ayo Bikin Bisnis Kamu Terkenal! ⚡
              </p>
            </header>
            <div className="p-2 bg-black"></div> {/* Decorative divider stripe */}
            <BusinessForm onSuccess={handleSuccess} />
          </div>
        )}
        
        <footer className="mt-12 text-center space-y-4">
          <p className="font-bold text-black text-sm md:text-lg bg-white inline-block px-4 py-2 neo-brutalism">
            &copy; {new Date().getFullYear()} Bani Risset • Teras Digital Tech • 
            <a href="https://banirisset.com" target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:underline mx-1">banirisset.com</a> • 
            <a href="https://terasdigital.co.id" target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:underline mx-1">terasdigital.co.id</a>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default App;
