import * as React from 'react';
import axios from 'axios';
import { RouteComponentProps, withRouter } from 'react-router-dom';


export interface IValues {
    first_name: string,
    last_name: string,
    email: string,
    phone: string,
    address: string,
    description: string,
}
export interface IFormState {
    [key: string]: any;
    values: IValues[];
    submitSuccess: boolean;
    loading: boolean;
}

class Create extends React.Component<RouteComponentProps, IFormState> {
    constructor(props: RouteComponentProps) {
        super(props);
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            phone: '',
            address: '',
            description: '',
            values: [],
            loading: false,
            submitSuccess: false,
        }
    }
    private processFormSubmission = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        this.setState({ loading: true });
        const formData = {
            Info: {
                Name: this.state.first_name,
                InvoiceAddress: {
                    AddressLine1: this.state.address,
                },
                DefaultPhone: {
                    Description: 'Mobile',
                    Number: this.state.phone
                },
                DefaultEmail: {
                    EmailAddress: this.state.email
                },

            },
            Comment: this.state.description
        }
        this.setState({ submitSuccess: true, loading: false });
        let url = "https://test-api.softrig.com:443/api/biz/contacts";

        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjMyQzFGNTBFMDRFMzY2Q0Y3MDU3ODMzNTczOEYzMzJEODU2N0VEMTMiLCJ0eXAiOiJKV1QiLCJ4NXQiOiJNc0gxRGdUalpzOXdWNE0xYzQ4ekxZVm43Uk0ifQ.eyJuYmYiOjE2MDU5NTY2NTcsImV4cCI6MTYwNjA0MzA1NywiaXNzIjoiaHR0cHM6Ly90ZXN0LWxvZ2luLnNvZnRyaWcuY29tIiwiYXVkIjpbImh0dHBzOi8vdGVzdC1sb2dpbi5zb2Z0cmlnLmNvbS9yZXNvdXJjZXMiLCJBcHBGcmFtZXdvcmsiXSwiY2xpZW50X2lkIjoiQXBwRnJhbWV3b3JrQ2xpZW50Iiwic3ViIjoiOTg2NTIxOTgtMGNkOS00ZTgwLWFjMzMtN2Y2ZmUxYjIzYzE5IiwiYXV0aF90aW1lIjoxNjA1OTU2NjU3LCJpZHAiOiJsb2NhbCIsInNjb3BlIjpbIkFwcEZyYW1ld29yayIsInByb2ZpbGUiLCJvcGVuaWQiLCJlbWFpbCJdLCJhbXIiOlsicHdkIl19.qqqcE_gRaD3igL6D2EgC9kEy2Rt-6nTfzcYjSq7vjliKmp3OW9Z1bpw0I2CIhwY0f0TiWIH7QK8Q-7A1GgDkRcC0Bj0cMRlAyJt-dIHDmlYDsDYRqqb8HbbmF8zs2DzaW1Ze_eLQQJFx61dewZAdBT_opIUXKpzIrVuOtYS5MbFU4khe3b-i_Ab6x79vfL-FbNXBU-uYOucpVP4a56y0qUzI2SBlYYxrkpITq6-xwVRWBm6rtp2LTwK6EVZGeIHXKx-wgDXOYeFleel8k24NU6gTfiQRIA0gqZuYazhKv91lhjHT6LjUKRU4e_ZGZY5J_lXYQSb6W9DCnFM6Qh_kfA',
                'CompanyKey': '40c2528d-ede4-446e-9294-2f0664304962'
            }
        };
        axios.post(url, formData, config).then((result) => {
            this.props.history.push('/');
        }).catch(error => {
        });
    }

    private handleInputChanges = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        this.setState({
            [e.currentTarget.name]: e.currentTarget.value,
        })
    }
    public render() {
        const { submitSuccess, loading } = this.state;
        return (
            <div>
                <div className={"col-md-12 form-wrapper"}>
                    <h2> Create Customer Contact </h2>
                    {!submitSuccess && (
                        <div className="alert alert-info" role="alert">
                            Fill the form below to create a new post
                        </div>
                    )}
                    {submitSuccess && (
                        <div className="alert alert-info" role="alert">
                            The form was successfully submitted!
                        </div>
                    )}
                    <form id={"create-post-form"} onSubmit={this.processFormSubmission} noValidate={true}>
                        <div className="form-group col-md-12">
                            <label htmlFor="first_name"> First Name </label>
                            <input type="text" id="first_name" onChange={(e) => this.handleInputChanges(e)} name="first_name" value={this.state.first_name} className="form-control" placeholder="Enter customer's first name" />
                        </div>

                        <div className="form-group col-md-12">
                            <label htmlFor="email"> Email </label>
                            <input type="email" id="email" onChange={(e) => this.handleInputChanges(e)} name="email" className="form-control" placeholder="Enter customer's email address" />
                        </div>
                        <div className="form-group col-md-12">
                            <label htmlFor="phone"> Phone </label>
                            <input type="text" id="phone" onChange={(e) => this.handleInputChanges(e)} name="phone" className="form-control" placeholder="Enter customer's phone number" />
                        </div>
                        <div className="form-group col-md-12">
                            <label htmlFor="address"> Address </label>
                            <input type="text" id="address" onChange={(e) => this.handleInputChanges(e)} name="address" className="form-control" placeholder="Enter customer's address" />
                        </div>
                        <div className="form-group col-md-12">
                            <label htmlFor="description"> Description </label>
                            <input type="text" id="description" onChange={(e) => this.handleInputChanges(e)} name="description" className="form-control" placeholder="Enter Description" />
                        </div>
                        <div className="form-group col-md-4 pull-right">
                            <button className="btn btn-success" type="submit">
                                Create Customer Contact
                        </button>
                            {loading &&
                                <span className="fa fa-circle-o-notch fa-spin" />
                            }
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
export default withRouter(Create)
