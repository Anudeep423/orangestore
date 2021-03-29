import React,{useState,useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import StoreRoundedIcon from "@material-ui/icons/StoreRounded";
import { Divider } from "@material-ui/core";
import ImageHelper from "./ImageHelper"
import {getAllProduct} from "./helper/products"
import API from "./Backend"
import {Link} from "react-router-dom"
import ProductCard from "./ProductCard"

const useStyles = makeStyles({
  root: {
    maxWidth: 345
  }
});

export default function SellerCard(props) {

  const [data , setData] = useState([]);

  useEffect(  () => {
    getAllProduct().
        then(res  => { 
          setData(res) } ). 
        catch(err => console.log(err)  );
    } , []
  )



  console.log("CALLED IN SELLER CARD")
  console.log(props.user.Description)
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
      <ImageHelper user = {props.user} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.user.userName}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          {props.user.Description}
          </Typography>
          <Typography variant = "h5" > { props.price ? `` : "" } </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
      <Link to={{
     pathname: `/customr/viewproducts`,
     state: {name : props.user._id}
}} >  <Button   onClick = { () => {
        
        // data.map( (product,i) => {
        //       if(product.user === props.user._id ){
        //        return  <ProductCard  products = {product}  role = {true} />
        //         console.log("CALLED")
        //       }
        // }   )
        
        } } align="center" varient="outlined" size="small" color="primary">
          <StoreRoundedIcon /> view Store
        </Button> </Link>
        <Divider orientation="vertical" flexItem />
        <Button size="small" color="primary">
          Learn More
        </Button>

        <LinkedInIcon color="primary" />
        <FacebookIcon color="primary" />
        <InstagramIcon color="secondary" />
      </CardActions>
    </Card>
  );
}
