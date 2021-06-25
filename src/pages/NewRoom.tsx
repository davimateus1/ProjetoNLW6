import { Link, useHistory } from 'react-router-dom'
import { FormEvent, useState } from 'react'
import { database } from '../services/firebase'
import { useAuth } from '../hooks/useAuth';

import illustrationImg from '../assets/imagesNlw/illustration.png'
import logoImg from '../assets/imagesNlw/logo.png';

import { Button } from '../components/Button';

import '../styles/auth.scss';

export function NewRoom(){
    const { user } = useAuth();
    const history = useHistory()
    const [newRoom, setNewRoom] = useState('');

async function handleCreateRoom(event: FormEvent){
    event.preventDefault();

    if(newRoom.trim() === ''){
        return;
    }

    const roomRef = database.ref('rooms');

    const firebaseRoom = await roomRef.push({
        title: newRoom,
        authorId: user?.id,
    })
        history.push(`/rooms/${firebaseRoom.key}`)
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
            <img src={logoImg} alt="LetMeAsk" />
            <h2>Crie uma nova sala</h2>
            <form onSubmit={handleCreateRoom}>
                <input
                 type="text"
                 placeholder="Nome da sala:"
                 onChange= {event => setNewRoom(event.target.value)}
                 value = {newRoom}
                  />
                  <Button type="submit">
                      Criar a sala
                  </Button>
            </form>
            <p>
                Deseja entrar em uma sala existente? <Link to="/">clique aqui!</Link>
            </p>
        </div>
         </main>        
        </div>
    )
    }