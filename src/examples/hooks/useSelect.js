import React, { useState, useRef, useEffect, useMemo } from "react";

export default function useSelections(list, defaultList = []) {

  const [selected, setSelected] = useState(defaultList);
  const selectedSet = useMemo(() => new Set(selected), [selected]);

  const singleActions = useMemo(() => {
    const isSelected = (item) => selectedSet.has(item);

    const select = (item) => {
      selectedSet.add(item);
      console.log(11);
      setSelected([...selectedSet])
    }
  
    const unSelect = (item) => {
      selectedSet.delete(item);
      console.log(22);
      setSelected([...selectedSet])
    }

    const toggle = (item) => {
      if (isSelected(item)) {
        unSelect(item);
      } else {
        select(item);
      }
    }

    return {
      toggle,
      isSelected,
    }
  }, [selectedSet])
  
  const allActions = useMemo(() => {
    const selectAll = () => {
      list.forEach(o => {
        selectedSet.add(o);
      })
      setSelected([...selectedSet]);
    }
  
    const unSelectAll = () => {
      list.forEach(o => {
        selectedSet.delete(o);
      })
      setSelected([...selectedSet]);
    }
  
    const allSelected = list.every(o => selectedSet.has(o));
    console.log(selectedSet);

    console.log(allSelected);
  
    const toggleAll = () => allSelected ? unSelectAll() : selectAll();
    
    return {
      allSelected,
      selectAll,
      unSelectAll,
      toggleAll
    }
  }, [list, selectedSet])
  
  


  


  console.log(33);


  return {
    selected,
    setSelected,
    ...singleActions,
    ...allActions,
  }
}

