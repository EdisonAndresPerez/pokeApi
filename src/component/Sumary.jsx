import { useEffect } from "react"

const Summary = ({data})=> {
    const transformedStats = ()=>{
        return data.stats.map((data)=> {
            return {
                value: data.base_stat,
                statName: data.stat.name
            }
        })
    }
    return (
    <div className="flex w-96 bg-orange-400 px-10 py-5 rounded-md justify-center items-center" >
        <div className="w-1/4 mr-5">
            <img src={data.img}/>
        </div>
        <div className="w-3/4 flex flex-col">
            {transformedStats().map((stat, idx, img)=>(
                <div key={idx} className="flex text-white">
                    <p>{stat.statName}:&nbsp;</p>
                    <p>{stat.value}</p>
                    
                </div>
            ))}
        </div>
    </div>
    )
}

export default Summary