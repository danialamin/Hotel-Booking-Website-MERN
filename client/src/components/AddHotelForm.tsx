import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { UseMutationResult } from 'react-query'

const typeList = ["Budget","Boutique","Luxury","Ski Resort","Business","Family","Romantic","Hiking Resort","Cabin","Beach Resort","Golf Resort","Motel","All Inclusive","Pet Friendly","Self Catering"]
const hotelFacilities = ["Free WiFi","Parking","Airport Shuttle","Family Rooms","Cinemas","Outdoor Pool","Spa","Fitness Center",]

const schema = z.object({
  name: z.string().nonempty(),
  city: z.string().nonempty(),
  country: z.string().nonempty(),
  description: z.string().nonempty(),
  type: z.string().nonempty(),
  adultCount: z.number(),
  childCount: z.number(),
  facilities: z.array(z.string()).nonempty(),
  pricePerNight: z.number(),
  starRating: z.number().min(1).max(5),
  imageFiles: z.instanceof(FileList)
  .refine((files) => files?.[0]?.size <= 5000000, 'Max image size is 5MB')
  .refine(files => ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(files?.[0]?.type), 'Not an image')
})

export type FormFields = z.infer<typeof schema>

const HotelForm = (props: {mutation: UseMutationResult<any, unknown, FormData, unknown>, isLoading: string} ) => {
  const {register, watch, handleSubmit, formState:{errors}} = useForm<FormFields>({resolver: zodResolver(schema)})
  const currentType = watch("type")

  const onSubmit: SubmitHandler<FormFields> = (formDataJson) => {
    const formData = new FormData()
    formData.append("name", formDataJson.name);
    formData.append("city", formDataJson.city);
    formData.append("country", formDataJson.country);
    formData.append("description", formDataJson.description);
    formData.append("type", formDataJson.type);
    formData.append("pricePerNight", formDataJson.pricePerNight.toString());
    formData.append("starRating", formDataJson.starRating.toString());
    formData.append("adultCount", formDataJson.adultCount.toString());
    formData.append("childCount", formDataJson.childCount.toString());
    formDataJson.facilities.forEach((facility, index) => {
      formData.append(`facilities[${index}]`, facility);
    });
    Array.from(formDataJson.imageFiles).forEach((imageFile: File) => {
      formData.append(`imageFiles`, imageFile);
    });
    props.mutation.mutate(formData)
  }

  return (
    <div className='grow flex justify-center bg-gray-200'>
      <div className='w-[min(100%,550px)] py-4 max-sm:px-1'>
        <p className='text-[2rem] font-[600] mb-4'>Add Hotel</p>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
          <div className='flex flex-col'>
            <label className='text-[0.95rem]' htmlFor="name">Name</label>
            <input {...register("name")} type="text" className='py-2 px-2 text-[0.95rem] outline-none' id='name' placeholder='Name' />
            {errors.name && <p className='text-red-600 text-[0.92rem]'>{errors.name.message}</p>}
          </div>

          <div className='flex gap-5 max-[550px]:flex-col max-[550px]:gap-0'>
            <div className='flex flex-col grow'>
              <label className='text-[0.95rem]' htmlFor="city">City</label>
              <input {...register("city")} type="text" className='py-2 px-2 text-[0.95rem] outline-none' id='city' placeholder='City' />
              {errors.city && <p className='text-red-600 text-[0.92rem]'>{errors.city.message}</p>}
            </div>
            <div className='flex flex-col grow'>
              <label className='text-[0.95rem]' htmlFor="country">Country</label>
              <input {...register("country")} type="text" className='py-2 px-2 text-[0.95rem] outline-none' id='country' placeholder='Country' />
              {errors.country && <p className='text-red-600 text-[0.92rem]'>{errors.country.message}</p>}
            </div>
          </div>

          <div className='flex flex-col grow'>
            <label className='text-[0.95rem]' htmlFor="description">Description</label>
            <textarea {...register("description")} id='description' placeholder='Description' rows={5} className='outline-none px-2 py-2 text-[0.95rem]' />
            {errors.description && <p className='text-red-600 text-[0.92rem]'>{errors.description.message}</p>}
          </div>

          <div className='flex flex-col'>
            <label className='text-[0.95rem]' htmlFor="pricePerNight">Price per Night</label>
            <input {...register("pricePerNight", {valueAsNumber: true})} type="number" className='py-2 px-2 text-[0.95rem] outline-none' min={0} id='pricePerNight' placeholder='Price per Night' />
            {errors.pricePerNight && <p className='text-red-600 text-[0.92rem]'>{errors.pricePerNight.message}</p>}
          </div>

          <div className='flex flex-col'>
            <label className='text-[0.95rem]' htmlFor="starRating">Star Rating</label>
            <select {...register("starRating", {valueAsNumber: true})} id="starRating" className='outline-none py-[10px] px-1 bg-white'>
              <option value="">Select as Rating</option>
              {[1, 2, 3, 4, 5].map(num => <option key={num} value={num}>{num}</option>)}
            </select>
            {errors.starRating && <p className='text-red-600 text-[0.92rem]'>{errors.starRating.message}</p>}
          </div>

          <div>
            <h2 className='text-[1.3rem] font-[500]'>Types</h2>
            <div className='grid grid-cols-5 gap-1 max-[550px]:grid-cols-4 max-[450px]:grid-cols-3 max-[350px]:grid-cols-2'>
              {typeList.map(type => 
                <div key={type} className={`px-2 py-1 flex justify-center items-center rounded-md ${currentType == type ? 'bg-[#f4b41a] font-[500]' : 'bg-gray-100'}`}>
                  <input {...register("type")} type="radio" value={type} name="type" id={type} className='hidden' />
                  <label htmlFor={type} className='tracking-tighter text-[1rem] cursor-pointer'>{type}</label>
                </div>
              )}
            </div>
            {errors.type && <p className='text-red-600 text-[0.92rem]'>{errors.type.message}</p>}
          </div>

          <div>
            <h2 className='text-[1.3rem] font-[500]'>Facilities</h2>
            <div className='grid grid-cols-3 max-[550px]:grid-cols-2'>
              {hotelFacilities.map(facility => 
                <div key={facility}>
                  <input {...register("facilities")} type="checkbox" value={facility} id={facility} />
                  <label htmlFor={facility} className='tracking-tighter text-[1rem] cursor-pointer'>{facility}</label>
                </div>
              )}
            </div>
            {errors.facilities && <p className='text-red-600 text-[0.92rem]'>{errors.facilities.message}</p>}
          </div>

          <div>
            <h2 className='text-[1.3rem] font-[500]'>Guests</h2>
            <div className='flex flex-row max-sm:flex-col gap-3 bg-[#0e387a] py-4 px-2 rounded-md'>
              <div className='flex flex-col'>
                <label htmlFor="adults" className='text-white font-[500] text-[0.95rem]'>Adults</label>
                <input {...register("adultCount", {valueAsNumber: true})} type="number" className='py-2 px-2 text-[0.95rem] outline-none' min={0} id='adults' placeholder='Adults' />
                {errors.adultCount && <p className='text-red-600 text-[0.92rem]'>{errors.adultCount.message}</p>}
              </div>
              <div className='flex flex-col'>
                <label htmlFor="children" className='text-white font-[500] text-[0.95rem]'>Children</label>
                <input {...register("childCount", {valueAsNumber: true})} type="number" className='py-2 px-2 text-[0.95rem] outline-none' min={0} id='children' placeholder='Children' />
                {errors.childCount && <p className='text-red-600 text-[0.92rem]'>{errors.childCount.message}</p>}
              </div>
            </div>
          </div>

          <div className='mb-12'>
            <h2 className='text-[1.3rem] font-[500] mb-2'>Images</h2>
            <input {...register("imageFiles")} type="file" multiple accept='image/*' className='scale-95 mb-2 ml-[-7px]' />
            {/* {errors.imageFiles && <p className='text-red-600 text-[0.92rem]'>{errors.imageFiles.message}</p>} */}
          </div>

          <button type='submit' className='bg-[#f4b41a] font-[500] text-[1.2rem] py-3 rounded-[16px] mb-6 flex justify-center items-center disabled:bg-yellow-600 disabled:cursor-default' disabled={props.isLoading === 'loading'}>
            {props.isLoading === 'loading' ? <img src='/ZZ5H.gif' width={30} alt='Spinner' />
              : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default HotelForm