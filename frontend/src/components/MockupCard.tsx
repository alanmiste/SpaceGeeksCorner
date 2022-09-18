import "./MockupCard.css";
import {Button, Card, CardActions, CardContent, CardMedia, Typography} from "@mui/material";

type MockupCardProps = {
    imageUrl: string,
    imageAlt: string,
    imageId: number,
    setTshirtNumber: (id: number) => void,
}
export default function MockupCard(props: MockupCardProps) {

    return <div className="CardContainer">

        <Card sx={{maxWidth: 400}}>
            <CardMedia
                component="img"
                height="auto"
                image={props.imageUrl}
                alt={props.imageAlt + "view of the shirt"}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {props.imageAlt}
                </Typography>
                <Typography gutterBottom variant="h4" component="div">
                    0.00 €
                </Typography>
            </CardContent>
            <CardActions className="MockupCardAction">
                <Button size="small">Add to Cart</Button>
                <Button size="small" onClick={() => {
                    props.setTshirtNumber(props.imageId)
                    window.scrollTo({top: 0, behavior: 'smooth'});
                }}>Show</Button>
            </CardActions>
        </Card>
    </div>
}
