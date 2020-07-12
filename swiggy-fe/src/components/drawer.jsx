import React from 'react';
import clsx from 'clsx';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Foodtype from '../components/foodtype';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import KitchenIcon from '@material-ui/icons/Kitchen';
import ListAltIcon from '@material-ui/icons/ListAlt';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import AllInboxIcon from '@material-ui/icons/AllInbox';
import '../styles/drawer.css';
import Axios from 'axios';
import swal from 'sweetalert';
import FoodList from './foodlist';
import Slider from '@material-ui/core/Slider';
import { InputLabel } from '@material-ui/core';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        width: 300,
    },
    margin: {
        height: theme.spacing(3),
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));
const marks = [
    {
        value: 0,
        label: 'Open for Order',
    },
    {
        value: 1,
        label: 'Order Accepted',
    },
    {
        value: 2,
        label: 'Cooking',
    },
    {
        value: 3,
        label: 'Out For Delivery',
    },
    {
        value: 4,
        label: 'Delivered',
    },
];

function valuetext(value) {
    return `${value}`;
}
export default function MiniDrawer(props) {
    const classes = useStyles();
    const theme = useTheme();
    const user = JSON.parse(sessionStorage.getItem('userData'))
    const [open, setOpen] = React.useState(false);
    const [opentype, setOpentype] = React.useState(false);
    const [openfoods, setOpenfoods] = React.useState(false);
    const [opencat, setOpencat] = React.useState(false);
    const [openfood, setOpenfood] = React.useState(false);
    const [catlist, setCatlist] = React.useState([]);
    const [foodlist, setFoodlist] = React.useState([]);
    const [openorder, setOpenorder] = React.useState(false);
    const [opencartdata, setOpencartdata] = React.useState(false);
    const [cartarray, setCartarray] = React.useState([]);
    const [orderarray, setorderarray] = React.useState([]);
    const [openorderdata, setOpenorderdata] = React.useState(false);
    const [openorderadmin, setOpenorderadmin] = React.useState(false);
    const [status, setStatus] = React.useState(0);
    const [statusdata, setStatusdata] = React.useState([]);
    const handleChange = (event) => {
        setStatus(event.target.value);
    };

    const addtocartl = (id) => {
        if (cartarray === []) {
            setCartarray(id);

        }
        else {
            setCartarray(cartarray => [...cartarray, id]);
        }

    }
    const opencart = () => {
        setOpencartdata(!opencartdata)
    }
    const handleDrawerOpen = () => {
        setOpen(true);
        Axios.get(`http://localhost:5000/getstatus`)
            .then(res => {
                if (res.data.success === true) {
                    setStatusdata(res.data.data);
                }
            })
    };
    const appendstatus = (id) => {
        Axios.post(`http://localhost:5000/setstatus`, { status: status, order: id })
            .then(res => {
                if (res.data.success === true) {
                    swal('food order status changed', `Will be notified to the user`, 'success')
                }
            })
    }
    const handleDrawerClose = () => {
        setOpen(false);
    };
    const Opentypeset = () => {
        setOpentype(!opentype);
    }
    const Openfood = () => {
        setOpenfoods(!openfoods);
    }
    const openorders = () => {
        Axios.get(`http://localhost:5000/getorders`)
            .then(res => {
                if (res.data.success === true) {
                    setorderarray(res.data.data)
                    if (sessionStorage.getItem('userData') !== null) {
                        setOpenorderdata(!openorderdata);
                    }
                    else {
                        setOpenorderadmin(!openorderadmin)
                    }
                }
            })
    }
    const viewfoodsadmin = () => {
        if (sessionStorage.getItem('userData') !== null) {
            Axios.get(`http://localhost:5000/viewfooduser`)
                .then(res => {
                    if (res.data.success === true) {
                        setFoodlist(res.data.data);
                        setOpenorder(!openorder)
                    }
                })

        }
        else if (sessionStorage.getItem('adminData') !== null) {
            Axios.get(`http://localhost:5000/viewfoodadmin`)
                .then(res => {
                    if (res.data.success === true) {
                        setFoodlist(res.data.data);
                        setOpenfood(!openfood)
                    }
                })
        }
    }

    const viewtype = () => {
        Axios.get(`http://localhost:5000/viewcategory`)
            .then(res => {
                if (res.data.success === true) {
                    setCatlist(res.data.data);
                    setOpencat(!opencat)
                }
            })
    }

    return (<div>
        <div>
            {props.isadmin ? <div className={classes.root}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    className={clsx(classes.appBar, {
                        [classes.appBarShift]: open,
                    })}
                    style={{ backgroundColor: '#e3714d' }}
                >
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            className={clsx(classes.menuButton, {
                                [classes.hide]: open,
                            })}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap>
                            Swiggy
          </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    className={clsx(classes.drawer, {
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    })}
                    classes={{
                        paper: clsx({
                            [classes.drawerOpen]: open,
                            [classes.drawerClose]: !open,
                        }),
                    }}
                    style={{ backgroundColor: '#e3714d' }}
                >
                    <div className={classes.toolbar}>
                        <SupervisorAccountIcon /> Admin
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                        </IconButton>
                    </div>
                    <Divider />
                    <List>
                        <ListItem button onClick={Opentypeset} key='Create Food Type'>
                            <ListItemIcon><KitchenIcon /></ListItemIcon>
                            <ListItemText primary='Create Food Type' />
                        </ListItem>
                        <ListItem button onClick={Openfood} key='Create Food Details'>
                            <ListItemIcon><FastfoodIcon /></ListItemIcon>
                            <ListItemText primary='Create Food Details' />
                        </ListItem>
                    </List>
                    <Divider />
                    <List>

                        <ListItem button onClick={openorders} key='View Orders'>
                            <ListItemIcon>< ListAltIcon /></ListItemIcon>
                            <ListItemText primary='View Orders' />
                        </ListItem>
                        <ListItem button onClick={viewtype} key='View Categories'>
                            <ListItemIcon><KitchenIcon /></ListItemIcon>
                            <ListItemText primary='View Categories' />
                        </ListItem>
                        <ListItem button onClick={viewfoodsadmin} key='View Food Details'>
                            <ListItemIcon><FastfoodIcon /></ListItemIcon>
                            <ListItemText primary='View Food Details' />
                        </ListItem>

                    </List>
                    <Divider />
                    <List>
                        <ListItem button onClick={props.logout} key='logout'>
                            <ListItemIcon><ExitToAppIcon /></ListItemIcon>
                            <ListItemText primary='logout' />
                        </ListItem>

                    </List>
                </Drawer>
                <div>
                    {opentype ? <Foodtype foodtype={true} open={true} /> : <></>}
                </div>
                <div>{openfoods ? <Foodtype cats={catlist} foodtype={false} open={true} /> : <></>}
                </div>
                <div>{opencat ?
                    <table id="customers">
                        <caption>Food Categories</caption>
                        <tr>
                            <th>ID</th>
                            <th>Food Type</th>
                        </tr>
                        {catlist.map(data => (<tr>
                            <td>{data.id}</td>
                            <td>{data.type}</td>
                        </tr>))
                        }
                    </table> : <></>}</div>
                <div>{openfood ? <FoodList user={'admin'} data={foodlist} /> : <></>}</div>
                <div>{openorderadmin ? <div className='page'>

                    {orderarray.map(data => (
                        <div style={{
                            borderStyle: 'solid',
                            borderColor: 'coral',
                            width: '600px'
                        }}>
                            <h3>Orders</h3>
                            <div
                            > <InputLabel>Order ID</InputLabel>
                                <span>{data.id}</span>
                            </div>
                            <div>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={status}
                                    onChange={handleChange}
                                >
                                    {statusdata.map(dats => (<MenuItem value={dats.id}>{dats.type}</MenuItem>))}
                                </Select>
                                <Button color="primary" onClick={() => appendstatus(data.id)}>Set Status</Button>
                            </div>
                        </div>
                    ))}
                </div> : <></>}</div>
            </div> : <div className={classes.root}>
                    <CssBaseline />
                    <AppBar
                        position="fixed"
                        className={clsx(classes.appBar, {
                            [classes.appBarShift]: open,
                        })}
                        style={{ backgroundColor: '#e3714d' }}
                    >
                        <Toolbar>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={handleDrawerOpen}
                                edge="start"
                                className={clsx(classes.menuButton, {
                                    [classes.hide]: open,
                                })}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography variant="h6" noWrap>
                                Swiggy
          </Typography>
                        </Toolbar>
                    </AppBar>
                    <Drawer
                        variant="permanent"
                        className={clsx(classes.drawer, {
                            [classes.drawerOpen]: open,
                            [classes.drawerClose]: !open,
                        })}
                        classes={{
                            paper: clsx({
                                [classes.drawerOpen]: open,
                                [classes.drawerClose]: !open,
                            }),
                        }}
                        style={{ backgroundColor: '#e3714d' }}
                    >
                        <div className={classes.toolbar}>
                            <AccountBoxIcon />{user.name}
                            <IconButton onClick={handleDrawerClose}>
                                {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                            </IconButton>
                        </div>
                        <Divider />
                        <List>

                            <ListItem button onClick={viewfoodsadmin} key='Order Food'>
                                <ListItemIcon><FastfoodIcon /></ListItemIcon>
                                <ListItemText primary='Order Food' />
                            </ListItem>
                            <ListItem button onClick={opencart} key='View Cart'>
                                <ListItemIcon><ShoppingCartIcon /></ListItemIcon>
                                <ListItemText primary='View Cart' />
                            </ListItem>
                            <ListItem button onClick={openorders} key='Orders/Status'>
                                <ListItemIcon><AllInboxIcon /></ListItemIcon>
                                <ListItemText primary='Orders/Status' />
                            </ListItem>

                        </List>
                        <Divider />
                        <List>

                            <ListItem button onClick={props.logout} key='Logout'>
                                <ListItemIcon><ExitToAppIcon /></ListItemIcon>
                                <ListItemText primary='Logout' />
                            </ListItem>
                        </List>
                    </Drawer>
                </div>}
            <div>{openorder ? <FoodList user={true} data={foodlist} cart={addtocartl} /> : <></>}</div>
            <div>{opencartdata ? <FoodList user={'cart'} data={cartarray} /> : <></>}</div>
            <div>{openorderdata ? <div className='page'>

                {orderarray.map(data => (
                    <div style={{
                        borderStyle: 'solid',
                        borderColor: 'coral',
                        width: '600px'
                    }}>
                        <h3>Orders</h3>
                        <div style={{ marginBottom: '40px' }}
                        > <InputLabel>Order ID</InputLabel>
                            <span>{data.id}</span>
                        </div>
                        <div>
                            <Slider style={{ width: '450px' }}
                                defaultValue={data.status}
                                getAriaValueText={valuetext}
                                aria-labelledby="discrete-slider-always"
                                step={1}
                                max={4}
                                min={0}
                                disabled={true}
                                marks={marks}
                                valueLabelDisplay="on"
                            />
                        </div>
                    </div>
                ))}
            </div> : <></>}</div>

        </div>

    </div >
    );
}
