import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Table from '../../admin/table/Table'

import productApi from '../../../api/admin/productApi'

const productTableHead = [
    '',
    'slug',
    'dongxe',
    'image',
    'slogan',
    'name',
    'description1',
    'description2',
    'description3',
    'description4',
    'action',
]

const renderHead = (item, index) => <th key={index}>{item}</th>

const renderBody = (item, index) => (
    <tr key={index}>
        <td>{item.id_xe}</td>
        <td>{item.slug}</td>
        <td>{item.dongxe}</td>
        <td style={{width: '12%'}}>
            <img src={item.image} alt="" />
        </td>
        <td>{item.slogan}</td>
        <td>{item.name}</td>
        <td>{item.description1}</td>
        <td>{item.description2}</td>
        <td>{item.description3}</td>
        <td>{item.description4}</td>
        <td>
            <Link to={`/admin/homeblock3/${item.id_xe}`}>
                <i className="fas fa-external-link"></i>
                <span className="action">Detail</span>
            </Link>
        </td>
    </tr>
)

const Products = () => {

    const [productsData, setProductsData] = useState([])
console.log(productsData)
    useEffect(() => {
        const getProductApi = async () => {
            try {
                const res = await productApi.getAllBlock3()
                setProductsData(res.data)
            } catch(err) {
                console.log(err)
            }
        }
        getProductApi()
    }, [])
    return (
        <>
            <h2 className="page-header page-header--product">
                <p>Block list</p>
                <Link to="/admin/homeblock3/new-block3">
                    <button className="productAddButton">Create</button>
                </Link>
            </h2>
            <div className="row">
                <div className="l-12">
                    <div className="card"> 
                        <div className="card__body">
                            <Table 
                                limit='3'
                                headData={productTableHead}
                                renderHead={(item, index) => renderHead(item, index)}
                                bodyData={productsData}
                                renderBody={(item, index) => renderBody(item, index)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Products
