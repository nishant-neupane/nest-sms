// components/PromoCard.jsx
import { useState } from "react";
import { PromoCodeModal } from "./modals/PromoCodeModal";

export const PromoCard = () => {
  const [isPromoModalOpen, setIsPromoModalOpen] = useState(false);

  const handleApplyPromo = (promoCode) => {
    console.log("Applying promo code:", promoCode);
    alert(`Promo code "${promoCode}" applied successfully!`);
  };

  return (
    <>
      <div 
        onClick={() => setIsPromoModalOpen(true)}
        className="bg-gradient-to-br from-[#1A72E4] to-[#004BAC] text-center text-white rounded-lg p-7 relative overflow-hidden border border-blue-300 cursor-pointer hover:scale-[1.02] transition-transform duration-300"
      >
        <div className="absolute -right-4 bottom-0">
          <div className="w-[95px] h-[153px] bg-white/10 rounded-full blur-xl"></div>
        </div>
        <p className="font-bold text-lg leading-[100%] text-white">Promo Code</p>
        <p className="font-[900] text-4xl leading-[100%] text-white my-3">
          17% OFF
        </p>
        <p className="font-medium text-xs leading-[130%] text-white max-w-[200px] mx-auto">
          Unlock exclusive savings with our special promo code! Don't miss out on
          this limited-time offer!
        </p>
        <div className="mt-4 text-xs opacity-80">
          Click to apply promo code
        </div>
      </div>

      <PromoCodeModal
        isOpen={isPromoModalOpen}
        onClose={() => setIsPromoModalOpen(false)}
        onApplyPromo={handleApplyPromo}
      />
    </>
  );
};