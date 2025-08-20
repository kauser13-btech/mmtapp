import { useUserName } from "@/app/context/UserNameContext";
import useGetClosetData from "@/app/hooks/closets/useGetClosetData";
import usePostCloseData from "@/app/hooks/closets/usePostCloseData";
import useSneakersSearch from "@/app/hooks/sneakerSearch/useSneakerSearch";
import { useEffect, useRef } from "react";
import SearchUtil from "../global/searchSneakerModal/SearchUtil";

const Search = ({ type, handleChangeSneaker, isOpen, toggle }) => {
  const { getUser } = useUserName();
  const bottom = useRef(null);
  const {
    searchParams,
    setSearchParams,
    searchResults,
    fetchResults,
    page,
    hasMoreData,
    isLoading,
    fetchData,
  } = useSneakersSearch();

  const handleChange = (e) => {
    setSearchParams(e.target.value);
  };

  useEffect(() => {
    const handleInfiniteScroll = async (entries) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        await fetchData();
      }
    };

    const observer = new IntersectionObserver(handleInfiniteScroll, {
      root: null,
      rootMargin: "0px",
      threshold: 1,
    });

    if (bottom.current) {
      observer.observe(bottom.current);
    }

    return () => {
      if (bottom.current) {
        observer.unobserve(bottom.current);
      }
    };
  }, [isOpen, page, searchParams]);

  const { handleAddToCloset, showSignInModal, handleSignInModal } =
    usePostCloseData();
  const { getClosetData, data, error } = useGetClosetData();

  const handlePostCloset = async (id) => {
    toggle(false);
    getUser ? '' : document.getElementById("sign-in-modal-in-search").showModal();
    await handleAddToCloset(type,id);
    getClosetData();
  };

  return (
    <>
      <div className="flex w-full md:justify-between gap-x-5">
        <SearchUtil
          toggle={toggle}
          handleChange={handleChange}
          searchParams={searchParams}
          searchResults={searchResults}
          fetchResults={fetchResults}
          bottom={bottom}
          hasMoreData={hasMoreData}
          handlePostCloset={handlePostCloset}
          handleChangeSneaker={handleChangeSneaker}
          isOpen={isOpen}
          isLoading={isLoading}
          type={type}
        />
      </div>
    </>
  );
};

export default Search;
