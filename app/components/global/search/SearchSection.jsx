import React, { useCallback, useEffect, useState, useRef } from "react";
import Input from "./Input";
import "react-loading-skeleton/dist/skeleton.css";
import ApiCall from "@/app/util/ApiCall";
import ProductContainer from "./ProductContainer";

const SearchSection = () => {
  const { performGet } = ApiCall();
  const [searchInput, setSearchInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [displayedItems, setDisplayedItems] = useState(12);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const fetchingColor = useRef(null);

  // const handleSearch = useCallback(async () => {
  //   if (searchInput.length > 3) {
  //     setIsLoading(true);
  //     setNoResults(false);
  //     try {
  //       const sanitizedSearchInput = searchInput.replace(/ /g, "%20");
  //       const response = await performGet(`api/v1/search-image?search=${sanitizedSearchInput}`);

  //       if (response.success && response.data.length > 0) {
  //         setSearchResults(response.data);
  //       } else {
  //         setNoResults(true);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //       setNoResults(true);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   } else {
  //     setIsLoading(false);
  //     setNoResults(false);
  //     setSearchResults([]);
  //   }
  // }, [performGet, searchInput]);

  // useEffect(() => {
  //     handleSearch();
  // }, [searchInput]);


  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func(...args);
        }, delay);
    };
};

// Function to call the API
const fetchResults = async (searchQuery) => {
  if (searchQuery.length > 3) {
    setIsLoading(true);
    setNoResults(false);
    fetchingColor.current=searchQuery;
    setSearchResults([]);
    try {
      const sanitizedSearchInput = searchQuery.replace(/ /g, "%20");
      const response = await performGet(`api/v1/search-image?search=${sanitizedSearchInput}`);

      if (response.success && response.data.length > 0) {
        if(fetchingColor.current==searchQuery)
        setSearchResults(response.data);
      } else {
        setNoResults(true);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setNoResults(true);
    } finally {
      setIsLoading(false);
    }
  } else {
    setIsLoading(false);
    setNoResults(false);
    setSearchResults([]);
  }
};

// Debounced version of the fetchResults function
const debouncedFetchResultsRef = useRef(debounce((searchQuery) => fetchResults(searchQuery), 700));

const handleInputChange = (value) => {
    setSearchInput(value);
    debouncedFetchResultsRef.current(value);
};

  const loadMore = useCallback(() => {
    setIsLoadMore(true);
    setDisplayedItems((prevItem) => {
      const newItemsCount = 12;
      return prevItem + newItemsCount;
    });
    setIsLoadMore(false);
  }, []);

  const displayedData = searchResults.slice(0, displayedItems);

  return (
    <div className="flex flex-col gap-0 mt-6 px-6">
      <div className="w-full bg-white sticky top-0 z-[3] pb-5">
        <div className="flex flex-col items-center gap-6 w-full md:w-[34rem] xl:w-[64rem] md:mx-auto pt-4">
          <h3 className="font-staatliches text-xl text-title-work-card tracking-[0.032px] md:text-[26px] xl:text-4xl md:leading-6 md:tracking-[0.042px]">
            Find Your Product
          </h3>
          <Input searchInput={searchInput} handleInputChange={handleInputChange} />
        </div>
      </div>
      <ProductContainer
        searchResults={searchResults}
        displayedData={displayedData}
        isLoading={isLoading}
        loadMore={loadMore}
        isLoadMore={isLoadMore}
        displayedItems={displayedItems}
        noResults={noResults}
      />
    </div>
  );
};

export default SearchSection;
