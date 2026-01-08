
import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";

interface BusinessFormProps {
  onSuccess: (name: string) => void;
}

const BusinessForm: React.FC<BusinessFormProps> = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    businessName: '',
    category: '',
    description: '',
    establishedDate: '',
    address: '',
    city: '',
    phone: '',
    instagram: '',
    facebook: '',
    linkedin: '',
    website: '',
    operatingHours: '',
    serviceArea: '',
    zipFile: '',
    zipFileName: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [aiTip, setAiTip] = useState<string | null>(null);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.businessName) newErrors.businessName = "Nama bisnis wajib diisi";
    if (formData.description.length > 750) newErrors.description = "Deskripsi maksimal 750 karakter";
    if (!formData.phone) {
      newErrors.phone = "Nomor telepon wajib diisi";
    } else if (!/^\+?[0-9]{10,15}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = "Format telepon tidak valid";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== 'application/zip' && !file.name.endsWith('.zip')) {
        setErrors(prev => ({ ...prev, zipFile: "Hanya file ZIP ya!" }));
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64String = event.target?.result as string;
        setFormData(prev => ({ ...prev, zipFile: base64String, zipFileName: file.name }));
        setErrors(prev => {
          const next = { ...prev };
          delete next.zipFile;
          return next;
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEnhanceDescription = async () => {
    if (!formData.businessName) {
      alert("Kasih tau nama bisnisnya dulu dong biar AI makin pinter!");
      return;
    }
    setIsEnhancing(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Tuliskan deskripsi bisnis yang menarik, ceria, profesional, dan SEO-friendly untuk Google Business Profile.
      Nama Bisnis: ${formData.businessName}
      Kategori: ${formData.category}
      Informasi tambahan: ${formData.description || "Tolong buatkan dari awal"}
      Bahasa: Indonesia
      Maksimal: 750 karakter.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          systemInstruction: "Anda adalah copywriter kreatif yang suka gaya Playful Geometric.",
          maxOutputTokens: 300,
        }
      });

      const enhancedText = response.text || "";
      setFormData(prev => ({ ...prev, description: enhancedText.slice(0, 750) }));
      setAiTip("✨ Boom! Deskripsi makin keren.");
      setTimeout(() => setAiTip(null), 3000);
    } catch (error) {
      alert("Waduh, AI lagi istirahat. Coba lagi ya!");
    } finally {
      setIsEnhancing(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyN3u6HXIZ2sK0iR2UiHBdTlrx1EVV3AsRm9Te1F9eOIkdfsUsaewpO3R25tG3TBOg/exec";
      await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      onSuccess(formData.businessName);
    } catch (error) {
      alert("Error saat ngirim! Coba cek internet kamu.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-8 space-y-8 bg-[#ffffff]">
      {/* Section 01 */}
      <div className="space-y-6">
        <h3 className="text-2xl font-black flex items-center gap-2">
          <span className="bg-[#00E5FF] p-2 neo-brutalism leading-none">01</span>
          DASAR BISNIS
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <span className="label-pill w-fit">Nama Bisnis *</span>
            <input 
              name="businessName"
              value={formData.businessName}
              onChange={handleChange}
              className={`neo-input ${errors.businessName ? 'bg-red-50 border-red-500' : ''}`}
              placeholder="Misal: Kopi Santai Abis"
            />
            {errors.businessName && <span className="text-sm font-bold text-pink-600 mt-1">{errors.businessName}</span>}
          </div>

          <div className="flex flex-col">
            <span className="label-pill w-fit">Kategori</span>
            <input 
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="neo-input"
              placeholder="Kafe / Bengkel / Kursus"
            />
          </div>
        </div>

        <div className="flex flex-col bg-gray-50 p-4 neo-brutalism relative">
          <div className="flex justify-between items-center mb-2">
            <span className="label-pill w-fit">Deskripsi Seru</span>
            <button 
              type="button"
              onClick={handleEnhanceDescription}
              disabled={isEnhancing}
              className={`bg-[#FF007F] text-white font-bold py-1 px-4 neo-brutalism text-sm flex items-center gap-2 transition-all duration-100 ${isEnhancing ? 'translate-x-[4px] translate-y-[4px] [box-shadow:0px_0px_0px_#000] opacity-90' : ''}`}
            >
              {isEnhancing ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Mikir Dulu...
                </>
              ) : (
                <>✨ Pakai AI MAGIC</>
              )}
            </button>
          </div>
          <textarea 
            name="description"
            rows={4}
            value={formData.description}
            onChange={handleChange}
            className={`neo-input resize-none ${errors.description ? 'border-red-500' : ''}`}
            placeholder="Jelaskan kenapa bisnis kamu juara..."
          ></textarea>
          <div className="flex justify-between mt-2 font-bold italic text-sm">
            <span className="text-pink-600">{aiTip}</span>
            <span className={formData.description.length > 750 ? 'text-red-600' : 'text-black'}>
              {formData.description.length} / 750
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <span className="label-pill w-fit">Sejak Kapan?</span>
            <input 
              type="date"
              name="establishedDate"
              value={formData.establishedDate}
              onChange={handleChange}
              className="neo-input"
            />
          </div>
          <div className="flex flex-col">
            <span className="label-pill w-fit">Nomor HP *</span>
            <input 
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`neo-input ${errors.phone ? 'border-red-500' : ''}`}
              placeholder="08xxxxxxxxxx"
            />
            {errors.phone && <span className="text-sm font-bold text-pink-600 mt-1">{errors.phone}</span>}
          </div>
        </div>
      </div>

      {/* Section 02 */}
      <div className="space-y-6">
        <h3 className="text-2xl font-black flex items-center gap-2">
          <span className="bg-[#FF8C00] p-2 neo-brutalism leading-none">02</span>
          LOKASI & WAKTU
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <span className="label-pill w-fit">Alamat</span>
            <input name="address" value={formData.address} onChange={handleChange} className="neo-input" placeholder="Jl. Anggrek No. 12" />
          </div>
          <div className="flex flex-col">
            <span className="label-pill w-fit">Kota</span>
            <input name="city" value={formData.city} onChange={handleChange} className="neo-input" placeholder="Bandung" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <span className="label-pill w-fit">Jam Operasional</span>
            <input name="operatingHours" value={formData.operatingHours} onChange={handleChange} className="neo-input" placeholder="Sen-Jum: 08:00 - 17:00" />
          </div>
          <div className="flex flex-col">
            <span className="label-pill w-fit">Area Layanan</span>
            <input name="serviceArea" value={formData.serviceArea} onChange={handleChange} className="neo-input" placeholder="Jabodetabek" />
          </div>
        </div>
        <div className="flex flex-col">
          <span className="label-pill w-fit">Website</span>
          <input 
            name="website" 
            value={formData.website} 
            onChange={handleChange} 
            className="neo-input" 
            placeholder="https://bisniskamu.com" 
          />
        </div>
      </div>

      {/* Section 03 - Media Sosial */}
      <div className="space-y-6">
        <h3 className="text-2xl font-black flex items-center gap-2">
          <span className="bg-[#FF007F] p-2 neo-brutalism leading-none text-white">03</span>
          MEDIA SOSIAL
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col">
            <span className="label-pill w-fit">Instagram</span>
            <input name="instagram" value={formData.instagram} onChange={handleChange} className="neo-input" placeholder="@bisniskamu" />
          </div>
          <div className="flex flex-col">
            <span className="label-pill w-fit">Facebook</span>
            <input name="facebook" value={formData.facebook} onChange={handleChange} className="neo-input" placeholder="facebook.com/bisniskamu" />
          </div>
          <div className="flex flex-col">
            <span className="label-pill w-fit">LinkedIn</span>
            <input name="linkedin" value={formData.linkedin} onChange={handleChange} className="neo-input" placeholder="linkedin.com/company/bisnis" />
          </div>
        </div>
      </div>

      {/* Section 04 */}
      <div className="space-y-6">
        <h3 className="text-2xl font-black flex items-center gap-2">
          <span className="bg-[#8F00FF] p-2 neo-brutalism leading-none text-white">04</span>
          FILE & MEDIA
        </h3>
        <div className="flex flex-col bg-[#00E5FF] p-6 neo-brutalism">
          <span className="label-pill w-fit bg-black text-white">Zip Foto Bisnis (Penting!)</span>
          <div className="mt-4 relative bg-white border-4 border-black p-8 text-center cursor-pointer hover:bg-gray-100 transition-colors">
            <input type="file" accept=".zip" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
            <div className="flex flex-col items-center">
              <span className="text-5xl mb-2">📁</span>
              <p className="font-bold text-lg">
                {formData.zipFileName ? formData.zipFileName : "KLIK UNTUK UPLOAD ZIP"}
              </p>
            </div>
          </div>
          {errors.zipFile && <span className="text-sm font-bold text-white bg-red-600 px-2 py-1 mt-2 w-fit">{errors.zipFile}</span>}
        </div>
      </div>

      <div className="pt-8">
        <button 
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#FFD700] hover:bg-[#ffe44d] text-black text-2xl font-black py-6 px-8 neo-brutalism uppercase tracking-widest disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "🚀 Sedang Meluncur..." : "GAS! KIRIM SEKARANG"}
        </button>
      </div>
    </form>
  );
};

export default BusinessForm;
