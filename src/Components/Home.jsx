import React from 'react'
import ImageCarousel from '../assets/ImageCarousel'

const Home = () => {
  const images = [
    { src: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400/27eba484890223.5d6b7872e3b04.jpg' },
    { src: 'https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/company/1/applications/645a057875d8c4882b096f7e/theme/pictures/free/original/theme-image-1748946891319.jpeg',},
    { src: 'https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/company/1/applications/645a057875d8c4882b096f7e/theme/pictures/free/original/theme-image-1746422182561.jpeg',}
  ];


  const imageData = [
    { url: "https://rukminim2.flixcart.com/flap/128/128/image/29327f40e9c4d26b.png?q=100", label: "Grocery" },
    { url: "https://rukminim2.flixcart.com/flap/128/128/image/22fddf3c7da4c4f4.png?q=100", label: "Mobiles" },
    { url: "https://rukminim2.flixcart.com/fk-p-flap/128/128/image/0d75b34f7d8fbcb3.png?q=100", label: "Fashion" },
    { url: "https://rukminim1.flixcart.com/fk-p-flap/128/128/image/0139228b2f7eb413.jpg?q=100", label: "Electronics" },
    { url: "https://rukminim1.flixcart.com/flap/128/128/image/71050627a56b4693.png?q=100", label: "Home" },
    { url: "https://rukminim1.flixcart.com/flap/128/128/image/dff3f7adcf3a90c6.png?q=100", label: "Kids & Toys" },
    { url: "https://rukminim1.flixcart.com/fk-p-flap/128/128/image/05d708653beff580.png?q=100", label: "Travel" },
    { url: "https://rukminim1.flixcart.com/flap/128/128/image/69c6589653afdb9a.png?q=100", label: "Computer & Laptop" }
  ];


  return (
    <div>
      <ImageCarousel images={images} autoPlay={true} interval={2000} />
      <div className="p-8">
        <h1 className='p-2 text-2xl font-semibold'>Categories</h1>
        <div className='flex p-5 gap-15 flex-wrap'>
          {imageData.map((item, index) => (
            <div key={index} className="flex flex-col justify-center items-center">
              <img
                src={item.url}
                alt={item.label}
                className="rounded-full border border-gray-400 w-20 h-20 object-cover"
              />
              <span className="mt-2 text-sm font-medium text-center">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home