import { Container, Table } from 'react-bootstrap'

const TabelaGalpoes = (props) => {
  return (
    <Container>
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
            {props.addGalpao.map((galpao) => (
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
    </Container>
    )
}

export default TabelaGalpoes