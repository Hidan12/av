import gif from "../../assets/svg/plane-loader.gif"

const Loading = ()=>{
    return(
        <div className="w-full h-screen bg-white flex justify-center items-center fixed inset-0 z-50">
            <img src={gif} className="object-cover" alt="" />
        </div>
    )
}

export {Loading}