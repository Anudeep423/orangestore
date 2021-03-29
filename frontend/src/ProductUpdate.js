import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from "@material-ui/core/Typography";
import TextField from '@material-ui/core/TextField';
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from '@material-ui/icons/Save';
import {updateProducts} from "./helper/products"
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    width: 'fit-content',
  },
  formControl: {
    marginTop: theme.spacing(2),
    minWidth: 120,
  },
  formControlLabel: {
    marginTop: theme.spacing(1),
  },
}));

export default function MaxWidthDialog({products,setR = f => f ,r = undefined}) {
    let history = useHistory();
    const [values, setvalues] = React.useState({title : products.type , price : products.price, photo : "" ,description : products.description , formData : "" });
    const {title,price,description,type,formData} = values
    const {_id} = products;
    console.log( "CHECKKKKKK", products)
    useEffect( () => {
        setvalues({...values, formData: new FormData() })
      }, [])

      const handleChange = (event) => {
        console.log(event.target.value)
        const value = event.target.name === "photo" ? event.target.files[0] : event.target.value;
        const name = event.target.name
        formData.set( name , value);
        setvalues({ ...values, [event.target.name]: value   });
      };

    console.log("IN product Update" , products._id )
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('sm');
  const [redirect,setRedirect] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleMaxWidthChange = (event) => {
    setMaxWidth(event.target.value);
  };

  const handleFullWidthChange = (event) => {
    setFullWidth(event.target.checked);
  };

  return (
    <React.Fragment>
         <IconButton onClick={handleClickOpen}  aria-label="add to favorites">
          <EditIcon   />
        </IconButton>
      {/* <Button variant="outlined" color="primary" onClick={handleClickOpen} >
        Open max-width dialog
      </Button> */}
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={open}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle  id="max-width-dialog-title"></DialogTitle>
        <DialogTitle  id="max-width-dialog-title"></DialogTitle>
  

        <Typography align = "center" variant = "h5" >Update your product</Typography>
        <DialogContent>
          <form className={classes.form} noValidate>
            
          <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Title"
          name="title"
          value = {title}
          onChange = {handleChange}
          autoComplete="email"
          autoFocus
        />
          
             <Typography> Product Pic : </Typography>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="photo"
          onChange = {handleChange}

          type="file"
        />
     
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="price"
          label="Price"
          value = {price}
          onChange = {handleChange}

          name="price"
          autoFocus
        />
         <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          value = {description}
          label="Description"
          name="description"
          onChange = {handleChange}

          autoFocus
        />
        <br></br>
     

        <Button
        variant="contained"
        color="primary"
        size="large"
        className={classes.button}
        startIcon={<SaveIcon />}
        onClick = { () => { updateProducts(products._id,formData).then(res => {console.log(res)
          setR(!r)
        }).catch(err => {console.log(err)

        }
        
        )  }}
        
      >
        Save
      </Button>

      <br></br>
      {redirect  ? () => {  }:   "" }
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={ () => {
               
              handleClose()
             
             
              
        
        }} color="primary">
            Close
          </Button>
          
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
