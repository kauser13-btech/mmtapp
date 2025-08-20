import useOutsideClick from '@/app/hooks/useOutsideClick';
import { useEffect, useRef, useState } from 'react';

const TailwindDropdown = ({ title, items, onSelectGetChange, placeholder }) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [dropDownData, setDropDownData] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedModel, setSelectedModel] = useState('');
    const [selectedOutfit, setSelectedOutfit] = useState('');

    const dropDownRef = useRef(null);

    useOutsideClick(dropDownRef, () => {
        setShowDropdown(false);
    });

    useEffect(() => {
        setDropDownData(items)
        if (showDropdown) {
            dropDownRef.current.querySelector('input').focus();
        }
    }, [showDropdown])

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
        // Implement your filtering logic here
        const filteredData = items.filter((item) =>
            item.title.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setDropDownData(filteredData);
    };

    const handleItemClicked = (e, type, slug) => {
        onSelectGetChange(e, slug);
        setShowDropdown(false);
        setInputValue('');
        type === 'Brand' ? setSelectedBrand(slug) : type === 'Model' ? setSelectedModel(slug) : setSelectedOutfit(slug);
    }
    return (
        <div ref={dropDownRef} className="group relative w-full max-w-[254px] min-h-14 rounded-[10px] bg-select-option-bg flex items-center">
            <div onClick={() => setShowDropdown(!showDropdown)} className="w-full h-full flex items-center cursor-pointer">
                <div className="flex items-center justify-between w-full px-7">
                    <p className="text-white font-roboto font-normal text-base">{title}</p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="7" viewBox="0 0 12 7" fill="none">
                        <path opacity="0.8" d="M1 0.789062L6 5.78906L11 0.789062" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
            </div>
            <div className={`flex flex-col gap-1 max-h-48 overflow-y-auto hideScroll w-full bg-select-option-bg absolute top-0 px-2 py-3 rounded-[10px] ${showDropdown ? 'block' : 'hidden'}`}>
                <div className='relative flex items-center justify-between'>
                    <input
                        placeholder={'Filter by ' + placeholder}
                        type="text"
                        className='bg-transparent text-white w-full min-h-8 rounded-md focus:outline-none px-2 placeholder:capitalize placeholder:text-gray-400 pr-7'
                        value={inputValue}
                        onChange={handleInputChange}
                    />
                    <svg className='absolute right-2' width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M15.7372 14.4753L12.7159 11.463C13.6907 10.2211 14.2196 8.68756 14.2176 7.10882C14.2176 5.70283 13.8007 4.32841 13.0196 3.15937C12.2385 1.99033 11.1282 1.07918 9.82925 0.54113C8.53028 0.00308016 7.10094 -0.137698 5.72196 0.136597C4.34299 0.410893 3.07631 1.08794 2.08213 2.08213C1.08794 3.07631 0.410893 4.34299 0.136597 5.72196C-0.137698 7.10094 0.00308016 8.53028 0.54113 9.82925C1.07918 11.1282 1.99033 12.2385 3.15937 13.0196C4.32841 13.8007 5.70283 14.2176 7.10882 14.2176C8.68756 14.2196 10.2211 13.6907 11.463 12.7159L14.4753 15.7372C14.5579 15.8204 14.6562 15.8865 14.7645 15.9317C14.8728 15.9768 14.9889 16 15.1062 16C15.2236 16 15.3397 15.9768 15.448 15.9317C15.5563 15.8865 15.6545 15.8204 15.7372 15.7372C15.8204 15.6545 15.8865 15.5563 15.9317 15.448C15.9768 15.3397 16 15.2236 16 15.1062C16 14.9889 15.9768 14.8728 15.9317 14.7645C15.8865 14.6562 15.8204 14.5579 15.7372 14.4753ZM1.77721 7.10882C1.77721 6.05433 2.0899 5.02352 2.67575 4.14674C3.26159 3.26996 4.09428 2.58659 5.0685 2.18305C6.04273 1.77952 7.11474 1.67393 8.14897 1.87965C9.1832 2.08537 10.1332 2.59316 10.8788 3.3388C11.6245 4.08444 12.1323 5.03444 12.338 6.06868C12.5437 7.10291 12.4381 8.17492 12.0346 9.14914C11.6311 10.1234 10.9477 10.9561 10.0709 11.5419C9.19413 12.1277 8.16332 12.4404 7.10882 12.4404C5.69479 12.4404 4.33867 11.8787 3.3388 10.8788C2.33893 9.87897 1.77721 8.52285 1.77721 7.10882Z" fill="white" />
                    </svg>
                </div>
                {dropDownData.length > 0 ? dropDownData.map((brand, index) => (
                    <div onClick={(e) => handleItemClicked(e, placeholder, brand.slug)} className={`py-2 text-white rounded-md cursor-pointer ${selectedBrand || selectedModel || selectedOutfit == brand.slug ? 'bg-orange-primary' : 'hover:bg-orange-primary'}`}
                        key={index}>
                        <p className='px-2'>{brand.title}</p>
                    </div>
                )) : <div className='py-2 rounded-md text-white'>
                    <p className='px-2'>{dropDownData.length == 0 && inputValue == '' ? `Select ${placeholder == 'model' ? 'brand' : placeholder == 'outfit' && 'model'} first!`: "No Data Found!"}</p>
                </div>}
            </div>
        </div>
    );
};

export default TailwindDropdown;
