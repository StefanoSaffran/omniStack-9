import React, { useState, useMemo } from 'react';
import api from '../../services/api'
import camera from '../../assets/camera.svg';

import './styles.css'

const New = ({ history }) => {
  const [thumbnail, setThumbnail] = useState(null);
  const [company, setCompany] = useState('');
  const [techs, setTechs] = useState('');
  const [price, setPrice] = useState('');

  const preview = useMemo(() => {
    return thumbnail ? URL.createObjectURL(thumbnail) : null;
  }, [thumbnail]
  )
  const handleSubmit = event => {
    event.preventDefault()
    const data = new FormData();
    const user_id = localStorage.getItem('user')

    const config = {
      headers: { user_id }
    }

    data.append('thumbnail', thumbnail);
    data.append('company', company);
    data.append('techs', techs);
    data.append('price', price);

    api.post('/spots', data, config)
      .then(res => {
        history.push('/dashboard')
      })
    
    
  }
  return (
    <form onSubmit={handleSubmit}>
      <label
        id="thumbnail"
        style={{ backgroundImage: `url(${preview})` }}
        className={thumbnail ? 'has-thumbnail' : ''}
      >
        <input type="file" onChange={({ target }) => setThumbnail(target.files[0])} />
        <img src={camera} alt="Select img" />
      </label>
      <label htmlFor="company">EMPRESA *</label>
      <input
        id="company"
        placeholder="Sua empresa incrível"
        value={company}
        onChange={({ target }) => setCompany(target.value)}
      />
      <label htmlFor="company">TECNOLOGIAS * <span>(separadas por virgula)</span></label>
      <input
        id="techs"
        placeholder="Quais tecnologias usam"
        value={techs}
        onChange={({ target }) => setTechs(target.value)}
      />
      <label htmlFor="company">VALOR DA DIÁRIA *<span>(em branco para GRATUITO)</span></label>
      <input
        id="price"
        placeholder="Valor cobrado por dia"
        value={price}
        onChange={({ target }) => setPrice(target.value)}
      />

      <button type="submit" className="btn">Cadastrar</button>
    </form>
  )
}

export default New;