import { useHistory } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth';

import { FormEvent, useState } from 'react';
import { database } from '../services/firebase';

import illustrationImg from '../assets/imagesNlw/illustration.png'
import logoImg from '../assets/imagesNlw/logo.png';
import iconGoogleImg from '../assets/imagesNlw/google-icon.svg';

import { Button } from '../components/Button';


import '../styles/auth.scss';

export function Home(){
    const history = useHistory();
    const { user, SignInWithGoogle } = useAuth();
    const [roomCode, setRoomCode] = useState('');
  
  async function handleCreateRoom(){
    if(!user){
       await SignInWithGoogle()
    }
    history.push('/rooms/new');
}

async function handleJoinRoom(event: FormEvent){
    event.preventDefault();

    if(roomCode.trim() === ''){
        return;
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if(!roomRef.exists()){
        alert('Essa sala não existe!')
        return;
    }

    if(roomRef.val().endedAt){
        alert('Esta sala já foi encerrada.')
        return;
    }

    history.push(`/rooms/${roomCode}`)

}


    return(
        <div id="pageAuth">
        <aside>
             <img src={illustrationImg} alt="Ilustração principal" />
             <strong>Crie salas para turbinar sua jogatina</strong>
             <p>Tire dúvidas do seus games favoritos em tempo real!</p>
        </aside>   
        <main>
        <div className='mainContent'>
            <img src={logoImg} alt="LetmeAsk" />
            <button onClick={handleCreateRoom} className='createRoom'>
                <img src={iconGoogleImg} alt="Logo Google" />
                Crie sua sala via Google
            </button>
            <div className='separator'>
                ou junte-se a uma sala
            </div>
            <form onSubmit={handleJoinRoom}>
                <input
                 type="text"
                 placeholder="Informe o código da sala:"
                 onChange={event => setRoomCode(event.target.value)}
                 value={roomCode}
                  />
                  <Button type="submit">
                      Entrar na sala
                  </Button>
            </form>
        </div>
         </main>        
        </div>
    )
}