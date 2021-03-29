import React, { useEffect,useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import DeleteIcon from "@material-ui/icons/Delete";
import ProductUpdate from "./ProductUpdate"
import {deleteProduct} from "./helper/products"
import API from "./Backend"

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 400
  },
  media: {
    height: 100,
    paddingTop: "56.25%" // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: red[500]
  }
}));

export default function RecipeReviewCard({products,role,setR = r => r  ,r = undefined }) {

console.log("CALLED IN PRODUCT CARD")

    const title = products.type
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardHeader title= {title} />
      <CardMedia
        className={classes.media}
        height="50"
        image= {`${API}/product/photo/${products._id}`}
        title="Paella dish"
      />
      <CardContent>
       { !role ?  <Typography> Price : {products.price} $ </Typography> : "" }
          <br></br>
        <Typography variant="body2" color="textSecondary" component="p">
          {products.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
      { !role ? <ProductUpdate products = {products} setR = {setR} r = {r}  /> : ""}
        {/* <IconButton onClick = { () =>  { <ProductUpdate /> } } aria-label="add to favorites">
          <EditIcon   />
        </IconButton> */}
     { !role ?   <IconButton color="secondary">
          <DeleteIcon onClick = { () => { deleteProduct(products._id).then( res => {
            if(!res.error){
              setR(!r)
            }

           }).catch(err => {console.log(err)} )  
        }
        
        }  />
        </IconButton>  : "" }
      </CardActions>
    </Card>
  );
}
