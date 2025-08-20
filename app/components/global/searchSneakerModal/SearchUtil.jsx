import useOutsideClick from "@/app/hooks/useOutsideClick";
import SearchResult from "./SearchResult";
import SneakerSearch from "./SneakerSearch";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import ApiCall from "@/app/util/ApiCall";

const SearchUtil = ({
  toggle,
  handlePostCloset,
  handleChangeSneaker,
  isOpen,
  type,
}) => {
  const pathname = usePathname();
  const sneakersModalRef = useRef(null);
  useOutsideClick(sneakersModalRef, () => {
    toggle(false);
  });

  const { performGet } = ApiCall();

  const [data, setData] = useState([]);
  const [noDataError, setNoDataError] = useState(false);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef(null);
  const [searchParams, setSearchParams] = useState("");

  const handleChange = (e) => {
    setSearchParams(e.target.value);
    if (e.target.value.length > 0) {
      setPage(1);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const response = await performGet(
          `api/v1/search-sneakers?searchKey=${searchParams}&page=${page}&perPage=50`
        );
        if (response.success) {
          if (response.data.length > 0) {
            if (page === 1) {
              setData(response.data);
            } else {
              if (page < response.pagination.last_page) {
                setData((prevData) => [...prevData, ...response.data]);
              }
            }
          } else {
            setData([]);
            setNoDataError(true);
          }
        }
      } catch (err) {
        console.log(err);
      }

      setLoading(false);
    };

    if (isOpen) {
      fetchData();

      if (containerRef.current) {
        containerRef.current.addEventListener("scroll", handleScroll);
      }
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, [isOpen, page, searchParams]);

  const handleScroll = () => {
    const container = containerRef.current;

    if (
      container.scrollTop + container.clientHeight !==
      container.scrollHeight
    ) {
      return;
    }
    console.log(page);
    setPage((prevData) => prevData + 1);
  };

  return (
    <>
      <div
        ref={sneakersModalRef}
        className={`relative w-full ${isOpen && type == "home" && "z-[49]"}`}
      >
        <SneakerSearch
          handleOnClick={toggle}
          handleChange={handleChange}
          type={type}
          isOpen={isOpen}
        />

        {isOpen && (
          <div
            className={`absolute bg-white top-[110%] z-[48] shadow-md inset-x-0 `}
          >
            <SearchResult
              sneakers={data}
              containerRef={containerRef}
              isLoading={loading}
              keyword={searchParams}
              handlePostCloset={handlePostCloset}
              handleChangeSneaker={handleChangeSneaker}
              type={type}
            />
          </div>
        )}
      </div>
      {isOpen && type == "home" && (
        <div
          onClick={() => toggle(false)}
          className="fixed z-[48] bg-white/90 inset-0 blur-3xl"
        ></div>
      )}
    </>
  );
};

export default SearchUtil;
