import Image from "next/image";

export default function ProfilePage() {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-8">
        Profile Information
      </h2>

      <div className="flex items-center gap-6 mb-10">
        <Image
          src="/images/profile.jpg"
          alt="Profile photo"
          width={100}
          height={100}
          className="rounded-full object-cover"
        />
        <div>
          <h3 className="text-xl font-semibold">Aizen Rawal</h3>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 text-sm">
        <div>
          <h4 className="font-medium text-[#1F1F1f] mb-2">Personal Details</h4>
          <div className="grid grid-cols-2 gap-4">
            <input
              className="border border-gray-300 rounded-md p-2 w-full"
              value="Aizen"
              readOnly
            />
            <input
              className="border border-gray-300 rounded-md p-2 w-full"
              value="Rawal"
              readOnly
            />
            <input
              className="border border-gray-300 rounded-md p-2 w-full"
              value="aizenisgod67@gmail.com"
              readOnly
            />
            <input
              className="border border-gray-300 rounded-md p-2 w-full"
              value="+977 9767451234"
              readOnly
            />
            <input
              className="border border-gray-300 rounded-md p-2 w-full"
              value="Organization"
              readOnly
            />
            <input
              className="border border-gray-300 rounded-md p-2 w-full"
              value="629-000-1444-333-1458"
              readOnly
            />
          </div>
        </div>

        <div>
          <h4 className="font-medium text-gray-700 mb-2">Address</h4>
          <div className="flex items-center gap-2 border border-gray-300 rounded-md p-2 w-full">
            <Image
              src="/images/flags/nepal.png"
              width={24}
              height={16}
              alt="Nepal Flag"
            />
            <input className="w-full outline-none" value="Nepal" readOnly />
          </div>
        </div>
      </div>
    </div>
  );
}
