export default function UnityGame(props: any) {

    return(
        <div className="flex items-center justify-center flex-col overflow-x-hidden">
            <h1 className='text-4xl font-bold text-[#FFFFFF] pb-4'>{props.title}</h1>
            <iframe src={props.build} 
            width={props.width} 
            height={props.height}  
            className='overflow-hidden'/>
        </div>
    );


}