import React, { useState, useEffect } from 'react';

const PageForm = ({ onSubmit, initialData }) => {

    const [formData, setFormData] = useState(initialData);

    useEffect(() => {
        setFormData(initialData);
    }, [initialData])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className='form-group'>
                <label htmlFor='titulo'>Title</label>
                <input type="text" name="titulo" value={formData.titulo} onChange={handleChange} required />
            </div>
            <div className='form-group'>
                <label htmlFor='descripcion'>Description</label>
                <textarea name="descripcion" value={formData.descripcion} onChange={handleChange} rows="5" cols="30" required />
            </div>
            <div className='form-group'>
                <label htmlFor='imagen'>Imagen</label>
                <input type="text" name="imagen" value={formData.imagen} onChange={handleChange} required />
            </div>
            <button type="submit">Guardar</button>
        </form>
    );
};

export default PageForm;