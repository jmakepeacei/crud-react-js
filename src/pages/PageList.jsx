import React, { useState, useEffect } from "react";
import PageForm from "../components/PageForm";
import pageService from "../services/PageService";

const PageList = () => {
  const [pages, setPages] = useState([]);
  const [editingPage, setEditingPage] = useState(null);

  useEffect(() => {
    getPages();
  }, []);

  const getPages = async () => {
    try {
      const data = await pageService.list();
      setPages(data);
    } catch (error) {
      console.error("Error getting pages", error);
    }
  };

  const handleAddorEdit = async (page) => {
    try {

      if (page.id) {
        const upatedPage = await pageService.update(page);
        //recordar que el evento update retorna un objeto data
        setPages(pages.map(p => (p.id === page.id ? upatedPage.data : p)));
      } else {
        const newPage = await pageService.create(page);
        //recordar que el evento update retorna un objeto data
        setPages(prevPages => [...prevPages, newPage.data]);
      }
      setEditingPage(null);
    } catch (error) {
      console.error("Error saving page", error);
    }
  };

  const handleEdit = (page) => {
    setEditingPage(page);
  };

  const handleDelete = async (id) => {
    try {
      await pageService.remove(id);
      setPages(pages.filter(p => p.id !== id));
    }
    catch (error) {
      console.error('Error deleting page:', error);
    }
  };

  return (
    <div>
      <div className="contenedor">
        <div className="fila">
          <h2>Lista de Páginas</h2>
          <PageForm onSubmit={handleAddorEdit} initialData={editingPage || { id: undefined, titulo: '', descripcion: '', imagen: '' }} />
        </div>
        <div className="fila">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Descripcion</th>
                <th>Imagen</th>
                <th colSpan="2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {pages.map((page) => (
                <tr key={page.id}>
                  <td>{page.id}</td>
                  <td>{page.titulo}</td>
                  <td>{page.descripcion}</td>
                  <td>{page.imagen}</td>
                  <td>
                    <button onClick={() => handleEdit(page)}>Editar</button>
                  </td>
                  <td>
                    <button onClick={() => handleDelete(page.id)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

};

export default PageList;
