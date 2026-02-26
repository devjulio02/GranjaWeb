import { useEffect, useState } from 'react'; // Importa os hooks necessários do React para gerenciar estado e efeitos
import { Button, Container, Form, Modal, Row, Col, Table } from 'react-bootstrap'; // Importa os componentes necessários do React Bootstrap para criar a interface

const Galpoes = () => { // Componente funcional que representa a página de gerenciamento de galpões
  const [galpoes, setGalpoes] = useState([]); // Estado para armazenar a lista de galpões, inicialmente em estado vazio
  
  // Estados para o Modal de Cadastro
  const [show, setShow] = useState(false); // Controla a visibilidade do modal de cadastro
  const handleClose = () => { // Função para fechar o modal de cadastro, que também coloca o formulário para o estado inicial
    setShow(false); // Fecha o modal
    setNovoGalpao(estadoInicialGalpao); // Coloca o formulário para o estado inicial, limpando os campos após o cadastro ou ao fechar o modal
  };
  const handleShow = () => setShow(true); // Função para abrir o modal de cadastro, definindo o estado como true

  // Estados para o Modal de Exclusão
  const [showDelete, setShowDelete] = useState(false); // Controla a visibilidade do modal de exclusão
  const [idParaDeletar, setIdParaDeletar] = useState(""); // Armazena o ID do galpão selecionado para exclusão, inicialmente vazio
  const handleCloseDelete = () => { // Função para fechar o modal de exclusão, que também limpa a seleção do ID para deletar
    setShowDelete(false);
    setIdParaDeletar(""); // Limpa a seleção ao fechar
  }; 
  const handleShowDelete = () => setShowDelete(true); // // Função para abrir o modal de exclusão, definindo o estado como true

  // Variável que vai armazer a estrutura do JSON inicialmente vazio para o formulário
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

  // Estado para armazenar os dados do novo galpão que está sendo cadastrado, inicialmente com a estrutura definida no estadoInicialGalpao
  const [novoGalpao, setNovoGalpao] = useState(estadoInicialGalpao);

 // Essa função vai servir para dar carga na API, ele pega os dados em formato JSON e fazer um tráfego desses dados transformando em String e depois recarrega os dados voltando para o formato JSON
  const carregarGalpoes = () => {
    fetch('http://localhost:3001/galpoes') // Essa é a URL que contém os dados dos galpões, através da Fake API
      .then((response) => response.json()) // Transforma a resposta em JSON
      .then((json) => { // Atualiza o estado com os dados recebidos caso a requisição seja bem-sucedida
        setGalpoes(json); // Atualiza o estado com os dados recebidos
      })
      .catch((error) => console.log('Erro ao buscar dados:', error)); // Caso a requisição falhe, exibe um erro no console
  };

  useEffect(() => { // Essa parte vai servir para carregar a página uma única vez
    carregarGalpoes();
  }, []);

  // Essa função é responsável por atualizar o estado do formulário de cadastro conforme o usuário for preenchendo os campos. Ele pega o nome do campo, o valor e o tipo para atualizar corretamente o estado.
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target; // Desestruturação para pegar o nome, valor, tipo e estado

    // Atualiza o estado do novo galpão, mantendo os valores anteriores e atualizando o campo específico
    setNovoGalpao({ 
      ...novoGalpao,// Espalha os valores anteriores do estado
      [name]: type === 'checkbox' ? checked : value
    });
  };

  // Método POST: Envia os dados do novo galpão para a API e recarrega a tabela após o cadastro
  const handleSubmit = (e) => {
    e.preventDefault(); // Evita o comportamento padrão de "recarregar"/ atualizar a página
    
    fetch('http://localhost:3001/galpoes', { // URL para onde os dados do novo galpão serão enviados
      method: 'POST', // Especifica que a requisição é do tipo POST
      headers: { // Define o tipo de conteúdo como JSON para a API entender
        'Content-Type': 'application/json' // Deixa bem especifico que o corpo da requisição é do tipo JSON
      },
      body: JSON.stringify(novoGalpao) // Converte o objeto do novo galpão para uma string JSON antes de enviar para a API
    })
    .then(() => { 
      carregarGalpoes(); 
      handleClose(); 
    }) // Se a requisição for bem-sucedida, recarrega os galpões para atualizar a tabela e fecha o modal de cadastro
    .catch((error) => console.log('Erro ao salvar:', error));
  };

  // Método DELETE: Envia a requisição para excluir o galpão selecionado e recarrega a tabela após a exclusão
  const handleConfirmDelete = () => {
    if (!idParaDeletar) return; // Evita deletar vazio

    fetch(`http://localhost:3001/galpoes/${idParaDeletar}`, { // URL para onde a requisição de exclusão será enviada, incluindo o ID do galpão a ser excluído
      method: 'DELETE' // Informa que arequisição é do tipo DELETE
    })
    .then(() => {
      carregarGalpoes();
      handleCloseDelete();
    }) // Se a requisição for bem-sucedida, recarrega os galpões para atualizar a tabela e fecha o modal de exclusão
    .catch((error) => console.log('Erro ao excluir:', error));
  };
  // O retorno do componente é a estrutura JSX que define a interface da página, incluindo a tabela de galpões e os modais para cadastro e exclusão
  return (
    <Container className="mt-4">
      <Row className="mb-3">
        <Col className="d-flex justify-content-between align-items-center">
          <h2>Gerenciamento de Galpões</h2>
          <div>
            <Button variant="primary" onClick={handleShow}> // Botão para abrir o modal de cadastro, que chama a função handleShow ao ser clicado
              Adicionar (+)
            </Button> // Botão para abrir o modal de exclusão, que chama a função handleShowDelete ao ser clicado
            <Button variant="danger" className="ms-2" onClick={handleShowDelete}> // Botão para abrir o modal de exclusão, que chama a função handleShowDelete ao ser clicado
              Excluir (-)
            </Button>
          </div>
        </Col>
      </Row>
      // A tabela que exibe os galpões cadastrados, utilizando o componente Table do React Bootstrap para estilização e responsividade
      <Table striped bordered hover responsive>
        <thead>
          // Cabeçalho da tabela, definindo os títulos das colunas
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
          {galpoes.map((galpao) => ( // Mapeia a lista de galpões para criar uma linha na tabela para cada galpão, exibindo suas informações em cada coluna
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
      </Table>

      {/* MODAL DE CADASTRO */}
      <Modal show={show} onHide={handleClose} size="lg"> {/* Modal para cadastro de novo galpão, que é controlado pelo estado "show" e pode ser fechado com a função handleClose. O tamanho do modal é definido como "lg" para uma melhor visualização do formulário*/}

        {/* Cabeçalho do modal, com um título e um botão para fechar o modal */}
        <Modal.Header closeButton>
          <Modal.Title>Cadastrar Novo Galpão</Modal.Title>
        </Modal.Header>

        {/* Corpo do modal, que contém um formulário para preencher as informações do novo galpão. O formulário é controlado pelo estado "novoGalpao" e tem um evento de submit que chama a função handleSubmit para enviar os dados para a API */}
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