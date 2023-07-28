import React from 'react'
import { useState } from 'react'
import { Tab } from '@headlessui/react'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

const List = () => {
    let [categories] = useState({
        'private message': [
          {
            id: 1,
            title: 'Does drinking coffee make you smarter?',
            date: '5h ago',
            commentCount: 5,
            shareCount: 2,
          },
          {
            id: 2,
            title: "So you've bought coffee... now what?",
            date: '2h ago',
            commentCount: 3,
            shareCount: 2,
          },
        ],
        Community: [
          {
            id: 1,
            title: 'Is tech making coffee better or worse?',
            date: 'Jan 7',
            commentCount: 29,
            shareCount: 16,
          },
          {
            id: 2,
            title: 'The most innovative things happening in coffee',
            date: 'Mar 19',
            commentCount: 24,
            shareCount: 12,
          },
        ],
      })
  return (
    <div className="w-full max-w-md px-2 sm:px-0">
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
          {Object.keys(categories).map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                  selected
                    ? 'bg-white shadow'
                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                )
              }
            >
              {category}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
          {/* {Object.values(categories).map((posts, idx) => (
            <Tab.Panel
              key={idx}
              className={classNames(
                'rounded-xl bg-white p-3',
                'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
              )}
            >
              <ul>
                {posts.map((post) => (
                  <li class="py-3 sm:py-4">
                  <div class="flex items-center space-x-4">
                     <div class="flex-shrink-0">
                        <img class="w-8 h-8 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-2.jpg" alt="Neil" />
                     </div>
                     <div class="flex-1 min-w-0">
                        <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                           Michael Gough
                        </p>
                        <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                           Lorem dolor sit amet the quick brown fox jumps
                        </p>
                     </div>
                     <div class="inline-flex items-center font-thin text-xs underline text-gray-900 dark:text-white">
                      11:35AM
                  </div>
                  </div>
               </li>
                ))}
              </ul>
            </Tab.Panel>
          ))} */}
          <Tab.Panel className={ 'rounded-xl bg-white p-3 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'}>
              <ul>
              <li class="py-3 sm:py-4">
                  <div class="flex items-center space-x-4">
                     <div class="flex-shrink-0">
                        <img class="w-8 h-8 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-2.jpg" alt="Neil" />
                     </div>
                     <div class="flex-1 min-w-0">
                        <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                           Michael Gough
                        </p>
                        <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                           Lorem dolor sit amet the quick brown fox jumps
                        </p>
                     </div>
                     <div class="inline-flex items-center font-thin text-xs underline text-gray-900 dark:text-white">
                      11:35AM
                  </div>
                  </div>
               </li>
              </ul>
          </Tab.Panel>

          <Tab.Panel className={ 'rounded-xl bg-white p-3 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'}>
              <div>
                <span>You do not belong a community yet. Join a Community</span>
                <div class="flex items-center border-b border-teal-500 py-2">
                  <input class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="Community" aria-label="Full name" />
                  <button class="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded" type="button">
                    Search
                  </button>
                </div>
              </div>
              <ul>
              <li class="py-3 sm:py-4 border-b-2 cursor-pointer">
                  <div class="flex items-center space-x-4">
                     <div class="flex-1 min-w-0">
                        <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                           Brisbane Community
                        </p>
                        <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                           Lorem dolor sit amet the quick brown fox jumps
                        </p>
                     </div>
                  </div>
               </li>
               <li class="py-3 sm:py-4 border-b-2">
                  <div class="flex items-center space-x-4">
                     <div class="flex-1 min-w-0">
                        <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                           Brisbane Community
                        </p>
                        <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                           Lorem dolor sit amet the quick brown fox jumps
                        </p>
                     </div>
                  </div>
               </li>
               <li class="py-3 sm:py-4 border-b-2">
                  <div class="flex items-center space-x-4">
                     <div class="flex-1 min-w-0">
                        <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                           Brisbane Community
                        </p>
                        <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                           Lorem dolor sit amet the quick brown fox jumps
                        </p>
                     </div>
                  </div>
               </li>
              </ul>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}

export default List