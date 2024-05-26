import DataCard from "./components/DataCard";

export default function Page(): JSX.Element {
  return (
    <section className="flex justify-center bg-gradient-to-tr from-green-400 to-yellow-400 min-h-screen">
      <DataCard />
    </section>
  );
}
