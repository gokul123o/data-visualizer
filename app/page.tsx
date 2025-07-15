import Link from "next/link";


export default function Index() {
  const dataStructures= ["binarysearch", "stack" , "queue"];
  return (
    <>
    <div className="">
        <h1 className="text-4xl text-center p-2 font-bold ">Data Visualization</h1>
        
        <div>
          <img src="img-1.jpg" alt="" width={700} height={200} className="flex justify-center mx-auto"/>
        </div>
        
        <p className="p-6 text-[16px] text-gray-500 ">Data visualization is the graphical representation of information and data using visual elements like charts, graphs, maps, and diagrams. It helps transform complex datasets into clear, understandable visuals that make it easier to identify patterns, trends, and outliers. By leveraging our brain's natural ability to process images faster than text or numbers, data visualization enhances comprehension and decision-making. It's widely used across industries—from business analytics and science to education and journalism—to communicate insights effectively and tell compelling data-driven stories.</p>
        <h3 className="p-6 text-2xl text-white font-bold">Choose a data structure to learn:</h3>
        
        <ul className="space-y-2">
          {dataStructures.map((data)=>
          (
            <li key={data} className="gap-2 text-blue-300 text-[20px] p-2 mx-[50px]">
              <Link href={`/${data}`}>-{data.charAt(0).toUpperCase()+data.slice(1)}</Link>
            </li>
          ))}
        
        </ul>
    </div>
    </>
  );
}
