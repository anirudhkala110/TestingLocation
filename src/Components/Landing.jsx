import React, { useState } from 'react'


const tasks = [
    {
        id: 1,
        product: "Redmi 6",
        name: "Adam",
        phone: "7845785489",
        address: "114, B Falgun Street, Aazamghar, Delhi",
    },
    {
        id: 2,
        product: "Oppo",
        name: "Ratan",
        phone: "7845785489",
        address: "11, B Falgun Street, Aazamghar, Delhi",
    },
    {
        id: 3,
        product: "Oppo",
        name: "Ratan",
        phone: "7845785489",
        address: "11, B Falgun Street, Aazamghar, Delhi",
    },
    {
        id: 4,
        product: "Samsung Galaxy",
        name: "Sita",
        phone: "9856741230",
        address: "22, C Patel Nagar, Mumbai, Maharashtra",
    },
    {
        id: 5,
        product: "iPhone X",
        name: "Rahul",
        phone: "7845123654",
        address: "45, D Nehru Street, Chennai, Tamil Nadu",
    },
    {
        id: 6,
        product: "Vivo V9",
        name: "Priya",
        phone: "7845963210",
        address: "78, E Gandhi Road, Bangalore, Karnataka",
    },
    {
        id: 7,
        product: "OnePlus 6",
        name: "Mohit",
        phone: "7896543210",
        address: "89, F Indira Nagar, Hyderabad, Telangana",
    },
    {
        id: 8,
        product: "Nokia 6.1",
        name: "Aisha",
        phone: "7894561230",
        address: "99, G Malviya Nagar, Jaipur, Rajasthan",
    },
    {
        id: 9,
        product: "Moto G6",
        name: "Ankit",
        phone: "7896541237",
        address: "101, H Sarojini Nagar, Lucknow, Uttar Pradesh",
    },
    {
        id: 10,
        product: "Sony Xperia",
        name: "Rohit",
        phone: "9874563210",
        address: "110, I CP Colony, Pune, Maharashtra",
    }
];


const Landing = () => {
    const [rejected, setRejected] = useState(false)
    const handleStatus = (data, id) => {
        if (window.confirm(`Are you sure that item is ${data == 1 ? 'Delivered' : 'Rejected'} for user ${id}`)) {
            alert("Data Sent")
        }
    }
    return (
        <div>
            <button className='btn btn-primary rounded-0 me-2 my-2'>Today's Task</button>
            <button className='btn btn-primary rounded-0 me-2 my-2'>Today's Task</button>
            <div className='table-responsive table-sm-responsive table-md-responsive'>
                <table className='table-stripped table'>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Item</th>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Address</th>
                            <th>Delivered</th>
                            <th colSpan={3}>If Not Delivered Reason</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            tasks.map((data, idx) => (
                                <tr>
                                    <td>{parseInt(idx) + 1}</td>
                                    <td>{data.product}</td>
                                    <td>{data.name}</td>
                                    <td>{data.phone}</td>
                                    <td>{data.address}</td>
                                    <td>
                                        <button className='btn btn-success m-1' onClick={e => handleStatus(1, data.id)}>Yes</button>
                                        <button className='btn btn-danger m-1' onClick={e => handleStatus(0, data.id)}>No</button>
                                    </td>
                                    <td>
                                        <textarea className='form-control' placeholder='Rejection Reason' data-toggle="tooltip" data-placement="left" title="Write the reason for rejection..." cols={20} rows={1}></textarea>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Landing