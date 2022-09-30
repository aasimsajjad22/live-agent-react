import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getBusinesses } from '../../actions/business';

import 'jquery/dist/jquery.min.js';
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery'; 

const Home = ({ getBusinesses, businesses }) => {

    useEffect(() => {
        getBusinesses();
    }, [getBusinesses]);

    const onEditClick = (u) =>  {
        //setFormData(u)
    }

    if (businesses && businesses.length > 0) {
        setTimeout(function() {
            $('#businessTable').DataTable();
        }, 100)
    }

    return (
    <Fragment>
        <section className="content-header">
            <div className="container-fluid">
                <div className="row mb-2">
                <div className="col-sm-6">
                    <h1>Manage Business</h1>
                </div>
                <div className="col-sm-6">
                </div>
                </div>
            </div>
            </section>

            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                            
                            <div className="card-body">
                                <table id="businessTable" className="table table-bordered table-hover">
                                    <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Logo</th>
                                        <th>Tag Line</th>
                                        <th>Business Type</th>
                                        <th>Website</th>
                                        <th>Owner Name</th>
                                        <th>Owner Email</th>
                                        <th>Action</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                        {businesses && businesses.map((business) => (
                                            <tr key={business.id}>
                                                <td>{business.name}</td>
                                                <td><img src={`https://live-agent-public-assets.s3.us-east-2.amazonaws.com/users/avatars/${business.logo}`} width="50px" height="50px" style={{borderRadius:'50%'}} /></td>
                                                <td>{business.tag_line}</td>
                                                <td>{business.business_type}</td>
                                                <td>{business.website}</td>
                                                <td>{business.first_name}</td>
                                                <td>{business.email}</td>
                                                <td width="15%">
                                                    <button className='btn btn-info'>View</button> &nbsp;
                                                    <button className='btn btn-default' data-toggle="modal" data-target="#editUserModal" onClick={() => onEditClick(business)}>Edit</button> &nbsp;
                                                    <button className='btn btn-danger'>Delete</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
        </section>
        
    </Fragment>
    
  );
};


Home.propTypes = {
    getBusinesses: PropTypes.func.isRequired
    
};

const mapStateToProps = (state) => ({
    businesses: state.business.businesses,
});


export default connect(mapStateToProps, { getBusinesses })(Home);
