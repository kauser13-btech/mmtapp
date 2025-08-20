import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const SizeGuideModal = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState("product-measurements");
  const searchParams = useSearchParams();
  const [productMesSubTab, setProductMesSubTab] = useState("inches");
  // const [measureYourselfSubTab, setMeasureYourselfSubTab] = useState("inches");

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const handleBackdropClick = (e) => {
    if (e.target.id === "size_guide_backdrop") {
      onClose();
    }
  };

  if (!isOpen) return null;
  const imageUri ={
    't-shirt':{
      productMeasurements: "/images/product/size1.png",
      measureYourself: "/images/product/size2.png"
    },
    'hoodie':{
      productMeasurements: "/images/product/size3.png",
      measureYourself: "/images/product/size4.png"
    }
  }
  const columns = [
    {
      title: "Size Label",
      key: "sizeLabel"
    },
    {
      title: "Length",
      key: "length"
    },
    {
      title: "Width",
      key: "width"
    }
  ]



  const columnsForMYHoodie = [
    {
      title: "Size Label",
      key: "sizeLabel"
    },
    {
      title: "Length",
      key: "length"
    },
    {
      title: "Chest",
      key: "chest"
    },
    {
      title: "Sleeve Length",
      key: "sleeveLength"
    }
  ]

  const columnsForMYTShirt = [
    {
      title: "Size Label",
      key: "sizeLabel"
    },
    {
      title: "Length",
      key: "length"
    },
    {
      title: "Chest",
      key: "chest"
    }
  ]

  const tShirtSizeGuideDataInchesForPM = [
    {
      sizeLabel: "XS",
      length: 27,
      width: "16 ½"
    },
    {
      sizeLabel: "S",
      length: 28,
      width: 18
    },
    {
      sizeLabel: "M",
      length: 29,
      width: 20
    },
    {
      sizeLabel: "L",
      length: 30,
      width: 22
    },
    {
      sizeLabel: "XL",
      length: 31,
      width: 24
    },
    {
      sizeLabel: "2XL",
      length: 32,
      width: 26
    },
    {
      sizeLabel: "3XL",
      length: 33,
      width: 28
    },
    {
      sizeLabel: "4XL",
      length: 34,
      width: 30
    },
    {
      sizeLabel: "5XL",
      length: 35,
      width: 32
    }
  ]
  const tShirtSizeGuideDataCentimetersForPM = [
    {
      sizeLabel: "XS",
      length: 68.6,
      width: 42
    },
    {
      sizeLabel: "S",
      length: 71,
      width: 45.7
    },
    {
      sizeLabel: "M",
      length: 73.7,
      width: 50.8
    },
    {
      sizeLabel: "L",
      length: 76.2,
      width: 56
    },
    {
      sizeLabel: "XL",
      length: 78.7,
      width: 61
    },
    {
      sizeLabel: "2XL",
      length: 81.3,
      width: 66
    },
    {
      sizeLabel: "3XL",
      length: 83.8,
      width: 71
    },
    {
      sizeLabel: "4XL",
      length: 86.4,
      width: 76.2
    },
    {
      sizeLabel: "5XL",
      length: 89,
      width: 81.3
    }
  ]
  const tShirtSizeGuideDataInchesForMY = [
    {
      sizeLabel: "XS",
      length: 27,
      chest: "31 - 34"
    },
    {
      sizeLabel: "S",
      length: 28,
      chest: "35 - 37"
    },
    {
      sizeLabel: "M",
      length: 29,
      chest: "38 - 41"
    },
    {
      sizeLabel: "L",
      length: 30,
      chest: "42 - 45"
    },
    {
      sizeLabel: "XL",
      length: 31,
      chest: "46 - 49"
    },
    {
      sizeLabel: "2XL",
      length: 32,
      chest: "50 - 53"
    },
    {
      sizeLabel: "3XL",
      length: 33,
      chest: "54 - 57"
    },
    {
      sizeLabel: "4XL",
      length: 34,
      chest: "58 - 61"
    },
    {
      sizeLabel: "5XL",
      length: 35,
      chest: "62 - 65"
    }
  ]
  const tShirtSizeGuideDataCentimetersForMY = [
  {
    sizeLabel: "XS",
    length: 68.6,
    chest: "78.7 - 86.4"
  },
  {
    sizeLabel: "S",
    length: 71,
    chest: "88.9 - 94"
  },
  {
    sizeLabel: "M",
    length: 73.7,
    chest: "96.5 - 104"
  },
  {
    sizeLabel: "L",
    length: 76.2,
    chest: "106.7 - 114.3"
  },
  {
    sizeLabel: "XL",
    length: 78.7,
    chest: "116.8 - 124.5"
  },
  {
    sizeLabel: "2XL",
    length: 81.3,
    chest: "127 - 134.6"
  },
  {
    sizeLabel: "3XL",
    length: 83.8,
    chest: "137.2 - 144.8"
  },
  {
    sizeLabel: "4XL",
    length: 86.4,
    chest: "147.3 - 155"
  },
  {
    sizeLabel: "5XL",
    length: 89,
    chest: "157.5 - 165"
  }
  ]
  const hoodieSizeGuideDataInchesForPM = [
    {
     sizeLabel: "S",
      length: 27,
      width: "20",
      sleeveLength: "33 ½"
    },
    {
      sizeLabel: "M",
      length: 28,
      width: "22",
      sleeveLength: "34 ½"
    },
    {
      sizeLabel: "L",
      length: 29,
      width: "24",
      sleeveLength: "35 ½"
    },
    {
      sizeLabel: "XL",
      length: 30,
      width: "26",
      sleeveLength: "36 ½"
    },
    {
      sizeLabel: "2XL",
      length: 31,
      width: "28",
      sleeveLength: "37 ½"
    },
    {
      sizeLabel: "3XL",
      length: 32,
      width: "30",
      sleeveLength: "38 ½"
    },
    {
      sizeLabel: "4XL",
      length: 33,
      width: "32",
      sleeveLength: "39 ½"
    },
    {
      sizeLabel: "5XL",
      length: 34,
      width: "34",
      sleeveLength: "40 ½"
    }
  ]
  const hoodieSizeGuideDataCentimetersForPM = [
    {
      sizeLabel: "S",
      length: 68.6,
      width: "50.8",
      sleeveLength: "85"
    },
    {
      sizeLabel: "M",
      length: 71,
      width: "56",
      sleeveLength: "87.6"
    },
    {
      sizeLabel: "L",
      length: '73.7',
      width: "61",
      sleeveLength: "90.2"
    },
    {
      sizeLabel: "XL",
      length: '76.2',
      width: "66",
      sleeveLength: "92.7"
    },
    {
      sizeLabel: "2XL",
      length: '78.7',
      width: "71",
      sleeveLength: "95.3"
    },
    {
      sizeLabel: "3XL",
      length: '81.3',
      width: "76.2",
      sleeveLength: "97.8"
    },
    {
      sizeLabel: "4XL",
      length: '83.8',
      width: "81.3",
      sleeveLength: "100.3"
    },
    {
      sizeLabel: "5XL",
      length: '86.4',
      width: "86.4",
      sleeveLength: "103"
    }

  ]
  const hoodieSizeGuideDataInchesForMY = [
    {
      sizeLabel: "S",
      length: 27,
      chest: "36 - 38",
      sleeveLength: "33 ½"
    },
    {
      sizeLabel: "M",
      length: 28,
      chest: "42 - 45",
      sleeveLength: "34 ½"
    },
    {
      sizeLabel: "L",
      length: 29,
      chest: "46 - 49",
      sleeveLength: "35 ½"
    },
    {
      sizeLabel: "XL",
      length: 30,
      chest: "50 - 53",
      sleeveLength: "36 ½"
    },
    {
      sizeLabel: "2XL",
      length: 31,
      chest: "54 - 57",
      sleeveLength: "37 ½"
    },
    {
      sizeLabel: "3XL",
      length: 32,
      chest: "58 - 61",
      sleeveLength: "38 ½"
    },
    {
      sizeLabel: "4XL",
      length: 33,
      chest: "62 - 65",
      sleeveLength: "39 ½"
    },
    {
      sizeLabel: "5XL",
      length: 34,
      chest: "66 - 69",
      sleeveLength: "40 ½"
    }
   
  ]
  const hoodieSizeGuideDataCentimetersForMY = [
    {
      sizeLabel: "S",
      length: 68.6,
      chest: "96.5 - 104",
      sleeveLength: "85",
    },
    {
      sizeLabel: "M",
      length: 71,
      chest: "106.7 - 114.3",
      sleeveLength: "87.6",
    },
    {
      sizeLabel: "L",
      length: 73.7,
      chest: "116.8 - 124.5",
      sleeveLength: "90.2",
    },
    {
      sizeLabel: "XL",
      length: 76.2,
      chest: "127 - 134.6",
      sleeveLength: "92.7",
    },
    {
      sizeLabel: "2XL",
      length: 78.7,
      chest: "137.2 - 144.8",
      sleeveLength: "95.3",
    },
    {
      sizeLabel: "3XL",
      length: 81.3,
      chest: "147.3 - 155",
      sleeveLength: "97.8",
    },
    {
      sizeLabel: "4XL",
      length: 83.8,
      chest: "157.5 - 165",
      sleeveLength: "100.3",
    },
    {
      sizeLabel: "5XL",
      length: 86.4,
      chest: "167.6 - 175.3",
      sleeveLength: "103",
    },
  ];
  


  return (
    <div
      id="size_guide_backdrop"
      className="fixed inset-0 z-50 bg-black bg-opacity-60 flex justify-center items-center"
      onClick={handleBackdropClick}
    >
      <div className="bg-white h-[95%] max-w-4xl overflow-y-auto max-h-[calc(100vh-30px)] p-6 rounded-md">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-lg font-medium text-sub-work-card">Size Guide</h1>
          <button onClick={onClose} className="focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="w-full">
          <div className="relative" id="js--size-guide__tabs">
            <ul className="flex border-b border-gray-300">
              <li className="mr-4">
                <button
                  className={`inline-block py-2 px-4 ${
                    activeTab === "product-measurements"
                      ? "text-black border-b-2 border-gray-800"
                      : "text-gray-600 hover:text-black"
                  }`}
                  onClick={() => setActiveTab("product-measurements")}
                >
                  Product measurements
                </button>
              </li>
              <li>
                <button
                  className={`inline-block py-2 px-4 ${
                    activeTab === "measure-yourself"
                      ? "text-black border-b-2 border-gray-800"
                      : "text-gray-600 hover:text-black"
                  }`}
                  onClick={() => setActiveTab("measure-yourself")}
                >
                  Measure yourself
                </button>
              </li>
            </ul>
          </div>

          {activeTab === "product-measurements" && (
            <div className="mt-6">
              <h3 className="text-lg font-medium text-black mb-4">
                Product measurements
              </h3>
              <p className="text-sm text-gray-800 mb-4">
              Measurements are provided by suppliers. Product measurements may vary by up to 2" (5 cm).
              </p>
              <p className="text-sm text-gray-800 mb-6">
              Pro tip! Measure one of your products at home and compare with the measurements you see in this guide.
              </p>

              <div className="bg-gray-100 p-6 rounded-lg">
                <div className="flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 text-center">
                    <img
                      alt="t-shirt-img"
                      className="mx-auto"
                      src={
                        searchParams?.get("type")?.toLocaleLowerCase() ===
                        "t-shirt"
                          ? imageUri["t-shirt"]["productMeasurements"]
                          : imageUri["hoodie"]["productMeasurements"]
                      }
                    />
                  </div>
                  <div className="md:w-1/2 mt-6 md:mt-0 md:pl-6">
                    <p className="font-medium text-gray-800">A Length</p>
                    <p className="text-sm text-gray-800">
                    Place the end of a measuring tape beside the collar at the top of the garment (high point shoulder). Pull the tape to the bottom of the item.
                    </p>
                    <p className="font-medium mt-4 text-gray-800">B Width</p>
                    <p className="text-sm text-gray-800">
                    Place the end of a measuring tape at one side of the chest area and pull the tape across to the other side of the product.
                    </p>
                    <p className="font-medium mt-4 text-gray-800">C Sleeve length</p>
                    <p className="text-sm text-gray-800">
                    Place the end of a measuring tape at the center back of the collar, then pull the tape along the top seam of the sleeve. When you get to the shoulder hold the tape in place at the shoulder and continue to pull down the sleeve until you reach the hem of the sleeve.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <h3 className="text-lg font-normal mb-4 text-gray-800">
                  Find your size
                </h3>
                <div className="relative mb-3" id="js--size-guide__tabs">
                  <ul className="flex border-b border-gray-300">
                    <li className="mr-4">
                      <button
                        className={`inline-block py-2 px-4 ${
                          productMesSubTab === "inches"
                            ? "text-black border-b-2 border-gray-800"
                            : "text-gray-600 hover:text-black"
                        }`}
                        onClick={() => setProductMesSubTab("inches")}
                      >
                        Inches
                      </button>
                    </li>
                    <li>
                      <button
                        className={`inline-block py-2 px-4 ${
                          productMesSubTab === "centimeters"
                            ? "text-black border-b-2 border-gray-800"
                            : "text-gray-600 hover:text-black"
                        }`}
                        onClick={() => setProductMesSubTab("centimeters")}
                      >
                        Centimeters
                      </button>
                    </li>
                  </ul>
                </div>
                {productMesSubTab === "inches" && (
                  <div className=" text-gray-800 text-sm py-6 rounded-lg">
                    <Table
                      columns={[
                        ...columns,
                        searchParams?.get("type")?.toLocaleLowerCase() === 'hoodie' &&{
                          title: "SlEEVE LENGTH",
                          key:'sleeveLength'
                        }
                      ]}
                      data={
                        searchParams?.get("type")?.toLocaleLowerCase() ===
                        "t-shirt"
                          ? tShirtSizeGuideDataInchesForPM
                          : hoodieSizeGuideDataInchesForPM
                      }
                    />
                    <p className="text-xs mt-3 text-gray-800 font-normal">
                      Product measurements may vary by up to 2 " (5 cm)
                    </p>
                  </div>
                )}
                {productMesSubTab === "centimeters" && (
                  <div className=" text-gray-800 text-sm py-6 rounded-lg">
                    <Table
                      columns={[
                        ...columns,
                        searchParams?.get("type")?.toLocaleLowerCase() === 'hoodie' &&{
                          title: "SlEEVE LENGTH",
                          key:'sleeveLength'
                        }
                      ]}
                      data={
                        searchParams?.get("type")?.toLocaleLowerCase() ===
                        "t-shirt"
                          ? tShirtSizeGuideDataCentimetersForPM
                          : hoodieSizeGuideDataCentimetersForPM
                      }
                    />
                    <p className="text-xs mt-3 text-gray-800 font-normal">
                      Product measurements may vary by up to 2 " (5 cm)
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === "measure-yourself" && (
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-4">Measure yourself</h3>
              <p className="text-sm text-gray-800 mb-4">
              Measurements are provided by suppliers.
              </p>
              <p className="text-sm text-gray-800 mb-6">
              Product measurements may vary by up to 2" (5 cm).
              </p>

              <div className="bg-gray-100 p-6 rounded-lg">
                <div className="flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 text-center">
                    <img
                      alt="t-shirt-img"
                      className="mx-auto"
                      src={
                        searchParams?.get("type")?.toLocaleLowerCase() === "t-shirt"
                          ? imageUri["t-shirt"]["measureYourself"]
                          : imageUri["hoodie"]["measureYourself"]
                      }
                    />
                  </div>
                  <div className="md:w-1/2 mt-6 md:mt-0 md:pl-6">
                    <p className="font-medium text-gray-800">A Length</p>
                    <p className="text-sm text-gray-800">
                    Place the end of a measuring tape beside the collar at the top of the garment (high point shoulder). Pull the tape to the bottom of the item.
                    </p>
                    <p className="font-medium mt-4 text-gray-800">B Chest</p>
                    <p className="text-sm text-gray-800">
                    Measure yourself around the fullest part of your chest. Keep the measuring tape horizontal.
                    </p>
                    <p className="font-medium mt-4 text-gray-800">C Sleeve length</p>
                    <p className="text-sm text-gray-800">
                  Place the end of a measuring tape at the center back of the collar, then pull the tape along the top seam of the sleeve. When you get to the shoulder hold the tape in place at the shoulder and continue to pull down the sleeve until you reach the hem of the sleeve.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <h3 className="text-lg font-normal mb-4 text-gray-800">
                  Find your size
                </h3>
                <div className="relative mb-3" id="js--size-guide__tabs">
                  <ul className="flex border-b border-gray-300">
                    <li className="mr-4">
                      <button
                        className={`inline-block py-2 px-4 ${
                          productMesSubTab === "inches"
                            ? "text-black border-b-2 border-gray-800"
                            : "text-gray-600 hover:text-black"
                        }`}
                        onClick={() => setProductMesSubTab("inches")}
                      >
                        Inches
                      </button>
                    </li>
                    <li>
                      <button
                        className={`inline-block py-2 px-4 ${
                          productMesSubTab === "centimeters"
                            ? "text-black border-b-2 border-gray-800"
                            : "text-gray-600 hover:text-black"
                        }`}
                        onClick={() => setProductMesSubTab("centimeters")}
                      >
                        Centimeters
                      </button>
                    </li>
                  </ul>
                </div>
                {productMesSubTab === "inches" && (
                  <div className=" text-gray-800 text-sm py-6 rounded-lg">
                    <Table
                      columns={searchParams.get("type")?.toLocaleLowerCase() === 't-shirt' ? columnsForMYTShirt : columnsForMYHoodie}
                      data={
                        searchParams?.get("type")?.toLocaleLowerCase() ===
                        "t-shirt"
                          ? tShirtSizeGuideDataInchesForMY
                          : hoodieSizeGuideDataInchesForMY
                      }
                    />
                    <p className="text-xs mt-3 text-gray-800 font-normal">
                      Product measurements may vary by up to 2 " (5 cm)
                    </p>
                  </div>
                )}
                {productMesSubTab === "centimeters" && (
                  <div className=" text-gray-800 text-sm py-6 rounded-lg">
                    <Table
                      columns={searchParams.get("type")?.toLocaleLowerCase() === 't-shirt' ? columnsForMYTShirt : columnsForMYHoodie}
                      data={
                        searchParams?.get("type")?.toLocaleLowerCase() ===
                        "t-shirt"
                          ? tShirtSizeGuideDataCentimetersForMY
                          : hoodieSizeGuideDataCentimetersForMY
                      }
                    />
                    <p className="text-xs mt-3 text-gray-800 font-normal">
                      Product measurements may vary by up to 2 " (5 cm)
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};



const Table = ({ columns, data }) => {
  
  return (
    <div
    className="overflow-auto text-gray-800 text-sm py-6 rounded-lg"
    >
      <table className="w-full text-left border-collapse">
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th key={index} className="py-2 font-medium uppercase px-4 border-b border-gray-300">
              {column.title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            {columns.map((column, index) => (
              <td key={index} className="py-2 px-4 border-b font-normal border-gray-300">
                {item[column.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
}

export default SizeGuideModal;
