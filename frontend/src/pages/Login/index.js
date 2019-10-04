import React, { useState } from 'react';
import api from '../../services/api'

const Login = ({ history }) => {
    const [email, setEmail] = useState('');

    const handleSubmit = event => {
        event.preventDefault();

        api.post('/sessions', { email })
            .then(res => {
                const { id } = res.data;

                localStorage.setItem('user', id);

                history.push('/dashboard')
            });
    }
    return (
        <>
            <p>
                Ofereça <strong>spots</strong> para programadores e encontre <strong>talentos</strong> para sua empresa.
       </p>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">E-MAIL *</label>
                <input
                    id="email"
                    type="email"
                    placeholder="Seu melhor e-mail"
                    onChange={({ target }) => setEmail(target.value)}
                />

                <button className="btn" type="submit">Entrar</button>
            </form>
        </>
    )
}

export default Login;