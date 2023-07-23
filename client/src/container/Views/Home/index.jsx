import React from 'react'

const Home = () => {
  return (
    <div className='p-4 flex flex-col'>
        <div className='py-4'>
            <div className="font-antialiased hover:subpixel-antialiased tracking-widest font-bold text-gray-700">Project Description</div>
            <div className='tracking-tight text-gray-600'>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Obcaecati praesentium optio cum 
                deleniti accusamus consequatur magni velit, eaque voluptatem, veritatis perspiciatis atque iusto harum 
                nostrum exercitationem tempora id in quisquam? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Obcaecati praesentium optio cum 
                deleniti accusamus consequatur magni velit, eaque voluptatem, veritatis perspiciatis atque iusto harum 
                nostrum exercitationem tempora id in quisquam?</p>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Obcaecati praesentium optio cum deleniti accusamus consequatur magni velit, eaque voluptatem, veritatis perspiciatis atque iusto harum nostrum exercitationem tempora id in quisquam?</p>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Obcaecati praesentium optio cum deleniti accusamus consequatur magni velit, eaque voluptatem, veritatis perspiciatis atque iusto harum nostrum exercitationem tempora id in quisquam?</p>
            </div>
        </div>
        <div className='py-4'>
            <div className="font-antialiased hover:subpixel-antialiased tracking-widest font-bold text-gray-700">Project Manual</div>
            <div className='tracking-tight text-gray-600'>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Obcaecati praesentium optio cum 
                deleniti accusamus consequatur magni velit, eaque voluptatem, veritatis perspiciatis atque iusto harum 
                nostrum exercitationem tempora id in quisquam? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Obcaecati praesentium optio cum 
                deleniti accusamus consequatur magni velit, eaque voluptatem, veritatis perspiciatis atque iusto harum 
                nostrum exercitationem tempora id in quisquam?</p>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Obcaecati praesentium optio cum deleniti accusamus consequatur magni velit, eaque voluptatem, veritatis perspiciatis atque iusto harum nostrum exercitationem tempora id in quisquam?</p>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Obcaecati praesentium optio cum deleniti accusamus consequatur magni velit, eaque voluptatem, veritatis perspiciatis atque iusto harum nostrum exercitationem tempora id in quisquam?</p>
            </div>
        </div>
        <div>
            <div className="font-antialiased hover:subpixel-antialiased tracking-widest font-bold text-gray-700">Register</div>
            <span className="text-blue-400">Connect to register</span>
            <form>
  <div class="grid md:grid-cols-2 md:gap-6 p-4">
    <div class="relative z-0 w-full mb-6 group p-4">
        <input type="text" name="floating_first_name" id="floating_first_name" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
        <label for="floating_first_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Username</label>
    </div>
    <div class="relative z-0 w-full mb-6 group p-4">
        <input type="text" name="floating_last_name" id="floating_last_name" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
        <label for="floating_last_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Gender</label>
    </div>
  </div>
  <div class="grid md:grid-cols-2 md:gap-6 px-4">
    <div class="relative z-0 w-full mb-6 group p-4">
        <input type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" name="floating_phone" id="floating_phone" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
        <label for="floating_phone" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Age</label>
    </div>
    <div class="relative z-0 w-full mb-6 group p-4">
        <input type="text" name="floating_company" id="floating_company" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
        <label for="floating_company" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Race (Ex. Hispanic)</label>
    </div>
  </div>
  <div className="p-4">
    
<label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Let us know about yourself</label>
<textarea id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>

  </div>
  <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
</form>
        </div>
    </div>
  )
}

export default Home