import {Button, Container, Form, Modal, Row, Col } from 'react-bootstrap'

const ModalAddDel = (props) => {
  return (
    <Container>
    {/* MODAL DE CADASTRO */}
      <Modal show={props.show} onHide={props.handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Cadastrar Novo Galpão</Modal.Title>
        </Modal.Header>
        <Form onSubmit={props.handleSubmit}>
          <Modal.Body>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Nome do Galpão</Form.Label>
                  <Form.Control type="text" name="nome" value={props.novoGalpao.nome} onChange={props.handleChange} required />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Quantidade de Frangos</Form.Label>
                  <Form.Control type="number" name="qtdFrangos" value={props.novoGalpao.qtdFrangos} onChange={props.handleChange} required />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Qtd. Comedouros</Form.Label>
                  <Form.Control type="number" name="qtdComedouros" value={props.novoGalpao.qtdComedouros} onChange={props.handleChange} required />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Qtd. Bebedouros</Form.Label>
                  <Form.Control type="number" name="qtdBebedouros" value={props.novoGalpao.qtdBebedouros} onChange={props.handleChange} required />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Qtd. Ventiladores</Form.Label>
                  <Form.Control type="number" name="qtdVentiladores" value={props.novoGalpao.qtdVentiladores} onChange={props.handleChange} required />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Qtd. Exaustores</Form.Label>
                  <Form.Control type="number" name="qtdExaustores" value={props.novoGalpao.qtdExaustores} onChange={props.handleChange} required />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Qtd. Responsáveis</Form.Label>
                  <Form.Control type="number" name="qtdResponsaveis" value={props.novoGalpao.qtdResponsaveis} onChange={props.handleChange} required />
                </Form.Group>
              </Col>
              <Col md={4} className="d-flex align-items-center">
                <Form.Group className="mb-3 mt-4">
                  <Form.Check type="checkbox" label="Possui termômetro de ambiente?" name="possuiTermometro" checked={props.novoGalpao.possuiTermometro} onChange={props.handleChange} />
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={props.handleClose}>
              Cancelar
            </Button>
            <Button variant="primary" type="submit">
              Salvar Galpão
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* MODAL DE EXCLUSÃO */}
      <Modal show={props.showDelete} onHide={props.handleCloseDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Excluir Galpão</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Selecione o galpão que deseja remover:</Form.Label>
            <Form.Select 
              value={props.idParaDeletar} 
              onChange={(e) => props.setIdParaDeletar(e.target.value)}
            >
              <option value="">Selecione...</option>
              {props.listaDeGalpoes.map((galpao) => (
                <option key={galpao.id} value={galpao.id}>
                  {galpao.nome}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleCloseDelete}>
            Cancelar
          </Button>
          <Button 
            variant="danger" 
            onClick={props.handleConfirmDelete} 
            disabled={!props.idParaDeletar} 
          >
            Confirmar Exclusão
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
)
}

export default ModalAddDel