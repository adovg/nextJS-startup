import Form from "next/form";
import SearchFormReset from "./SearchFormReset";
import { Search } from "lucide-react";

export default function Page({ query }: { query?: string }) {
  return (
    <Form action="/" scroll={false} className="search-form">
      {/* On submission, the input value will be appended to
          the URL, e.g. /search?query=abc */}
      <input
        name="query"
        className="search-input"
        defaultValue=""
        placeholder="Search Startups"
      />
      <div className="flex gap-2">{query && <SearchFormReset />}</div>
      <button type="submit" className="search-btn text-white">
        <Search className="size-5" />
      </button>
    </Form>
  );
}
