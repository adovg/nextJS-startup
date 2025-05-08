import SearchForm from "../Components/SearchForm";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;
  return (
    <>
      <section className="pink-container bg-primary">
        <h1 className="heading">
          Pitch your startup, <br />
          connect with entrepreneurs{" "}
        </h1>
        <p className="sub-heading">
          Submit ideas, vote on pitches and get noticed in virtual competitions.
        </p>
        <SearchForm query={query} />
      </section>
    </>
  );
}
