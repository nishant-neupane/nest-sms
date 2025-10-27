import { UserRound } from "lucide-react";

const KYC_INFO = {
  name: "Jayesh Muthmare",
  registrationId: "09-898090-912312-99",
  accountManager: "Gayesh Rawal",
  contact: "9832781920",
};

export const DisclosureCard = () => (
  <div className="bg-white p-5 rounded-xl shadow-sm">
    <div className="flex items-center gap-2 mb-5">
      <div className="text-[#4A99FF]">
        <UserRound fill="#4A99FF" />
      </div>
      <h2 className="font-medium text-2xl leading-[100%] text-black">
        Disclosure
      </h2>
    </div>
    <div className="bg-[#ECF4FF] p-3 rounded-lg mb-6">
      <p className="font-light text-[15px] leading-[100%] text-[#000000] mb-1">
        Current rate:
      </p>
      <span className="font-semibold">Rs. 0.9</span>{" "}
      <span className="font-light text-[15px] leading-[100%] text-[#000000]">
        per SMS
      </span>
    </div>
    <div>
      <p className="font-bold text-xl leading-[100%] text-black my-6">
        KYC Registered Under
      </p>
      <div className="space-y-3.5">
        <div>
          <p className="font-light text-[15px] leading-[100%] text-[#000000]">
            Name
          </p>
          <p className="font-medium text-base leading-[100%] text-black mt-2">
            {KYC_INFO.name}
          </p>
        </div>
        <div>
          <p className="font-light text-[15px] leading-[100%] text-[#000000]">
            Citizenship / Company Registration ID:
          </p>
          <p className="font-medium text-base leading-[100%] text-black mt-2">
            {KYC_INFO.registrationId}
          </p>
        </div>
        <div>
          <p className="font-light text-[15px] leading-[100%] text-[#000000]">
            Account Manager:
          </p>
          <p className="font-medium text-base leading-[100%] text-black mt-2">
            {KYC_INFO.accountManager}
          </p>
        </div>
        <div>
          <p className="font-light text-[15px] leading-[100%] text-[#000000]">
            Account Manager's Contact:
          </p>
          <p className="font-medium text-base leading-[100%] text-black mt-2">
            {KYC_INFO.contact}
          </p>
        </div>
      </div>
    </div>
  </div>
);
