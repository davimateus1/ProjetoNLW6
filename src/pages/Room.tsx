import { useParams } from 'react-router-dom'
import logoImg from '../assets/imagesNlw/logo.svg'
import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';
import '../styles/room.scss';
import { useState, FormEvent, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth'
import { database } from '../services/firebase'


type FirebaseQuestions = Record<string, {
    author:{
        name: string;
        avatar: string;
    }
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
}>

type Question ={
    id: string;
    author:{
        name: string;
        avatar: string;
    }
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean; 
}



type RoomParams = {
    id: string;
}

export function Room(){
    const { user } = useAuth();
    const params = useParams<RoomParams>();
    const roomId = params.id;
    const [newQuestion, setNewQuestion] = useState('');
    const [questions, setQuestions] = useState<Question[]>([])
    const [title, setTitle] = useState('');

    useEffect(() => {
        const roomRaf = database.ref(`rooms/${roomId}`);

        roomRaf.on('value', room =>{
            const databaseRoom = room.val();
            const firebaseQuestions: FirebaseQuestions = databaseRoom.questions?? {};


        const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
            return{
                id: key,
                content: value.content,
                author: value.author,
                isHighlighted: value.isHighlighted,
                isAnswered: value.isAnswered,
            }
        })

        setTitle(databaseRoom.title);
        setQuestions(parsedQuestions)
        })
    }, [roomId]);


    async function handleSendQuestion(event: FormEvent){
        event.preventDefault();

        if(newQuestion.trim() === ''){
            return;
        }

        if(!user){
            throw new Error ('You must be logged in!')
        }

        const question={
            content: newQuestion,
            author: {
                name: user.name,
                avatar: user.avatar
            },
            isHighlighted: false,
            isAnswered: false
        };

       await database.ref(`rooms/${roomId}/questions`).push(question);
        
        setNewQuestion('')
    }

    return(
    <div id="pageRoom">
        <header>
            <div className="content">
                <img src={logoImg} alt="Letmeask" />
                <div>
                   <RoomCode code={roomId}/> 
                </div>
            </div>
        </header>
        <main className="content">
            <div className="roomTitle">
                <h1>Sala {title}</h1>
                {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
            </div>
            <form onSubmit={handleSendQuestion}>
                <textarea
                placeholder="Qual a sua pergunta?"
                onChange={event => setNewQuestion(event.target.value)}
                value={newQuestion}
                />

                <div className="formFooter">
                    { user ? (
                        <div className="userInfo">
                           <img src={user.avatar} alt={user.name} /> 
                           <span>{ user.name}</span>
                        </div>
                    ) : (
                        <span>Caso deseje enviar uma pergunta <button>faça seu login</button></span>
                    ) }
                    <Button type="submit" disabled={!user}>
                        Enviar pergunta
                    </Button>
                </div>
            </form>
                        
                        
        </main>
    </div>
    );
}