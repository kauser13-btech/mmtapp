import ProductComponent from "../ProductComponent";

const ProductContainer = ({
  searchResults,
  displayedData,
  isLoading,
  loadMore,
  isLoadMore,
  displayedItems,
  noResults
}) => {


  return (
    <div className="flex flex-col gap-6 my-container max-md:px-0">
      <p className={`text-sub-work-card ${searchResults.length > 0 ? '' : 'invisible'}`}>{searchResults?.length} items</p>
      {isLoading && <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <ProductComponent
          products={[]}
          isLoading={isLoading}
          type="search"
          handleChangeSneaker={() => { }}
        />
      </div>}

      {!isLoading && searchResults.length > 0 && (<>
        <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <ProductComponent
            products={displayedData}
            isLoading={isLoading}
            type="search"
            handleChangeSneaker={() => { }}
          />
        </div>
        <div className="flex flex-col gap-4 items-center">
          <p className="text-sub-work-card">
            You've viewed {displayedData.length} out of {searchResults.length} products
          </p>
          <div>
            {(searchResults.length > displayedItems) && (
              <button
                onClick={loadMore}
                className="btn bg-orange-primary hover:bg-orange-primary/90 border-none text-white text-sm
           md:text-base md:font-medium xl:font-normal xl:text-[22px] xl:leading-6"
              >
                {isLoadMore ? `Loading..` : `Load More`}
              </button>
            )}
          </div>
        </div>
      </>)}

      {noResults && <h3 className="">Sorry, your search didn't yield any result!</h3>}

    </div>
  );
};

export default ProductContainer;
