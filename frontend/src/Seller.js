import React,{useEffect,useState} from 'react'
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Navbar from "./Navbar"
import { Typography } from '@material-ui/core';
import Spinner from "./spinner"
import ProductCard from "./ProductCard"
import {getAllProduct} from "./helper/products"
import API from "./Backend"


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary
    }
  }));

function Seller() {
  console.log("CALED in Seller")

    const classes = useStyles();
    const [data, setData ] = useState("");
    const [r,setR] = useState(false)
    const [reload,setReload] = useState(true)
    const [img,setImg] = useState("")

  const user = JSON.parse(localStorage.getItem("JWT"))



  useEffect(  () => {
    getAllProduct().
        then(res  => { 
          setReload(false)
          setData(res) } ). 
        catch(err => console.log(err)  );
        setImg(`${API}/user/photo/${user._id}`)
    } , [r]
  )

  if(data){

    var hold = [...data]
  const found =   hold.filter(  (data,i) => {
        return user._id == data.user
    }   )

    console.log( "Found", found )


  }



    return (
        <div>
            <Navbar img = {img}  setR = {setR} r = {r}  name = {user.userName} _id = {user._id} />
            <br></br>
            <Typography  align = "center" variant = "h3"  > Your Products  </Typography>
            {reload ? <Spinner/> : ""  }
            <div className={classes.root}>
            <Grid container spacing={3}>
             
            { data ? data.map( (product,i)  => {
                 console.log(product.user , user._id )
                if(product.user  === user._id){
                    console.log("TESTTTTTT")
                    return <Grid item xs={3}>
                    <ProductCard  products = {product} setR = {setR} r = {r}  />
                    </Grid>
                }
            }   ) : "" }
            </Grid>
            </div>

            {data  ? console.log(data) : "" }
            
        </div>
    )
}

export default Seller
