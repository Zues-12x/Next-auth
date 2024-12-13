import Navbar from "./_components/Navbar";

export default function layout({ children }) {
  return (
    <>
      <Navbar className="" />
      <div className="h-full w-full flex flex-col gap-y-10 items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-500 to-gray-800 ">
        {children}
      </div>
    </>
  );
}
