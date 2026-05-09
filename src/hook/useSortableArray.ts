/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";

type SortOrder = "asc" | "desc";

/* ----------------------------------------
 ✅ Safe Depth-Limited KeyPaths<T>
------------------------------------------- */

// Depth-limited recursive type (3 levels deep)
type KeyPaths<T, Depth extends number = 3> = Depth extends 0
  ? never
  : T extends object
  ? {
      [K in keyof T & string]:
        | K
        | (T[K] extends object ? `${K}.${KeyPaths<T[K], Prev[Depth]>}` : never);
    }[keyof T & string]
  : never;

// Helper map for reducing depth safely
type Prev = [never, 0, 1, 2, 3];

/* ----------------------------------------
 ✅ Sort State
------------------------------------------- */

interface SortState<T> {
  key: KeyPaths<T> | null;
  order: SortOrder | null;
}

/* ----------------------------------------
 ✅ Utility: get value by path
------------------------------------------- */

function getValueByPath(obj: any, path: string): any {
  return path.split(".").reduce((acc, part) => acc?.[part], obj);
}

/* ----------------------------------------
 ✅ Hook: useSortableArray
------------------------------------------- */

export function useSortableArray<T>(initialData: T[]) {
  const [originalData, setOrginalData] = useState<T[]>([...initialData]);
  const [sortedData, setSortedData] = useState<T[]>([...initialData]);

     
  const [currentSort, setCurrentSort] = useState<SortState<T>>({
    key: null,
    order: null,
  });

  useEffect(() => {
    setOrginalData(initialData);
    setSortedData(initialData);
  }, [initialData]);

  /* ----------------------------------------
   ✅ sortBy()
  ------------------------------------------- */

  function sortBy(key: KeyPaths<T>, order: SortOrder = "asc") {
    const sorted = [...sortedData].sort((a, b) => {
      const aVal = getValueByPath(a, key);
      const bVal = getValueByPath(b, key);

      if (aVal < bVal) return order === "asc" ? -1 : 1;
      if (aVal > bVal) return order === "asc" ? 1 : -1;
      return 0;
    });

    setSortedData(sorted);
    setCurrentSort({ key, order });
  }

  /* ----------------------------------------
   ✅ searchBy()
  ------------------------------------------- */

  function searchBy(query: string, key: KeyPaths<T>) {
    if (query.trim() === "") {
      setSortedData([...originalData]);
      setCurrentSort({ key: null, order: null });
      return;
    }

    const lowerQuery = query.toLowerCase();

    const searched = originalData.filter((item) => {
      const value = getValueByPath(item, key);
      return String(value).toLowerCase().includes(lowerQuery);
    });

    setSortedData(searched);
    setCurrentSort({ key: null, order: null });
  }

  /* ----------------------------------------
   ✅ filterBy()
  ------------------------------------------- */

  function filterBy(key: KeyPaths<T>, value: any | null) {
    if (value === null) {
      setSortedData(originalData);
      return;
    }

    const filtered = originalData.filter((item) => {
      const itemValue = getValueByPath(item, key);
      return itemValue === value;
    });

    setSortedData(filtered);
    setCurrentSort({ key: null, order: null });
  }

  /* ----------------------------------------
   ✅ updateData()
  ------------------------------------------- */

  function updateData(data: T[]) {
    setOrginalData(data);
    setSortedData(data);

    if (currentSort.key && currentSort.order) {
      sortBy(currentSort.key, currentSort.order);
    }
  }

  return {
    sortedData,
    sortBy,
    searchBy,
    filterBy,
    updateData,
    currentSort,
  };
}