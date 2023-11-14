import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Fragment, useMemo, useState } from "react";

export const EditableDropDown = ({ label, options, handleChange, value }) => {
  const memoizedOptions = useMemo(() => options, [options]);
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    handleChange(e.target.value);
  };

  const handleToggleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="w-56">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button
            className={`inline-flex justify-center bg-black bg-opacity-20 px-4 py-2 font-medium hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 w-full rounded-lg mt-2 p-3 text-sm text-gray-500 ${
              isEditing ? "hidden" : ""
            }`}
          >
            {value || label}
            <ChevronDownIcon
              className="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
              aria-hidden="true"
            />
          </Menu.Button>
          <input
            type="text"
            className={`w-full px-4 py-2 border border-gray-300 rounded-lg mt-2 text-sm text-gray-900 ${
              isEditing ? "" : "hidden"
            }`}
            value={value || ""}
            onChange={handleInputChange}
            onBlur={handleToggleEdit}
          />
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items
            className={`absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${
              isEditing ? "hidden" : ""
            }`}
          >
            <div className="px-1 py-1 max-h-48 overflow-y-auto">
              {memoizedOptions?.map((option, index) => (
                <Menu.Item key={index}>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? "bg-violet-500 text-white" : "text-gray-900"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      onClick={() => {
                        handleChange(option);
                        setIsEditing(false);
                      }}
                    >
                      {option}
                    </button>
                  )}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};
