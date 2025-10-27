export const PromoCard = () => (
  <div className="bg-gradient-to-br from-[#1A72E4] to-[#004BAC] text-center text-white rounded-lg p-7 relative overflow-hidden">
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
  </div>
);
