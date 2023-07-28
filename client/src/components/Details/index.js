import React from 'react'

const Details = () => {
  return (
    <>
        <div className='flex flex-col p-6'>
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

          <div className='py-4'>
              <div className="font-antialiased hover:subpixel-antialiased tracking-widest font-bold text-gray-700">
              Community Members (98)</div>

            <ul>
              <li>
                User 1
              </li>
              <li>
                User 2
              </li>
            </ul>
          </div>
        </div>
    </>
  )
}

export default Details