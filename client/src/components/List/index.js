import React, { useState, useContext } from "react";
import { Tab, Dialog, Transition } from "@headlessui/react";
import { CommunityContext } from "../../context/community_context";
import { UserContext } from "../../context/user_context";
import CreateCommunityDialog from "../create_community";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const List = ({ tabChange }) => {
  const { communities, getCommunity, myCommunity, community } =
    useContext(CommunityContext);

  const { isAdmin } = useContext(UserContext);

  let [categories] = useState({
    "private message": [],
    Community: [],
  });
  const [selectedIndex, setSelectedIndex] = useState(1);

  const setCommunity = async (id) => {
    await getCommunity(id);
  };

  return (
    <div className="w-full max-w-md px-2 sm:px-0">
      <Tab.Group
        // onChange={(index) => {
        //   tabChange(index);
        // }}
        selectedIndex={selectedIndex}
        onChange={setSelectedIndex}
      >
        <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
          {Object.keys(categories).map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700",
                  "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                  selected
                    ? "bg-white shadow"
                    : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                )
              }
            >
              {category}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
          {/* private message panel */}
          <Tab.Panel
            className={
              "rounded-xl bg-white p-3 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
            }
          >
            <ul>
              <li className="py-3 sm:py-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <img
                      className="w-8 h-8 rounded-full"
                      src="/default.jpg"
                      alt="Neil"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                      Michael Gough
                    </p>
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                      {/* Lorem dolor sit amet the quick brown fox jumps */}
                    </p>
                  </div>
                  <div className="inline-flex items-center font-thin text-xs underline text-gray-900 dark:text-white">
                    11:35AM
                  </div>
                </div>
              </li>
            </ul>
          </Tab.Panel>

          {/* community section */}
          <Tab.Panel
            className={
              "rounded-xl bg-white p-3 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
            }
          >
            {myCommunity && !isAdmin && (
              <>
                <div>
                  <div className="flex items-center border-b border-teal-500 py-2">
                    <span>
                      You do not belong a community yet. Join a Community{" "}
                    </span>
                  </div>
                </div>
                <ul>
                  {communities.length > 0 && (
                    <>
                      {communities.map((community, i) => (
                        <li
                          className="py-3 sm:py-4 border-b-2 cursor-pointer"
                          key={i}
                          onClick={() => setCommunity(community.communityID)}
                        >
                          <div className="flex items-center space-x-4">
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                {community.name}
                              </p>
                              <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                {community.guidelines}
                              </p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </>
                  )}
                </ul>
              </>
            )}

            {/* display if user is admin */}
            {isAdmin && (
              <div>
                <CreateCommunityDialog />
                <ul>
                  {communities.length > 0 && (
                    <>
                      {communities.map((community, i) => (
                        <li
                          className="py-3 sm:py-4 border-b-2 cursor-pointer"
                          key={i}
                          onClick={() => setCommunity(community.communityID)}
                        >
                          <div className="flex items-center space-x-4">
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                {community.name}
                              </p>
                              <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                {community.guidelines}
                              </p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </>
                  )}
                </ul>
              </div>
            )}
          </Tab.Panel>

          {/* for admin user */}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default List;
