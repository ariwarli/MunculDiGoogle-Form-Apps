
import React from 'react';

interface SuccessScreenProps {
  businessName: string;
  onReset: () => void;
}

const SuccessScreen: React.FC<SuccessScreenProps> = ({ businessName, onReset }) => {
  return (
    <div className="bg-white neo-brutalism p-16 text-center flex flex-col items-center relative overflow-hidden">
      {/* Fun decorations */}
      <div className="absolute top-0 left-0 w-12 h-12 bg-pink-500 -translate-x-1/2 -translate-y-1/2 rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-16 h-16 bg-cyan-400 translate-x-1/2 translate-y-1/2 rotate-45"></div>

      <div className="w-32 h-32 bg-[#FFD700] neo-brutalism flex items-center justify-center mb-8 rotate-3 hover:rotate-0 transition-transform">
        <span className="text-6xl">🎉</span>
      </div>
      
      <h2 className="text-5xl font-black text-black mb-6 uppercase tracking-tighter">YESS! BERHASIL!</h2>
      
      <div className="bg-black text-white p-6 neo-brutalism rotate-[-1deg] mb-10 max-w-lg">
        <p className="text-xl font-bold">
          Bisnis <span className="text-[#00E5FF] underline decoration-4 underline-offset-4 italic">"{businessName}"</span> sudah masuk antrian Google!
        </p>
      </div>
      
      <p className="text-gray-700 font-bold mb-10 max-w-md text-lg">
        Tim kami akan segera memproses data kamu. Siap-siap kebanjiran orderan ya! 🚀
      </p>

      <div className="space-y-6 w-full max-w-sm">
        <button 
          onClick={onReset}
          className="w-full bg-[#00E5FF] text-black text-xl font-black py-4 px-8 neo-brutalism hover:bg-cyan-300 transition-all uppercase"
        >
          Isi Form Lagi?
        </button>
        <p className="text-sm font-black italic opacity-60">
          #BisnisGoDigital #GoogleBusiness
        </p>
      </div>
    </div>
  );
};

export default SuccessScreen;
