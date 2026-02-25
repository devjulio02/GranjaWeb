import { Carousel, Container, Image } from "react-bootstrap";

const Carrousel = () => {
  return (
    <Container>
       <Carousel>
        <Carousel.Item>
          <Image className="imagem-carrossel" src=""/>
        </Carousel.Item>

        <Carousel.Item>
          <Image className="imagem-carrossel" src=""/>
        </Carousel.Item>

        <Carousel.Item>
          <Image className="imagem-carrossel" src=""/>
        </Carousel.Item>
      </Carousel>
    </Container>
  );
};

export default Carrousel;
