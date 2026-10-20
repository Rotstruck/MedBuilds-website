import "@/App.css";
import { Toaster } from "sonner";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Overview } from "@/components/Overview";
import { Workspaces } from "@/components/Workspaces";
import { Journey } from "@/components/Journey";
import { Analytics } from "@/components/Analytics";
import { Pricing } from "@/components/Pricing";
import { Security, Why } from "@/components/WhySecurity";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

function App() {
  return (
    <div className="min-h-screen bg-[#F7FCFF] text-slate-600 antialiased overflow-x-hidden">
      <Header />
      <main>
        <Hero />
        <Overview />
        <Workspaces />
        <Journey />
        <Analytics />
        <Pricing />
        <Why />
        <Security />
        <Contact />
      </main>
      <Footer />
      <Toaster position="top-center" richColors />
    </div>
  );
}

export default App;
