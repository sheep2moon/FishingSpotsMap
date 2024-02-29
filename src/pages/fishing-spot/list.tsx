import React, { useEffect, useState } from "react";
import SortingMenu from "../../components/sorting-menu";
import SpotsGrid, {
  type FisherySortingOption,
} from "../../components/fishing-spot-list/spots-grid";
import { Input } from "../../components/ui/input";
import useDebounce from "../../hooks/useDebounce";
import { IconSearch } from "@tabler/icons-react";
import { useRouter } from "next/router";

const sortingOptions: FisherySortingOption[] = [
  {
    key: "latest",
    name: "Od najnowszych",
  },
  {
    key: "oldest",
    name: "Od najstarszych",
  },
];

const SpotList = () => {
  const [orderBy, setOrderBy] = useState<FisherySortingOption>(
    sortingOptions.find(
      (option) => option.key === "latest"
    ) as FisherySortingOption
  );
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const { debouncedValue: deboncedSearchQuery, setInstantValue } =
    useDebounce<string>(searchQuery, 600);

  // Query url value from redirecting
  useEffect(() => {
    const query = router.query.search as string;
    if (query && query !== searchQuery) {
      setInstantValue(query);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query]);

  useEffect(() => {
    console.log("Search query changed: ", searchQuery);
  }, [searchQuery]);

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value;
    setSearchQuery(search);
    void router.push(
      {
        pathname: router.pathname,
        query: { ...router.query, search },
      },
      undefined,
      { shallow: true }
    );
  };

  return (
    <div className="mx-auto mt-16 w-full max-w-[1300px]">
      <div className="flex items-center justify-between gap-2 p-2">
        <Input
          icon={<IconSearch className="aspect-square w-6 text-primary-600" />}
          type="search"
          placeholder="Szukaj łowiska..."
          value={searchQuery}
          className="sm:min-w-[300px]"
          onChange={handleQueryChange}
        />
        <SortingMenu
          options={sortingOptions}
          activeOption={orderBy}
          setActiveOption={setOrderBy}
        />
      </div>
      <SpotsGrid searchQuery={deboncedSearchQuery} orderBy={orderBy} />
    </div>
  );
};

export default SpotList;
