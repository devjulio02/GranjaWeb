import { Container, Button, Card, Row, Col } from "react-bootstrap";
import "../components/style/Cards.css";

const Cards = () => {
  return (
    <Container className="cards-container mt-5">
      <Row className="text-center">
        
        <Col md={4}>
          <Card className="card-tamanho">
            <Card.Img
              variant="top"
              src="https://image.made-in-china.com/365f3j00WlrEjUCMbhum/Projeto-de-Galp-o-de-Aves-para-Frangos-de-Corte.webp"
            />
            <Card.Body>
              <Card.Title>Galpões</Card.Title>
              <Card.Text>Controle de lotes por galpão, monitoramento de temperatura, umidade e densidade aviária.</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="card-tamanho">
            <Card.Img
              variant="top"
              src="https://opresenterural.com.br/wp-content/uploads/2022/02/centroaviario2.jpg"
            />
            <Card.Body>
              <Card.Title>Equipamentos</Card.Title>
              <Card.Text>Gestão automatizada de ração, água e climatização. Alertas de falhas e manutenção preventiva.</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="card-tamanho">
            <Card.Img
              variant="top"
              src="https://agron.com.br/wp-content/uploads/2021/03/post-image-27776"
            />
            <Card.Body>
              <Card.Title>Produção</Card.Title>
              <Card.Text>Indicadores de desempenho: ganho de peso, consumo de ração,produção diária.</Card.Text>
            </Card.Body>
          </Card>
        </Col>

      </Row>
    </Container>
  );
};

export default Cards;