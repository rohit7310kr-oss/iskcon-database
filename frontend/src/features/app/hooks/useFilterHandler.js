import React from "react";
import { useMemo } from "react";
import { useState } from "react";

const useFilterHandler = (devotees) => {
  const [search, setSearch] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  const filteredDevotees = useMemo(() => {
    let filtered = devotees;
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
    if (dateFilter) {
      filtered = filtered.filter((devotee) => {
        let devoteeDate;
        devotee.date.forEach((d) => {
          devoteeDate = new Date(d).toISOString().split("T")[0];
        });

        // const devoteeDate = new Date(d.date).toISOString().split("T")[0];
        return devoteeDate === dateFilter;
      });
    }
    return filtered;
  }, [search, genderFilter, dateFilter, devotees]);

  return {
    filteredDevotees,
    setSearch,
    search,
    genderFilter,
    dateFilter,
    setGenderFilter,
    setDateFilter,
  };
};

export default useFilterHandler;
