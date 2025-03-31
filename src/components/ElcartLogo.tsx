
import React from "react";

const ElcartLogo: React.FC = () => {
  return (
    <div className="flex flex-col items-center mb-6">
      <div className="relative h-16 w-24 mb-1">
        {/* Mountains shape */}
        <div className="absolute left-0 bottom-0 w-0 h-0 border-l-[40px] border-l-transparent border-b-[32px] border-b-elcart-blue" />
        <div className="absolute left-[24px] bottom-0 w-0 h-0 border-l-[16px] border-l-transparent border-b-[40px] border-b-elcart-blue" />
        <div className="absolute left-[40px] bottom-0 w-0 h-0 border-l-[16px] border-l-transparent border-b-[24px] border-b-elcart-lightBlue" />
      </div>
      <div className="text-elcart-blue text-3xl font-bold">элкарт</div>
    </div>
  );
};

export default ElcartLogo;
