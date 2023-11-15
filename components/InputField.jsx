function InputField({
  error,
  type,
  value,
  changeHandler,
  placeholder,
  className,
  disabled,
}) {
  return (
    <>
      <label className="block text-gray-700 font-bold mb-2">
        <input
          type={type || "text"}
          className={`form_input ${className}`}
          value={value}
          onChange={changeHandler}
          placeholder={placeholder}
          disabled={disabled}
        />
      </label>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </>
  );
}

export default InputField;
