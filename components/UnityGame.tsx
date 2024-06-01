

export default function UnityGame(props: any) {

    return(
        <div className="flex items-center justify-center flex-col overflow-x-hidden">
            <h1>{props.title}</h1>
            <iframe src={props.build} width="980" height="660" 
            className='overflow-hidden'/>
        </div>
    );


}