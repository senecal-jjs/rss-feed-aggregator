import Card from "./styles/Card";

function ArticleCard(props) {
    return (
        <Card>
            <h3>{props.title}</h3>
            <span>{props.published_by}</span>
            <p>{props.summary}</p>
        </Card>
    )
}

export default ArticleCard;