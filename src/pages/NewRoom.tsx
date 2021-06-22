import { Link } from 'react-router-dom'
//import { useAuth } from '../hooks/useAuth';

import illustrationImg from '../assets/imagesNlw/illustration.svg'
import logoImg from '../assets/imagesNlw/logo.svg';

import { Button } from '../components/Button';

import '../styles/auth.scss';

export function NewRoom(){
//const { user } = useAuth();

    return(
        <div id="pageAuth">
        <aside>
             <img src={illustrationImg} alt="Ilustração principal" />
             <strong>Crie salas de Q&amp;A ao vivo</strong>
             <p>Tire as dúvidas da sua audiência em tempo real!</p>
        </aside>   
        <main>
        <div className='mainContent'>
            <img src={logoImg} alt="LetMeAsk" />
            <h2>Crie uma nova sala</h2>
            <form>
                <input
                 type="text"
                 placeholder="Nome da sala:"
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