const Card = ({img, name, onClick})=> {

    return(
        <div className="shadow-xl w-56 h-48 rounded-md bg-slate-100 flex flex-col p-4 cursor-pointer m-4" onClick={onClick}>
            <div>
                <img src={img}></img>
            </div>
            <div>
                <p>{name}</p>
            </div>
        </div>    
    )  
}
export default Card