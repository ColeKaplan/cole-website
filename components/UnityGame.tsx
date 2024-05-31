

export default function UnityGame(props: any) {

    return(
        <div className="flex items-center justify-center flex-col">
            <h1>{props.title}</h1>
            <iframe src={props.build} width="960" height="640" 
            className=''/>
        </div>
    );


}