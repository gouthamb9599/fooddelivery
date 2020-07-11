import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Switch from '@material-ui/core/Switch';
import Axios from 'axios';
import swal from 'sweetalert';


export default function FormDialog(props) {
    const [open, setOpen] = React.useState(props.open);
    const [category, setCategory] = React.useState('');
    const [foodtitle, setFoodtitle] = React.useState('');
    const [foodcomp, setFoodcomp] = React.useState('');
    const [foodcategory, setFoodcategory] = React.useState(0);
    const [state, setState] = React.useState({ checkedA: true });

    const handleChangehead = (event) => {
        setFoodcomp(event.target.value)
    }
    const handleChange = (event) => {
        setFoodcategory(event.target.value)
    }

    const handleCheck = (event) => {

        setState({ ...state, [event.target.name]: event.target.checked });
    };
    const handlecategory = (event) => {

        setCategory(event.target.value);
    }
    const handlefoodtitle = (event) => {

        setFoodtitle(event.target.value);
    }

    const savecategory = () => {
        Axios.post(`http://localhost:5000/addcategory`, { category: category })
            .then(res => {
                if (res.data.success === true) {
                    swal('Food category added successfully', 'check food type', 'success')
                    setOpen(false);
                }
            })
    }
    const savefood = () => {
        Axios.post(`http://localhost:5000/addfood`, { type: foodcategory, food: foodtitle, ingredients: foodcomp, availability: state })
            .then(res => {
                if (res.data.success === true) {
                    swal('Food category added successfully', 'check food list', 'success')
                    setOpen(false);
                }
            })
    }

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>{props.foodtype ?
            <div>

                <Dialog open={open} onClose={handleClose}

                    aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Food Category</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Enter a Food Type
          </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Food Category"
                            type="text"
                            onChange={handlecategory}
                            fullWidth
                        >                    </TextField>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
          </Button>
                        <Button onClick={savecategory} color="primary">
                            Add Category
          </Button>
                    </DialogActions>
                </Dialog>
            </div>
            : <div>

                <Dialog open={open} onClose={handleClose}

                    aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Food Details</DialogTitle>
                    <DialogContent>
                        <div style={{ display: "flex" }}>
                            <InputLabel id="fc" style={{ paddingTop: '10px', paddingRight: '5px' }}>Food Category</InputLabel>
                            <Select
                                labelId="fc"
                                id="demo-simple-select"
                                value={foodcategory}
                                onChange={handleChange}
                            >

                                {props.cats.map(data => (<MenuItem value={data.id}>{data.type}</MenuItem>))}
                            </Select>

                        </div>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Food Title"
                            type="text"
                            value={foodtitle}
                            onChange={handlefoodtitle}
                            fullWidth
                        >                    </TextField>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Ingredients"
                            type="text"
                            value={foodcomp}
                            onChange={handleChangehead}
                            fullWidth
                        >                    </TextField>
                        <div style={{ display: "flex" }}>
                            <InputLabel id="demo-simple-select-label" style={{ paddingTop: '11px' }}>Food Availability</InputLabel>
                            <Switch
                                checked={state.checkedA}
                                onChange={handleCheck}
                                name="checkedA"
                                inputProps={{ 'aria-label': 'secondary checkbox' }}
                            />
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
      </Button>
                        <Button onClick={savefood} color="primary">
                            Add Food
      </Button>
                    </DialogActions>
                </Dialog>
            </div>
        }
        </div >
    );
}
