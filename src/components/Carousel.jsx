import { Carousel, Container, Image } from "react-bootstrap";
import "../components/style/Carousel.css"

const Carrousel = () => {
  return (
    <Container>
       <Carousel>
        <Carousel.Item>
          <Image className="imagem-carrossel" src="https://blog.mfrural.com.br/wp-content/uploads/2022/05/galinha-caipira-e-de-granja-1090x660.jpg"/>
        </Carousel.Item>

        <Carousel.Item>
          <Image className="imagem-carrossel" src="https://parauapebas.pa.gov.br/wp-content/uploads/2022/10/RRE05405-1024x683.jpg"/>
        </Carousel.Item>

        <Carousel.Item>
          <Image className="imagem-carrossel" src="https://opresenterural.com.br/wp-content/uploads/2019/07/ovo-fabrica.jpg"/>
        </Carousel.Item>
      </Carousel>
    </Container>
  );
};

export default Carrousel;
