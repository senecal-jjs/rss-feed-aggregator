import Card from "./styles/Card";
import ButtonLink from "./styles/ButtonLink";

function ArticleCard(props) {
    function onClick() {

    }

    return (
        <Card>
            <ButtonLink type="button">
                <h3>{props.title}</h3>
                <span>{'by ' + props.author + ' '}</span>
                <span>{props.pubDate}</span>
                <p>{props.description}</p>
            </ButtonLink>
        </Card>
    )
}

export default ArticleCard;