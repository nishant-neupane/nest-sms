const USERS = [
  {
    name: "Jayesh Nath Rawal Muthmare",
    email: "muthmarejayesh@gmail.com",
  },
  { name: "Kushal Kafle", email: "kushalkafle@gmail.com" },
  {
    name: "Jayesh Nath Rawal Muthmare",
    email: "muthmarejayesh@gmail.com",
  },
];

export const UsersOverview = () => (
  <div className="bg-white p-5 rounded-lg sm:col-span-2">
    <div className="flex justify-between items-center mb-4">
      <h2 className="font-semibold text-lg text-black leading-[100%]">
        Users Overview
      </h2>
      <button className="font-bold text-sm text-[#4A99FF] border border-[#4A99FF] px-5 py-1 rounded-full hover:scale-[1.03] transition-all duration-300 cursor-pointer">
        + Add member
      </button>
    </div>
    <ul className="space-y-3 flex flex-col justify-center">
      {USERS.map((user, i) => (
        <li key={i} className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-b from-[#4A98FF] to-[#2375E0] rounded-full flex items-center justify-center font-semibold text-white">
            {user.name[0]}
          </div>
          <div>
            <p className="font-medium text-base leading-[100%] text-[#3283EC]">
              {user.name}
            </p>
            <p className="font-light text-xs leading-[100%] text-black/50 mt-1">
              {user.email}
            </p>
          </div>
        </li>
      ))}
    </ul>
  </div>
);
