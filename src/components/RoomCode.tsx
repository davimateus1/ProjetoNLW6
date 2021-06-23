import copyImg from '../assets/imagesNlw/copy.svg'
import '../styles/room-code.scss'

type RoomCodeProps = {
    code: string;
}


export function RoomCode(props: RoomCodeProps){
    function copyRoomCode(){
        navigator.clipboard.writeText(props.code);
    }


    return(
     <button className= "Roomcode" onClick={copyRoomCode}>
         <div>
            <img src={copyImg} alt="Copy room code" />
         </div>
         <span>Sala #{props.code}</span>
     </button>   
    )
}