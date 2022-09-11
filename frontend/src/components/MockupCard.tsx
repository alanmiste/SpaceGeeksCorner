import "./MockupCard.css";
import {Button, Card, CardActions, CardContent, CardMedia, Typography} from "@mui/material";

type MockupCardProps = {
    imageUrl: string,
    imageAlt: string,
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
                    Black- Front
                </Typography>
                <Typography gutterBottom variant="h4" component="div">
                    0.00 €
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Add to Basket</Button>
            </CardActions>
        </Card>
    </div>
}