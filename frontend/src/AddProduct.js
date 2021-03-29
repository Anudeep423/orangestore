import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from "@material-ui/core/Typography";
import TextField from '@material-ui/core/TextField';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import AddIcon from "@material-ui/icons/Add";
import {uploadProduct} from "./helper/products"

const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    width: 'fit-content',
  },
  formControl: {
    marginTop: theme.spacing(1),
    minWidth: 120,
  },
  formControlLabel: {
    marginTop: theme.spacing(1),
  },
  menuButton: {
    marginRight: theme.spacing(4)
  }
}));

export default function MaxWidthDialog({setR = f => f ,r = undefined}) {

  const [values,setValues] = useState({   userID : "" , type : "" , price : "" ,description : "" , photo : "" , formData : "", success : false })

  const {type, price , description ,userID , photo , formData , success } = values;
  
  const user = JSON.parse(localStorage.getItem("JWT"));
    useEffect( () => {
      // console.log("QWDQWDqwdqw");
      // console.log(JSON.parse("QWDQWDQDQWDw"))
      setValues({...values ,userID : user._id,formData : new FormData()})
      const usersave = "user"

      }, [])

   

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('sm');
  const [redirect,setRedirect] = React.useState(false)


    const handleChange = (event) => {
      console.log(event.target.value)
      const value = event.target.name === "photo" ? event.target.files[0] : event.target.value;
      const name = event.target.name
      formData.set( name , value);
      setValues({ ...values, [event.target.name]: value   });

  }

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
         <Button  
         startIcon={<AddIcon />}
         variant="contained"
         color="default"
         className={classes.menuButton}
         onClick={handleClickOpen}
          >
             Add Product
             
        </Button>
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
  

        <Typography align = "center" variant = "h5" >Upload your product</Typography>
        <DialogContent>
          <form className={classes.form} noValidate>
            
          <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
           label="Type"
           values = {type}
          onChange= {handleChange}
          name="type"
          autoFocus
        />
          
             <Typography> Product Pic : </Typography>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          values = {photo}
          onChange= {handleChange}
          name="photo"
          type="file"
        />
     
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          values = {price}
          onChange= {handleChange}
          name="price"
          label="Price"
          autoFocus
        />
         <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          values = {description}
          onChange= {handleChange}
          label="Description"
          name="description"
          autoFocus
        />
        <br></br>
     
        <Button
        variant="contained"
        color="primary"
        className={classes.button}
        startIcon={<CloudUploadIcon />}
        onClick = { () => { 
          formData.set("user",userID)
          uploadProduct(formData).
          then(res => { 
            console.log(res.error)
            if(!res.error){ 
            const user = "user"
            console.log(res);
          setValues({   user : "" , type : "" , price : "" ,description : "" , photo : "" , formData : "", success : true })
          setR(!r)
         }
         }).
          catch(  err => {console.log(err)}  )  }   }
      >
        Upload
      </Button>

      <br></br>

      { success ? <p style = {{  color : "green"}  }  >Product Successfully uploaded</p> : " " }
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
