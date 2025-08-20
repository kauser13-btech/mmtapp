"use client";
import TopNavigation from "@/app/components/user/global/TopNavigation";
import PersonalDetail from "@/app/components/user/personal_information/PersonalDetail";

const pagePersonalInformation = () => {
  // const { performGet } = ApiTokenBased();
  // const [data, setData] = useState({});
  // const [isLoading, setIsLoading] = useState(true);
  // const [error, setError] = useState({});
  // const [imgurl, setImgurl] = useState();

  // useEffect(() => {
  //   const fetchDataFromApi = async () => {
  //     setIsLoading(true);
  //     const { response, error } = await performGet("api/v1/profile");
  
  //     if (response) {
  //       setData(response.data);
  //       setIsLoading(false);
  
  //       if (response.data.image_url === null) {
  //         setImgurl('/images/avatar.svg');
  //       } else {
  //         setImgurl(response.data.image_url);
  //       }
  //     } else {
  //       setError(response.message);
  //     }
  //   };
  
  //   fetchDataFromApi();
  // }, []);
  
  return (
    <div className="h-screen bg-[#f8f8f8] overflow-y-auto">
      <header>
        <TopNavigation title={"Personal Information"} />
      </header>

      <div className="pt-[40px] bg-[#f8f8f8] ">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 mx-auto my-container p-4 ">
          <PersonalDetail/>
          {/* <SecurityDetail /> */}
        </div>
      </div>
    </div>
  );
};

export default pagePersonalInformation;
