import { useMemo, useState } from "react";

const useFilterHandler = (devotees) => {
  const [search, setSearch] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const [dateFilter, setDateFilter] = useState([]);
  const [isCheckingConsistent, setIsCheckingConsistent] = useState(false);
  const [pageFilter, setPageFilter] = useState();

  const filteredDevotees = useMemo(() => {
    let filtered =
      pageFilter === "new" || !pageFilter
        ? devotees
        : devotees.filter((d) => d.status === pageFilter);

    if (search) {
      filtered = filtered.filter(
        (d) =>
          d.fullName.toLowerCase().includes(search.toLowerCase()) ||
          d.phone.toString().includes(search),
      );
    }

    if (genderFilter) {
      filtered = filtered.filter((d) => d.gender === genderFilter);
    }

    if (dateFilter.length) {
      const dateFilterIso = dateFilter.map((el) =>
        new Date(el).toLocaleDateString(),
      );

      if (isCheckingConsistent) {
        const recordsByPhone = filtered.reduce((acc, record) => {
          const phone = record.phone;
          if (!acc[phone]) acc[phone] = [];
          acc[phone].push(record);
          return acc;
        }, {});

        filtered = Object.values(recordsByPhone)
          .filter((records) =>
            dateFilterIso.every((date) =>
              records.some(
                (record) => new Date(record.date).toLocaleDateString() === date,
              ),
            ),
          )
          .flat();
      } else {
        filtered = filtered.filter((devotee) => {
          const devoteeDate = new Date(devotee.date).toLocaleDateString();
          return dateFilterIso.includes(devoteeDate);
        });
      }
    }

    return filtered;
  }, [search, genderFilter, dateFilter, devotees, pageFilter]);

  return {
    setPageFilter,
    filteredDevotees,
    setSearch,
    search,
    genderFilter,
    dateFilter,
    setGenderFilter,
    setDateFilter,
    isCheckingConsistent,
    setIsCheckingConsistent,
  };
};

export default useFilterHandler;
