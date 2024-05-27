import DataCard from "./components/DataCard";
import Hero from "./components/Hero";

export default function Page(): JSX.Element {
  return (
    <section className="flex flex-col justify-center min-h-screen">
      <Hero/>
      <DataCard />
    </section>
  );
}
