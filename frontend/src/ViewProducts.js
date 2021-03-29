import React,{useState,useEffect}  from 'react'
import {getAllProduct} from "./helper/products"
import ProductCard from "./ProductCard"
import {Link} from "react-router-dom"
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';



function ViewProducts(props) {

    
  const [data , setData] = useState([]);

  useEffect(  () => {
    getAllProduct().
        then(res  => { 
          setData(res) } ). 
        catch(err => console.log(err)  );
    } , []
  )


    console.log(props)
    return (
        <div>
          <Link to = "/customer" >  <Button variant="contained" color="primary" disableElevation>
     Home Page
    </Button> </Link>
    <Grid container spacing={3}>
                { data.map( (product,i) => {
               if(product.user === props.history.location.state.name){
                return  <ProductCard  products = {product}  role = {true} />
               }
         }   )  }
         </Grid>
        </div>
    )
}

export default ViewProducts
