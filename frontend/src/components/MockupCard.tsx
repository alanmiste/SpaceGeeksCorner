import "./MockupCard.css";
import {Button, Card, CardActions, CardContent, CardMedia, Typography} from "@mui/material";

export default function MockupCard() {

    return <div className="CardContainer">

        <Card sx={{maxWidth: 400}}>
            <CardMedia
                component="img"
                height="auto"
                image="https://printful-upload.s3-accelerate.amazonaws.com/tmp/ca7d9467be42df7cef5ef1b77c2b0e02/unisex-staple-t-shirt-black-front-631a233580e16.jpg"
                alt="Front Mockup"
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