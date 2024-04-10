import { useQuery } from "react-query"
import myHotelsApiCall from "../api fetch/myHotelsApiCall"
import { MdFlag } from "react-icons/md";
import { FaBuilding } from "react-icons/fa";
import { MdAttachMoney } from "react-icons/md";
import { FaBed } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa";
import { Link } from "react-router-dom";

type obj = {
  name: string,
  city: string,
  country: string,
  userId: string,
  _id: string,
  description: string,
  type: string,
  adultCount: number,
  childCount: number,
  facilities: string[],
  pricePerNight: number,
  starRating: number,
  imageurls: string[]
} 

const MyHotels = () => {

  const query = useQuery({
    queryKey: ['myHotels'],
    queryFn: myHotelsApiCall,
  })

  return (
    <div className="grow bg-slate-200 flex justify-center">
      <div className="w-[min(700px,100%)] px-1 py-4 flex flex-col gap-4">
        <div className="flex justify-between items-center mb-5">
          <h1 className="font-[500] text-[1.65rem]">My Hotels</h1>
          <Link to={'/addHotel'}><button className="bg-[#f4b41a] py-1 px-3 rounded-md font-[500] max-sm:text-[0.9rem]">Add Hotel</button></Link>
        </div>
        {query.isFetching == true ? 
          <div className="grow flex justify-center items-center">
            <img src="/ZZ5H.gif" alt="spinner" width={53} />
          </div> : 
        (query.status == 'success' && query.data.message.length > 0) ? 
          query.data.message.map((object: obj) => { return (
            <Link to={`/`}>
              <div className="flex flex-col gap-3 w-[100%] bg-slate-100 shadow-xl px-2 py-2 rounded-md cursor-pointer">
                <h2 className="text-[1.3rem] mb-4">{ object.name }</h2>
                <p className="text-[0.99rem] tracking-tighter">{ object.description }</p>
                <div className="flex justify-between gap-4 text-[0.90rem] tracking-tighter max-sm: flex-wrap max-sm:justify-evenly">
                  <div className="text-nowrap flex gap-[2px]"><MdFlag size={20} />{object.city + ', ' + object.country}</div>
                  <div className="text-nowrap flex gap-[2px]"><FaBuilding size={20} />{object.type}</div>
                  <div className="text-nowrap flex gap-[2px]"><MdAttachMoney size={20} />${object.pricePerNight} per night</div>
                  <div className="text-nowrap flex gap-[2px]"><FaBed size={20} />{object.adultCount} Adults, {object.childCount} Children</div>
                  <div className="text-nowrap flex gap-[2px]"><FaRegStar size={20} />{object.starRating} Star Rating</div>
                </div>
              </div>
            </Link>
          )}) 
          : ''}
      </div>
    </div>
  )
}

export default MyHotels