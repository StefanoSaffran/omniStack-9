import React from 'react';

const PersonForm = ({ email, handleSubmit, handleEmail }) => {
    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="email">E-MAIL *</label>
            <input
                id="email"
                type="email"
                placeholder="Seu melhor e-mail"
                value={email}
                onChange={handleEmail}
            />

            <button className="btn" type="submit">Entrar</button>
        </form>
    );
};

export default PersonForm;

