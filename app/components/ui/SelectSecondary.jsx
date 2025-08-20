const SelectSecondary = ({
  defaultValue,
  info,
  onSelectGetChange,
  type,
  error,
  name,
  register,
  notRequired,
}) => {
  const handleSelectChange = (event) => {
    const selectedId = event.target.value;
    onSelectGetChange(selectedId);
  };

  return (
    <div>
      <select
        name={name}
        // onChange={(e) => {
        //   handleSelectChange(e);
        //   if (register && register.onChange) {
        //     register.onChange(e);
        //   }
        // }}
        defaultValue={defaultValue}
        className={
          "bg-white border border-[#B1B5B8] text-black rounded-lg shadow-sm p-[13px] w-full focus:outline focus:outline-[#00A6AC] "
        }
        {...register(name, {
          onChange: (e) => {
            handleSelectChange(e);
            if (register && register.onChange) {
              register.onChange(e);
            }
          },
            ...(notRequired && { required: `${name} is required` }),
          })}
      >
        <option value="" className="text-[#989898]">{defaultValue}</option>
        {info.map((data, _index) => (
          <option className="text-black" key={_index} value={_index}>
            {data.name}
          </option>
        ))}
      </select>
      {error && <p className="font-roboto font-medium underline text-sm text-red-400 first-letter:uppercase">{error.message}</p>}
    </div>
  );
};

export default SelectSecondary;
