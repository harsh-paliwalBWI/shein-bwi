"use client"
import { useQuery } from '@tanstack/react-query';
import React,{FC,useState} from 'react'
import { fetchFiltersData } from '../../utils/databaseService';
import FlatIcon from "../flatIcon/flatIcon";


interface Props{
    setIsMobileModalOpen:any
    setFilterSelected:any
    setSelectedSizes:any
    selectedSizes:any
    onhandleFiltersApply:any
    filterSelected:any
    onClearFilter:any
}

const FilterSidebar:FC<Props> = ({setIsMobileModalOpen,setFilterSelected,setSelectedSizes,selectedSizes,onhandleFiltersApply,filterSelected,onClearFilter}) => {
    const { data: filtersData } = useQuery({
        queryKey: ["filtersData"],
        queryFn: () => fetchFiltersData(),
      });

      const [isFiltersOpen,setIsFiltersOpen]=useState([])


      const toggleFilterSection = (filterName: string) => {
        // console.log("toggleFilterSection clliecked");
        
        setIsFiltersOpen((prev) => ({
          ...prev,
          [filterName]: !prev[filterName],
        }));
      };

      const clearFilterHandler=()=>{
        if(filtersData){
            const initialFilterState = Object.fromEntries(filtersData.map(filter => [filter.name, []]));
            console.log(initialFilterState,"from clearFilterHandler");
            
    //   setFilterSelected(initialFilterState)
    return initialFilterState
          }
        
      }

      const toggleFilter = (filterType: string, value: string) => {
        // console.log("inside toggleFilter",filterType,value);
        
        setFilterSelected((prevFilterSelected) => ({
          ...prevFilterSelected,
          [filterType]: prevFilterSelected[filterType].includes(value)
            ? prevFilterSelected[filterType].filter((selectedValue) => selectedValue !== value)
            : [...prevFilterSelected[filterType], value],
        }));
    
        setSelectedSizes((prevSelectedSizes) => ({
          ...prevSelectedSizes,
          [value]: !prevSelectedSizes[value],
        }));
      };

      const onApplyHandler=()=>{
        console.log("clicked onApplyHandler");

        
      }
   console.log("filter selected from sidebar",filterSelected);
   
  return (
    <div className="h-[100vh] w-[100vw] bg-[rgba(0,0,0,0.5)] fixed top-0 left-0 z-50">
<div className="bg-[white]  sm:w-[60%] w-[100%] absolute top-0 left-0 max-h-screen z-50 h-[2000px] overflow-y-scroll ">
    <div className='w-full text-center text-lg font-semibold border-b py-4 relative '>Filter
    <div onClick={() =>{
        setIsMobileModalOpen(false)
        document.body.classList.remove("no-scroll");
    }
    }>
    <FlatIcon  className="flaticon-close absolute top-2 right-2 text-base  text-gray-500" />

    </div>
    </div>
    
 {filtersData &&
          filtersData.length > 0 &&
          filtersData.map((filter: any, idx: number) => (
            <div key={idx} className=' px-5'>
              <div className={`  py-4 `}>
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-sm text-secondary">{filter?.name}</p>
                  {/* <p
                    onClick={() => toggleFilterSection(filter.name)}
                    className="h-[30px] w-[30px] rounded-full text-secondary bg-[#F3F5F9] flex items-center justify-center"
                  >
                    <FlatIcon className={`${isFiltersOpen[filter.name] ? 'flaticon-minus' : "flaticon-plus"} text-secondary text-xs `} />
                  </p> */}
                </div>
              </div>

              {/* {isFiltersOpen[filter.name] && ( */}
                <div className="flex items-center gap-5   ">
                  {filter.values.map((value: any, idx: number) => (
                    <div key={idx} className="flex items-center gap-2">
                      {/* <div
                        // onClick={() => toggleFilter(filter.name, value)}
                        className={`h-[18px] w-[18px] flex items-center justify-center border p-1 border-[gray] cursor-pointer relative`}
                      >
                        {selectedSizes[value] && (
                          <div className="h-full w-full bg-pink-500  "></div>
                        )}
                      </div> */}
                      <p
                       onClick={() => toggleFilter(filter.name, value)}
                       className={`bg-gray-100 px-3 py-1  text-sm ${selectedSizes[value]?"text-black font-semibold":"text-gray-500"}`}>{value}</p>
                    </div>
                  ))}
                </div>
              {/* )
              } */}
            </div>
          ))}

          {/* <div className='py-20 border border-[red]'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Autem, cumque nisi aperiam tempora atque corrupti quae. Rerum illum nisi corporis non sequi, placeat exercitationem animi tempore, beatae debitis dolorem. Suscipit unde tenetur saepe, qui id vitae nulla debitis dolorum eum iusto similique consequuntur autem ex doloremque vero! Labore, autem voluptatem consequatur eos modi ipsum eligendi, molestiae repudiandae ratione reiciendis velit culpa illum, eius accusantium! Esse laudantium quae nobis? In ipsum quidem placeat! Quidem eveniet commodi nemo fuga dolor maxime sapiente consequatur quas exercitationem assumenda harum hic adipisci minus pariatur quasi, voluptas sed nesciunt rerum fugit! Explicabo, reprehenderit tenetur. Hic eum esse necessitatibus, odit voluptatum animi eaque, debitis iusto harum et dignissimos culpa repudiandae tempore veritatis iure labore molestias incidunt obcaecati doloremque voluptatem. Eum impedit quo tempora animi doloribus assumenda placeat vero est porro, rem magnam labore soluta voluptate nam enim nulla, beatae dolorum quam perferendis a illum reprehenderit, culpa eaque at. Repellendus similique, repellat deserunt natus hic asperiores cum quis officiis nam, ipsum, aperiam assumenda culpa vero iure consectetur fuga impedit error ut ratione. Optio dolorum rerum rem illum repellendus quaerat delectus quam temporibus, ducimus, veritatis cumque velit, vel asperiores perferendis? Animi quae facere error aperiam placeat aliquid odio fugiat repudiandae corrupti minus perferendis modi enim, possimus voluptatibus dignissimos labore sequi architecto exercitationem, iure laboriosam cupiditate illo sapiente nemo eveniet. Accusantium minima quos quibusdam dolorum doloremque vitae ut perspiciatis repellendus. Sunt cum delectus sint quasi impedit facilis eaque amet blanditiis perferendis aspernatur. Laborum temporibus dicta ipsum quis possimus ullam, similique repellat ex eaque error. Aut aspernatur dicta illum dolor officiis ipsum eum facilis eos expedita aperiam autem in provident libero deserunt, eveniet sint. Nesciunt odio debitis neque repellendus esse, assumenda quod incidunt saepe recusandae dicta eius officiis, facere minima laborum est sapiente. Hic ab quidem explicabo exercitationem voluptatum corrupti vel, enim nam corporis necessitatibus sequi debitis pariatur deserunt tenetur tempora nihil iste amet blanditiis numquam a ad magnam cumque obcaecati. Minus ab inventore perspiciatis. Aut, inventore quidem. Ullam, debitis alias sint iure nesciunt provident ut quam ex harum culpa ad repellendus suscipit perferendis libero sapiente voluptatem veritatis distinctio excepturi aut impedit eum doloremque corporis ipsum mollitia! Repellat soluta numquam laborum, delectus neque perspiciatis repudiandae explicabo deserunt rem eaque sit, nisi porro fuga voluptates placeat aut! Deleniti harum animi excepturi laborum cum deserunt aliquam eius distinctio aliquid minima illum mollitia debitis soluta amet ut quod alias officiis facere necessitatibus, nostrum quo. Incidunt totam expedita in. Perferendis ut corrupti illo eos et veniam adipisci error veritatis cum placeat id recusandae est, natus reprehenderit amet non impedit quo eaque. Eius veniam vitae, architecto totam fugit a consequatur. Nihil sequi rerum, cumque illum labore, quasi officiis et ad, harum cupiditate eum culpa explicabo. Asperiores obcaecati, totam optio reiciendis et dolores excepturi repellat voluptatem eos sed qui similique cum, corrupti incidunt provident adipisci. Ad facilis labore nobis eius possimus laudantium quasi sint laborum nisi asperiores, ducimus optio fugit veniam tempore quisquam at sit. Similique, natus voluptate laborum exercitationem neque sit ex odio perspiciatis doloremque, dicta eligendi sunt ipsa. Animi nulla illum impedit, doloremque dolores, veritatis libero fuga eveniet corrupti reprehenderit numquam, pariatur itaque velit cum dolorem ab qui suscipit. Aliquid animi magni at maiores a explicabo consequuntur est, minima optio non. Nisi, quod? Pariatur velit non expedita eveniet est facilis nostrum sequi voluptatum, consequatur debitis, atque aperiam eaque delectus nulla harum asperiores placeat magni obcaecati quis dolorem officia veritatis adipisci. Culpa ipsa libero qui, laboriosam ea ullam dolor architecto maxime repellendus consequuntur veritatis nobis dicta perferendis consectetur accusamus temporibus iste possimus ducimus veniam sint excepturi maiores! Illum, quam deserunt minus minima nobis facere? Sit totam assumenda officiis quod optio corporis error molestiae perspiciatis quas consequatur blanditiis itaque numquam consectetur ducimus obcaecati at reiciendis harum omnis culpa ad officia, voluptatem tenetur qui? Suscipit dolore aspernatur nesciunt commodi quam incidunt laudantium obcaecati. Veritatis ullam earum aliquam quis alias soluta modi corporis, maxime fugiat? Repellendus tenetur id non voluptates perferendis, culpa labore! Vitae dolores voluptatem reprehenderit! Labore laborum illo ratione dolorem voluptates perferendis doloremque ipsam. Totam non tempore sint labore ipsum recusandae atque, magnam assumenda veritatis tenetur exercitationem error quod expedita quae soluta quo pariatur, obcaecati qui. Corporis saepe dolorum quae ratione eius alias sint expedita inventore suscipit eligendi voluptatibus odio tempora incidunt assumenda tempore voluptatem, nam quam architecto qui autem. Accusantium libero perspiciatis odio rerum nihil illum vero porro iure? Beatae nihil reprehenderit odit enim atque ullam officia illum soluta. Ab culpa sunt eligendi deleniti consequuntur aut dignissimos voluptatem molestias quis exercitationem dolore maxime perferendis ipsam autem, a iste necessitatibus dolorem ipsa. In soluta labore quod iusto commodi corrupti aperiam error veniam! Nobis doloremque quo tempore similique amet ullam cum ipsam natus quam obcaecati tempora adipisci, eum assumenda sint autem neque deserunt animi excepturi saepe vitae id enim architecto voluptate aliquam? Dolores repudiandae ut nisi debitis exercitationem laboriosam sequi repellendus sed deleniti veniam delectus dignissimos eaque laudantium, sapiente saepe sunt quo mollitia porro nesciunt, aut error necessitatibus. Fugit deleniti magnam eveniet optio necessitatibus, atque, libero perferendis soluta eos suscipit vitae esse voluptate itaque? Molestiae, exercitationem ex! Laboriosam et exercitationem voluptate, fuga enim unde! Quae est quaerat adipisci molestiae beatae earum tempora repudiandae quasi, ad totam ducimus unde quas maiores. Libero ipsa minus reprehenderit natus veniam sint fugiat officiis nam quaerat nostrum eos earum ullam similique voluptatibus amet repudiandae beatae ab, nihil ut quos delectus mollitia tempora corporis atque? Accusantium atque ut sequi numquam tempora iusto excepturi dolorum quo veritatis optio delectus illum, odio iste tenetur nemo debitis officia eligendi. Possimus quidem aliquid sit alias nesciunt nam est iure et quisquam velit tenetur reprehenderit ullam inventore rerum harum suscipit nulla non corporis asperiores quis tempora, repudiandae quod. Obcaecati nostrum rem beatae! Numquam qui officiis quo quidem similique, magni perspiciatis, in natus nam pariatur eaque, sint fugit. Placeat ducimus asperiores incidunt amet! Voluptas dolore explicabo, atque labore laborum illo possimus cupiditate odio? Recusandae officia velit nemo minima autem quidem alias facere eum, fuga natus perferendis consequatur non quae, molestias quod eaque obcaecati? Ab, quibusdam! Explicabo eius debitis id iure!</div> */}

<div className='flex items-center mt-5 gap-5 px-3 fixed bottom-0 left-0 w-full  bg-white'>
    <button onClick={() =>{
        setIsMobileModalOpen(false)
    //    onClearFilter(filterSelected)
    setSelectedSizes({})
    const filters=clearFilterHandler()
    onClearFilter(filters)
    document.body.classList.remove("no-scroll");
    }}
className="bg-black text-white px-5 py-2  w-[50%]"
>Clear</button>
<button
onClick={async()=>{
  await onhandleFiltersApply(filterSelected)
    setIsMobileModalOpen(false)
    document.body.classList.remove("no-scroll");
}}
 className='bg-primary text-white py-2 w-[50%]'>Apply</button>
</div>
   </div>
   </div>
  )
}

export default FilterSidebar