import gif from "../../assets/svg/plane-loader.gif"

const Loading = ()=>{
    return(
        <div className="w-full h-[100vh] bg-white flex justify-center items-center absolute top-0 z-50">
            <img src={gif} className="object-cover" alt="" />
        </div>
    )
}

export {Loading}