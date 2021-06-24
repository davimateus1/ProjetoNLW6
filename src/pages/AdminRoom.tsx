import { useParams, useHistory } from 'react-router-dom'

import { database } from '../services/firebase';

import logoImg from '../assets/imagesNlw/logo.svg'
import deleteImg from '../assets/imagesNlw/delete.svg'

import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';
import '../styles/room.scss';
//import { useAuth } from '../hooks/useAuth'
import { useRoom } from '../hooks/useRoom'
import { Question } from '../components/Question';


type RoomParams = {
    id: string;
}

export function AdminRoom(){
  //  const { user } = useAuth();
    const history = useHistory();
    const params = useParams<RoomParams>();
    const roomId = params.id;

    const {title, questions} = useRoom(roomId)

    async function handleEndRoom(){
        await database.ref(`rooms/${roomId}`).update({
           endedAt: new Date(),
        })

        history.push('/');
    }

    async function handleDeleteQuestion(questionId: string){
      if (window.confirm('Tem certeza que deseja excluir essa pergunta?')){
        await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
      }
    }

    return(
    <div id="pageRoom">
        <header>
            <div className="content">
                <img src={logoImg} alt="Letmeask" />
                <div>
                   <RoomCode code={roomId}/> 
                   <Button isOutlined onClick={handleEndRoom}>Encerrar sala</Button>
                </div>
            </div>
        </header>
        <main className="content">
            <div className="roomTitle">
                <h1>Sala {title}</h1>
                {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
            </div>
                        
             <div className="questionList">
                 
             {questions.map(question => {
                return(
                    <Question 
                    key={question.id}
                    content={question.content}
                    author={question.author}
                    >
                        <button
                        type="button"
                        onClick={() => handleDeleteQuestion(question.id)}
                        >
                            <img src={deleteImg} alt="Remove a pergunta" />
                        </button>
                    </Question>
                );

            })}    
                 </div>           
                        
        </main>
    </div>
    );
}