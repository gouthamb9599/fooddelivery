import React from 'react';
import Button from '@material-ui/core/Button';
// import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Axios from 'axios';
import '../styles/foodlist.css';
import swal from 'sweetalert';
export default function FoodList(props) {
    const changeavail = (id, avs) => {
        console.log('hello', id, avs)
        Axios.post(`http://localhost:5000/changeav`, { user: id, av: avs })
            .then(res => {
                console.log(res);
                if (res.data.success === true) {
                    swal('Food availability changed successfully', 'check food list', 'success')
                    // const elementsIndex = props.data.findIndex(element => element.id == id)
                    // let newArray = [...props.data]
                    // newArray[elementsIndex] = { ...newArray[elementsIndex], availablity: !newArray[elementsIndex].availablity }
                }
            })
    }
    const ordernow = (id) => {
        const user = JSON.parse(sessionStorage.getItem('userData'))
        Axios.post(`http://localhost:5000/addorder`, { food: id, user: user.id })
            .then(res => {
                if (res.data.success === true) {
                    swal('food order accepted', `your order id is ${res.data.data}`, 'success')
                }
            })
    }

    return (
        <div>
            <div>
                {(props.user === true) ?
                    <div className="page">{props.data.map(data => (
                        <div className='ater' key={data.id}>
                            <div className='componentsetup'>
                                <h3 style={{ textTransform: 'uppercase' }}>{data.food}</h3>
                                <InputLabel>Ingredients</InputLabel>
                                <InputLabel>{data.ingredients}</InputLabel>
                            </div>
                            <Button variant="contained" color='primary' className='setupbtn' onClick={() => props.cart(data)}>Add To Cart</Button>
                            <Button variant="contained" color='primary' className='setupbtn' onClick={() => ordernow(data.id)}>Order Now</Button>
                        </div>))}</div>
                    : <div>{(props.user === 'cart') ?
                        <div className="page">
                            {props.data.map(data => (
                                <div className='ater' key={data.id}>
                                    <div className='componentsetup'>
                                        <h3 style={{ textTransform: 'uppercase' }}>{data.food}</h3>
                                        <InputLabel>Ingredients</InputLabel>
                                        <InputLabel>{data.ingredients}</InputLabel>
                                    </div>
                                    <Button variant="contained" color='primary' className='setupbtn' onClick={() => ordernow(data.id)}>Order Now</Button>
                                </div>))}
                        </div> :
                        <div className="pages">
                            {props.data.map(data => (
                                <div className='ater' key={data.id}>
                                    <div className='componentsetup'>
                                        <h3 style={{ textTransform: 'uppercase' }}>{data.food}</h3>
                                        <InputLabel>Ingredients</InputLabel>
                                        <InputLabel>{data.ingredients}</InputLabel>
                                        <span>Availiblity:</span>{(data.availablity === true) ? <InputLabel>Available</InputLabel> : <InputLabel>Not Available</InputLabel>}</div>
                                    <Button variant="contained" color='primary' className='setupbtn' onClick={() => changeavail(data.id, data.availablity)}>Change Availiblity</Button>
                                </div>))} </div>

                    }</div>
                }</div>
        </div>)

}