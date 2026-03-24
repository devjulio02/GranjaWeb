import { useEffect, useState } from 'react';
import { Button, Container, Row, Col} from 'react-bootstrap';
import TabelaGalpoes from '../components/TabelaGalpoes';
import ModalAddDel from '../components/ModalAddDel';

const Galpoes = () => {
  const [galpoes, setGalpoes] = useState([]);
  
  // Estados para o Modal de Cadastro
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    setNovoGalpao(estadoInicialGalpao);
  };
  const handleShow = () => setShow(true);

  // Estados para o Modal de Exclusão
  const [showDelete, setShowDelete] = useState(false);
  const [idParaDeletar, setIdParaDeletar] = useState("");
  
  const handleCloseDelete = () => {
    setShowDelete(false);
    setIdParaDeletar(""); // Limpa a seleção ao fechar
  };
  const handleShowDelete = () => setShowDelete(true);

  // Estado inicial do formulário vazio
  const estadoInicialGalpao = {
    nome: '',
    qtdFrangos: '',
    qtdComedouros: '',
    qtdBebedouros: '',
    qtdVentiladores: '',
    qtdExaustores: '',
    qtdResponsaveis: '',
    possuiTermometro: false
  };

  const [novoGalpao, setNovoGalpao] = useState(estadoInicialGalpao);

  // Método GET: Busca os dados na nossa Fake API
  const carregarGalpoes = () => {
    fetch('http://localhost:3001/galpoes')
      .then((response) => response.json())
      .then((json) => {
        setGalpoes(json);
      })
      .catch((error) => console.log('Erro ao buscar dados:', error));
  };

  useEffect(() => {
    carregarGalpoes();
  }, []);

  // Atualiza o estado conforme o usuário digita no cadastro
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNovoGalpao({
      ...novoGalpao,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  // Método POST: Envia os dados para a Fake API
  const handleSubmit = (e) => {
    e.preventDefault(); 
    
    fetch('http://localhost:3001/galpoes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(novoGalpao)
    })
    .then(() => {
      carregarGalpoes(); 
      handleClose(); 
    })
    .catch((error) => console.log('Erro ao salvar:', error));
  };

  // Método DELETE: Exclui o galpão selecionado na API
  const handleConfirmDelete = () => {
    if (!idParaDeletar) return; // Evita deletar vazio

    fetch(`http://localhost:3001/galpoes/${idParaDeletar}`, {
      method: 'DELETE'
    })
    .then(() => {
      carregarGalpoes(); // Recarrega a tabela após excluir
      handleCloseDelete(); // Fecha o modal
    })
    .catch((error) => console.log('Erro ao excluir:', error));
  };

  return (
    <Container className="mt-4">
      <Row className="mb-3">
        <Col className="d-flex justify-content-between align-items-center">
          <h2>Gerenciamento de Galpões</h2>
          <div>
            <Button variant="primary" onClick={handleShow}>
              Adicionar (+)
            </Button>
            <Button variant="danger" className="ms-2" onClick={handleShowDelete}>
              Excluir (-)
            </Button>
          </div>
        </Col>
      </Row>

      <TabelaGalpoes addGalpao = {galpoes}/>
      <ModalAddDel show = {show} showDelete = {showDelete} handleChange = {handleChange} 
      handleSubmit = {handleSubmit} handleConfirmDelete = {handleConfirmDelete} novoGalpao = {novoGalpao}
      listaDeGalpoes = {galpoes} idParaDeletar = {idParaDeletar} setIdParaDeletar = {setIdParaDeletar} />
    </Container>
  );
};

export default Galpoes;