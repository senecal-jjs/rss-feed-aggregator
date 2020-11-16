import Container from "./styles/Container";

function ArticleCard(title, summary, published_by) {
    return (
        <Container>
            <h3>{title}</h3>
            <span>{published_by}</span>
            <p>{summary}</p>
        </Container>
    )
}

export default ArticleCard;