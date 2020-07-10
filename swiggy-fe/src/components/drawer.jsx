import React from 'react';
import clsx from 'clsx';
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

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
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

export default function MiniDrawer(props) {
    const classes = useStyles();
    const theme = useTheme();
    const user = JSON.parse(sessionStorage.getItem('userData'))
    const [open, setOpen] = React.useState(false);
    const [opentype, setOpentype] = React.useState(false);
    const [openfoods, setOpenfoods] = React.useState(false);
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    const Opentypeset = () => {
        setOpentype(!opentype);
    }
    const Openfood = () => {
        setOpenfoods(!openfoods);
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

                        <ListItem button key='View Orders'>
                            <ListItemIcon>< ListAltIcon /></ListItemIcon>
                            <ListItemText primary='View Orders' />
                        </ListItem>
                        <ListItem button key='View Categories'>
                            <ListItemIcon><KitchenIcon /></ListItemIcon>
                            <ListItemText primary='View Categories' />
                        </ListItem>
                        <ListItem button key='View Food Details'>
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
                <div>{openfoods ? <Foodtype foodtype={false} open={true} /> : <></>}
                </div>
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
                            <AccountBoxIcon />{user.Name}
                            <IconButton onClick={handleDrawerClose}>
                                {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                            </IconButton>
                        </div>
                        <Divider />
                        <List>

                            <ListItem button key='Order Food'>
                                <ListItemIcon><FastfoodIcon /></ListItemIcon>
                                <ListItemText primary='Order Food' />
                            </ListItem>
                            <ListItem button key='View Cart'>
                                <ListItemIcon><ShoppingCartIcon /></ListItemIcon>
                                <ListItemText primary='View Cart' />
                            </ListItem>
                            <ListItem button key='Delivery Status'>
                                <ListItemIcon><AllInboxIcon /></ListItemIcon>
                                <ListItemText primary='Delivery Status' />
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
        </div>

    </div>
    );
}
