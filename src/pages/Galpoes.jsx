import { useEffect, useState } from 'react';
import { Button, Container, Form, Modal, Row, Col, Table } from 'react-bootstrap';

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

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Frangos</th>
            <th>Comedouros</th>
            <th>Bebedouros</th>
            <th>Ventiladores</th>
            <th>Exaustores</th>
            <th>Responsáveis</th>
            <th>Termômetro</th>
          </tr>
        </thead>
        <tbody>
          {galpoes.map((galpao) => (
            <tr key={galpao.id}>
              <td>{galpao.nome}</td>
              <td>{galpao.qtdFrangos}</td>
              <td>{galpao.qtdComedouros}</td>
              <td>{galpao.qtdBebedouros}</td>
              <td>{galpao.qtdVentiladores}</td>
              <td>{galpao.qtdExaustores}</td>
              <td>{galpao.qtdResponsaveis}</td>
              <td>{galpao.possuiTermometro ? 'Sim' : 'Não'}</td>
            </tr>
          ))}
        </tbody>
      </Table>    .then(() => {
      carregarGalpoes(); 
      handleClose(); 
    })

      {/* MODAL DE CADASTRO */}
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Cadastrar Novo Galpão</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Nome do Galpão</Form.Label>
                  <Form.Control type="text" name="nome" value={novoGalpao.nome} onChange={handleChange} required />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Quantidade de Frangos</Form.Label>
                  <Form.Control type="number" name="qtdFrangos" value={novoGalpao.qtdFrangos} onChange={handleChange} required />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Qtd. Comedouros</Form.Label>
                  <Form.Control type="number" name="qtdComedouros" value={novoGalpao.qtdComedouros} onChange={handleChange} required />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Qtd. Bebedouros</Form.Label>
                  <Form.Control type="number" name="qtdBebedouros" value={novoGalpao.qtdBebedouros} onChange={handleChange} required />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Qtd. Ventiladores</Form.Label>
                  <Form.Control type="number" name="qtdVentiladores" value={novoGalpao.qtdVentiladores} onChange={handleChange} required />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Qtd. Exaustores</Form.Label>
                  <Form.Control type="number" name="qtdExaustores" value={novoGalpao.qtdExaustores} onChange={handleChange} required />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Qtd. Responsáveis</Form.Label>
                  <Form.Control type="number" name="qtdResponsaveis" value={novoGalpao.qtdResponsaveis} onChange={handleChange} required />
                </Form.Group>
              </Col>
              <Col md={4} className="d-flex align-items-center">
                <Form.Group className="mb-3 mt-4">
                  <Form.Check type="checkbox" label="Possui termômetro de ambiente?" name="possuiTermometro" checked={novoGalpao.possuiTermometro} onChange={handleChange} />
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancelar
            </Button>
            <Button variant="primary" type="submit">
              Salvar Galpão
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* MODAL DE EXCLUSÃO */}
      <Modal show={showDelete} onHide={handleCloseDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Excluir Galpão</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Selecione o galpão que deseja remover:</Form.Label>
            <Form.Select 
              value={idParaDeletar} 
              onChange={(e) => setIdParaDeletar(e.target.value)}
            >
              <option value="">Selecione...</option>
              {galpoes.map((galpao) => (
                <option key={galpao.id} value={galpao.id}>
                  {galpao.nome}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDelete}>
            Cancelar
          </Button>
          <Button 
            variant="danger" 
            onClick={handleConfirmDelete} 
            disabled={!idParaDeletar} // Fica inativo se não selecionar nada
          >
            Confirmar Exclusão
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Galpoes;