import Card from "./styles/Card";

function ArticleCard(props) {
    return (
        <Card>
            <h3>{props.title}</h3>
            <span>{props.author}</span>
            <span>{props.pubDate}</span>
            <p>{props.description}</p>
        </Card>
    )
}

export default ArticleCard;