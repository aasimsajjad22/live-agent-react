import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getAgents } from '../../actions/agent';

import 'jquery/dist/jquery.min.js';
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery'; 

const Home = ({ getAgents, agents}) => {

    useEffect(() => {
        getAgents();
    }, [getAgents]);

    const onEditClick = (u) =>  {
        //setFormData(u)
    }

    if (agents && agents.length > 0) {
        console.log(agents)
        setTimeout(function() {
            $('#agentTable').DataTable();
        }, 100)
    }

  return (
    <Fragment>
        <section className="content-header">
            <div className="container-fluid">
                <div className="row mb-2">
                <div className="col-sm-6">
                    <h1>Manage Agents</h1>
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
                                <table id="agentTable" className="table table-bordered table-hover">
                                    <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Image</th>
                                        <th>Balance</th>
                                        <th>Rate</th>
                                        <th>Availibility</th>
                                        <th>Level</th>                                
                                        <th>Action</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                        {agents && agents.map((agent) => (
                                            <tr key={agent.agent.id}>
                                                <td>{agent.user.first_name}</td>
                                                <td>{agent.user.email}</td>
                                                <td>{agent.user.avatar}</td>
                                                <td>{agent.agent.balance}</td>
                                                <td>{agent.agent.rate}</td>
                                                <td>{agent.agent.availability}</td>
                                                <td>{agent.agent.level}</td>
                                                <td width="15%">
                                                    <button className='btn btn-info'>View</button> &nbsp;
                                                    <button className='btn btn-default' data-toggle="modal" data-target="#editUserModal" onClick={() => onEditClick(agent)}>Edit</button> &nbsp;
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
    getAgents: PropTypes.func.isRequired
    
};

const mapStateToProps = (state) => ({
    agents: state.agent.agents,
});


export default connect(mapStateToProps, { getAgents })(Home);
