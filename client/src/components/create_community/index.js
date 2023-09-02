import React, { useState, Fragment, useContext } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CommunityContext } from "../../context/community_context";

const CreateCommunityDialog = () => {
  let [isOpen, setIsOpen] = useState(false);
  let [name, setName] = useState("");
  let [guidelines, setGuidelines] = useState("");

  const { create_community } = useContext(CommunityContext);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const submitForm = async (e) => {
    e.preventDefault();
    await create_community({ name, guidelines });
  };

  return (
    <>
      <button
        onClick={openModal}
        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
      >
        Create Community
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 p-2"
                  >
                    Create Community
                  </Dialog.Title>
                  <hr className="p-2" />
                  <div className="mt-2">
                    <form onSubmit={submitForm}>
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="username"
                        >
                          Name
                        </label>
                        <input
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                          className="bg-gray-50 appearance-none border-2 border-gray-300 
                        rounded w-full py-2 px-4 text-gray-700 text-sm
                        leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                          type="text"
                          placeholder="eg - Community name"
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="username"
                        >
                          Guidelines
                        </label>
                        <textarea
                          value={guidelines}
                          required
                          onChange={(e) => setGuidelines(e.target.value)}
                          className="bg-gray-50 appearance-none border-2 border-gray-300 
                        rounded w-full py-2 px-4 text-gray-700 text-sm
                        leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                          type="number"
                          placeholder="Guideline..."
                          rows={7}
                        />
                      </div>
                      <div className="text-center">
                        <button
                          type="submit"
                          className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                          // onClick={closeModal}
                        >
                          submit
                        </button>
                      </div>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default CreateCommunityDialog;
