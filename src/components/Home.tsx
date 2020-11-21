import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import axios from 'axios';
import {login, logout,log} from '../authconfig';
interface IState {
    customers: any[];
}

export default class Home extends React.Component<RouteComponentProps, IState> {
    constructor(props: RouteComponentProps) {
        super(props);
        this.state = { customers: [] }
    }
    public componentDidMount(): void {
        this.getContactsList();
    }
    public getContactsList() {
        let url = "https://test-api.softrig.com/api/biz/contacts?expand=Info,Info.InvoiceAddress,Info.DefaultPhone,Info.DefaultEmail,Info.DefaultAddress&hateoas=false&top=10        ";
        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjMyQzFGNTBFMDRFMzY2Q0Y3MDU3ODMzNTczOEYzMzJEODU2N0VEMTMiLCJ0eXAiOiJKV1QiLCJ4NXQiOiJNc0gxRGdUalpzOXdWNE0xYzQ4ekxZVm43Uk0ifQ.eyJuYmYiOjE2MDU5NTY2NTcsImV4cCI6MTYwNjA0MzA1NywiaXNzIjoiaHR0cHM6Ly90ZXN0LWxvZ2luLnNvZnRyaWcuY29tIiwiYXVkIjpbImh0dHBzOi8vdGVzdC1sb2dpbi5zb2Z0cmlnLmNvbS9yZXNvdXJjZXMiLCJBcHBGcmFtZXdvcmsiXSwiY2xpZW50X2lkIjoiQXBwRnJhbWV3b3JrQ2xpZW50Iiwic3ViIjoiOTg2NTIxOTgtMGNkOS00ZTgwLWFjMzMtN2Y2ZmUxYjIzYzE5IiwiYXV0aF90aW1lIjoxNjA1OTU2NjU3LCJpZHAiOiJsb2NhbCIsInNjb3BlIjpbIkFwcEZyYW1ld29yayIsInByb2ZpbGUiLCJvcGVuaWQiLCJlbWFpbCJdLCJhbXIiOlsicHdkIl19.qqqcE_gRaD3igL6D2EgC9kEy2Rt-6nTfzcYjSq7vjliKmp3OW9Z1bpw0I2CIhwY0f0TiWIH7QK8Q-7A1GgDkRcC0Bj0cMRlAyJt-dIHDmlYDsDYRqqb8HbbmF8zs2DzaW1Ze_eLQQJFx61dewZAdBT_opIUXKpzIrVuOtYS5MbFU4khe3b-i_Ab6x79vfL-FbNXBU-uYOucpVP4a56y0qUzI2SBlYYxrkpITq6-xwVRWBm6rtp2LTwK6EVZGeIHXKx-wgDXOYeFleel8k24NU6gTfiQRIA0gqZuYazhKv91lhjHT6LjUKRU4e_ZGZY5J_lXYQSb6W9DCnFM6Qh_kfA',
                'CompanyKey': '40c2528d-ede4-446e-9294-2f0664304962'
            }
        };
        axios.get(url, config).then((result) => {
            this.setState({ customers: result.data });
            console.log(result);
            console.log(result.data);
        }).catch(error => {
        });
    }

    public deleteCustomer(id: number) {
        if (window.confirm('Are you sure want to delete?')) {
            let url = "https://test-api.softrig.com/api/biz/contacts/" + id;
            const config = {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjMyQzFGNTBFMDRFMzY2Q0Y3MDU3ODMzNTczOEYzMzJEODU2N0VEMTMiLCJ0eXAiOiJKV1QiLCJ4NXQiOiJNc0gxRGdUalpzOXdWNE0xYzQ4ekxZVm43Uk0ifQ.eyJuYmYiOjE2MDU5Mzc5OTgsImV4cCI6MTYwNjAyNDM5OCwiaXNzIjoiaHR0cHM6Ly90ZXN0LWxvZ2luLnNvZnRyaWcuY29tIiwiYXVkIjpbImh0dHBzOi8vdGVzdC1sb2dpbi5zb2Z0cmlnLmNvbS9yZXNvdXJjZXMiLCJBcHBGcmFtZXdvcmsiXSwiY2xpZW50X2lkIjoiQXBwRnJhbWV3b3JrQ2xpZW50Iiwic3ViIjoiOTg2NTIxOTgtMGNkOS00ZTgwLWFjMzMtN2Y2ZmUxYjIzYzE5IiwiYXV0aF90aW1lIjoxNjA1OTM3OTk4LCJpZHAiOiJsb2NhbCIsInNjb3BlIjpbIkFwcEZyYW1ld29yayIsInByb2ZpbGUiLCJvcGVuaWQiLCJlbWFpbCJdLCJhbXIiOlsicHdkIl19.DZ3K_wRKF0mHse-Xo90OuDv36xjTaEX5miUcZAjRmMKBacARC3L7gi2FAi-sUpDmj6g3zeJMTadlwpBjj0eP4nF6f1FK-nZ5su5tkOflSli0WZw7cJ73sYZREKLmkUx1Vj2p5Tb5Q2tucXBHWxVS7bJtP3sY6AhiHiODZdqgrW_Ac84NsRX5qA_4hnCOYU-gVJa2fzNphWYIFEc7VXcaVaIr8BQTy-435RPUgvstKNqNN9D7qQTf5-Fyeb5OfVwambVEXW4YCvTVojj1XmAsMP5FTwt7gt0R4IAr0mpn2Tb-jkXPpvNzV5sie_TbrwxzXoC2s7P2HfBYrEBsFO0H5g',
                    'CompanyKey': '40c2528d-ede4-446e-9294-2f0664304962'
                }
            };
            axios.delete(url, config).then((result) => {
                setTimeout(() => {
                    this.getContactsList();
                }, 300)
            }).catch(error => {
            });
        }
    }
    public render() {
        const customers = this.state.customers;
        return (
            <div>
            <pre id="results"></pre>
            <button id="login" onClick={() => {login()}}>Login</button>
                <div className="container">
                    <div className="row">
                        <table className="table table-bordered">
                            <thead className="thead-light">
                                <tr>
                                    <th scope="col">Firstname</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Phone</th>
                                    <th scope="col">Address</th>
                                    <th scope="col">Description</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>

                                {
                                    (customers.length > 0) ?
                                        customers.map(customer =>
                                            <tr key={customer.InfoID}>
                                                <td>{customer.Info.Name}</td>
                                                <td>{customer.Info.DefaultEmail.EmailAddress}</td>
                                                <td>{customer.Info.DefaultPhone.Number}</td>
                                                <td>{customer.Info.InvoiceAddress.AddressLine1}</td>
                                                <td>{customer.Comment}</td>
                                                <td>
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <div className="btn-group" style={{ marginBottom: "20px" }}>
                                                            <Link to={`edit/${customer.ID}`} className="btn btn-sm btn-outline-secondary">Edit Customer </Link>
                                                            <button className="btn btn-sm btn-outline-secondary" onClick={() => this.deleteCustomer(customer.ID)} >Delete Customer</button>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        ) : <tr><td colSpan={6} style={{ 'textAlign': 'center' }} >No records found.</td></tr>
                                }

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}