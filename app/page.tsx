import HomeClient from "./home-client";

export default function Home() {
  return (
    <div className="relative flex-1 bg-black min-h-screen">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50"
        style={{ backgroundImage: `url('/logo.png')` }}
      ></div>
      <div className="relative z-10">
        <HomeClient />
      </div>
    </div>
  );
}
