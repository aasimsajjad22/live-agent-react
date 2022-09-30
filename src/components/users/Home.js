import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { getUsers, updateUser, getAgentProfile, getBusinessProfile } from '../../actions/user';
import PropTypes from 'prop-types';

import 'jquery/dist/jquery.min.js';
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery'; 


const initialState = {
    email: '',
    first_name: '',
    last_name: '',
    user_type: '',
    phone: '',
    is_active: '',
    address: '',
    id: '',
}

const Home = ({getUsers, users, user, updateUser, getAgentProfile, getBusinessProfile, loading}) => {

    const [formData, setFormData] = useState(initialState);

    useEffect(() => {
        getUsers();
    }, [getUsers]);

    //console.log(users);

    if (users && users.length > 0) {
        setTimeout(function() {
            $('#usersTable').DataTable();
        }, 100)
    }

    const onEditClick = (u) =>  {
        setFormData(u)
    }

    const onViewClick = (u) => {
        if(u.user_type == "agent") {
            getAgentProfile(u.id);
        } else if(u.user_type == "business") {
            getBusinessProfile(u.id);
        }
        
    }


    const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value }); 

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(formData)
        updateUser(formData);
      };

    const {
        email,
        first_name,
        last_name,
        user_type,
        phone,
        is_active,
        address
      } = formData;


    return (
        <Fragment>
                       
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                    <div className="col-sm-6">
                        <h1>Manage Users</h1>
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
                                    <table id="usersTable" className="table table-bordered table-hover">
                                        <thead>
                                        <tr>
                                            <th>Email</th>
                                            <th>Full Name</th>
                                            <th>Avatar</th>
                                            <th>User Type</th>
                                            <th>Address</th>
                                            <th>Country</th>
                                            <th>Phone</th>
                                            <th>IsActive</th>
                                            <th>Action</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                            {users && users.map((user) => (
                                                <tr key={user.id}>
                                                    <td>{user.email}</td>
                                                    <td>{user.first_name} {user.last_name}</td>
                                                    <td><img src={`https://live-agent-public-assets.s3.us-east-2.amazonaws.com/users/avatars/${user.avatar}`} width="50px" height="50px" style={{borderRadius:'50%'}} /></td>
                                                    <td>{user.user_type}</td>
                                                    <td>{user.address}</td>
                                                    <td>{user.country}</td>
                                                    <td>{user.phone}</td>
                                                    <td>{(user.is_active) ? 'Yes' : 'No'}</td>
                                                    <td>
                                                        <button className='btn btn-info' data-toggle="modal" data-target="#viewUserModal" onClick={() => onViewClick(user)}>View</button> &nbsp;
                                                        <button className='btn btn-default' data-toggle="modal" data-target="#editUserModal" onClick={() => onEditClick(user)}>Edit</button> &nbsp;
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
            <div class="modal fade" id="editUserModal">
                <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                    <h4 class="modal-title">Edit User</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    </div>
                    
                    <form className="form" onSubmit={onSubmit}>
                        <div class="modal-body">
                        
                            <div class="form-group">
                                <label for="emailCtrl">Email address</label>
                                <input 
                                    type="email" 
                                    class="form-control" 
                                    name="email" 
                                    id='emailCtrl'
                                    placeholder="Enter email" 
                                    value={email}
                                    disabled />
                            </div>
                            <div class="form-group">
                                <label for="first_name_ctrl">First Name</label>
                                <input 
                                    type="text" 
                                    class="form-control" 
                                    name="first_name" 
                                    id='first_name_ctrl'
                                    placeholder="First Name" 
                                    value={first_name}
                                    onChange={onChange} />
                            </div>
                            
                            <div class="form-group">
                                <label for="last_name_ctrl">Last Name</label>
                                <input 
                                    type="text" 
                                    class="form-control" 
                                    name="last_name" 
                                    id='last_name_ctrl'
                                    placeholder="Last Name" 
                                    value={last_name}
                                    onChange={onChange} />
                            </div>

                            <div class="form-group">
                                <label for="user_type_ctrl">User Type</label>
                                <input 
                                    type="text" 
                                    class="form-control" 
                                    name="user_type" 
                                    id='user_type_ctrl'
                                    placeholder="User Type" 
                                    value={user_type}
                                    disabled />
                            </div>

                            <div class="form-group">
                                <label for="phone_ctrl">Phone</label>
                                <input 
                                    type="text" 
                                    class="form-control" 
                                    name="phone" 
                                    id='phone_ctrl'
                                    placeholder="Phone no" 
                                    value={phone}
                                    onChange={onChange} />
                            </div>

                            <div class="form-group">
                                <label for="phone_ctrl">User Status</label>
                                <select class="form-control" name="is_active" value={is_active} onChange={onChange}>
                                    <option value="0">Inactive</option>
                                    <option value="1">Active</option>
                                    <option value="2">Banned</option>
                                </select>
                            </div>

                            <div class="form-group">
                                <label for="address_ctrl">Address</label>
                                <input 
                                    type="text" 
                                    class="form-control" 
                                    name="address" 
                                    id='address_ctrl'
                                    placeholder="Address" 
                                    value={address}
                                    onChange={onChange} />
                            </div>
                            
                            
                        </div>
                        <div class="modal-footer justify-content-between">
                            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                            <button type="submit" class="btn btn-primary">Save changes</button>
                        </div>
                    </form>
                    </div>
                </div>
                
            </div>
 

            {/* AGENT INFO SECTION */}
            <div class="modal fade" id="viewUserModal">
                <div class="modal-dialog modal-xl">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title">User's Information</h4>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <div className="card">
                                
                                <div className="card-body">
                                    { (!loading && user && Object.hasOwn(user, 'agent') ) && (
                                        <Fragment>
                                        <h5 className='mb-4 alert alert-primary'>User</h5>
                                        <table className="table table-bordered table-hover">
                                            <tr>
                                                <th>First Name</th><td>{user.user.first_name}</td>
                                                <th>Last Name</th><td>{user.user.last_name}</td>
                                            </tr>
                                            <tr>
                                                <th>Email</th><td>{user.user.email}</td>
                                                <th>Bio</th><td>{user.user.bio}</td>
                                            </tr>
                                            <tr>
                                                <th>Country</th><td>{user.user.country}</td>
                                                <th>City</th><td>{user.user.city}</td>
                                            </tr>
                                            <tr>
                                                <th>State</th><td>{user.user.state}</td>
                                                <th>Zip</th><td>{user.user.zip_code}</td>
                                            </tr>
                                            <tr>
                                                <th>Address</th><td colSpan={3}>{user.user.address}</td>
                                            </tr>
                                            <tr>
                                                <th>Phone</th><td>{user.user.phone}</td>
                                                <th>Apt Suite</th><td>{user.user.apt_suite}</td>
                                            </tr>
                                            <tr>
                                                <th>Status</th><td>{(user.user.is_active == 1) ? 'Active' : 'In Active'}</td>
                                                <th>Date of Birth</th><td>{user.user.dob}</td>
                                            </tr>
                                            
                                        </table>
                                        <h5 className='mt-4 mb-4 alert alert-primary'>Agent</h5>
                                        <table  className="table table-bordered table-hover">
                                            <tr>
                                                <th>Availibility</th><td>{(user.agent.availability == true) ? 'Yess' : 'No'}</td>
                                                <th>Balance</th><td>{user.agent.balance}</td>
                                            </tr>
                                            <tr>
                                                <th>Rate</th><td>{ user.agent.rate }</td>
                                                <th>Level</th><td>{user.level.name}</td>
                                            </tr>
                                        

                                        </table>
                                        { (Object.hasOwn(user, 'education') ) && (
                                            <Fragment>
                                                <h5 className='mt-4 mb-4 alert alert-primary'>Education</h5>
                                                {user.education && user.education.map((edu) => (
                                                    
                                                <div key={edu.id}>
                                                    <h5 className='text-center mt-4 mb-4'>( { edu.degree_name } ) - Grade { edu.grade }</h5>

                                                    <table  className="table table-bordered table-hover">
                                                        <tr>
                                                            <th>School Name</th><td>{edu.school_name}</td>
                                                            <th>Field</th><td>{edu.field_name}</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Degree Name</th><td>{edu.degree_name}</td>
                                                            <th>Description</th><td>{edu.description}</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Start Year</th><td>{edu.start}</td>
                                                            <th>End Year</th><td>{edu.end}</td>
                                                        </tr>
                                                    

                                                    </table>
                                                </div>
                                                ))}
                                            </Fragment>
                                        )}

                                        { (Object.hasOwn(user, 'employment_history') ) && (
                                            <Fragment>
                                                <h5 className='mt-4 mb-4 alert alert-primary'>Employment Hitsory</h5>
                                                { user.employment_history && user.employment_history.map((emp) => (
                                                    
                                                <div key={emp.id}>
                                                    <h5 className='text-center mt-4 mb-4'>( { emp.title } ) - Grade { emp.company_name }</h5>

                                                    <table  className="table table-bordered table-hover">
                                                        <tr>
                                                            <th>Company Name</th><td>{emp.company_name}</td>
                                                            <th>Description</th><td>{emp.description}</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Start Date</th><td>{emp.start_date}</td>
                                                            <th>End Date</th><td>{emp.end_date}</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Address</th><td>{emp.address}</td>
                                                            <th>Industry</th><td>{emp.industry_name}</td>
                                                        </tr>
                                                    

                                                    </table>
                                                </div>
                                                ))}
                                            </Fragment>
                                        )}
                                        { (Object.hasOwn(user, 'languages') ) && (
                                            <Fragment>
                                                <h5 className='mt-4 mb-4 alert alert-primary'>Languages</h5>
                                                { user.languages && user.languages.map((lang) => (
                                                    
                                                <div key={lang.id}>
                                                    <h5 className='text-center mt-4 mb-4'>{ lang.name }</h5>

                                                    <table  className="table table-bordered table-hover">
                                                        <tr>
                                                            <th>Proficiency</th><td>{lang.proficiency}</td>
                                                            <th>Description</th><td>{lang.proficiency_description}</td>
                                                        </tr>
                                                    </table>
                                                </div>
                                                ))}
                                                { user.languages == null && (
                                                    <div className='alert alert-danger'>No Language record added</div>
                                                )}
                                            </Fragment>
                                        )}
                                        { (Object.hasOwn(user, 'timeslots') ) && (
                                            <Fragment>
                                                <h5 className='mt-4 mb-4 alert alert-primary'>TimeSlots</h5>
                                                
                                                { user.timeslots && Object.keys(user.timeslots).map((key, index)  => (
                                                    
                                                    <div key={user.timeslots[key][0].day}>
                                                        <h5 className='text-center mt-4 mb-4'>{ user.timeslots[key][0].day }</h5>

                                                        { user.timeslots[key] && user.timeslots[key].map((slot) => (
                                                        
                                                            <table key={slot.start}  className="table table-bordered table-hover">
                                                                <tr>
                                                                    <th>Start Time</th><td>{moment.utc(slot.start).format('HH:mm:ss')}</td>
                                                                    <th>End Time</th><td>{moment.utc(slot.end).format('HH:mm:ss') }</td>
                                                                </tr>
                                                            </table>
                                                        
                                                        ))}
                                                    </div>
                                                ))}
                                                
                                            </Fragment>
                                        )}

                                        </Fragment>
                                    )}

                                    { (!loading && user && user.length > 0 ) && (
                                        <Fragment>
                                            <table className="table table-bordered table-hover">
                                                <tr>
                                                    <th>First Name</th><td>{user[0].user.first_name}</td>
                                                    <th>Last Name</th><td>{user[0].user.last_name}</td>
                                                </tr>
                                                <tr>
                                                    <th>Email</th><td>{user[0].user.email}</td>
                                                    <th>Bio</th><td>{user[0].user.bio}</td>
                                                </tr>
                                                <tr>
                                                    <th>Country</th><td>{user[0].user.country}</td>
                                                    <th>City</th><td>{user[0].user.city}</td>
                                                </tr>
                                                <tr>
                                                    <th>State</th><td>{user[0].user.state}</td>
                                                    <th>Zip</th><td>{user[0].user.zip_code}</td>
                                                </tr>
                                                <tr>
                                                    <th>Address</th><td colSpan={3}>{user[0].user.address}</td>
                                                </tr>
                                                <tr>
                                                    <th>Phone</th><td>{user[0].user.phone}</td>
                                                    <th>Apt Suite</th><td>{user[0].user.apt_suite}</td>
                                                </tr>
                                                <tr>
                                                    <th>Status</th><td>{(user[0].user.is_active == 1) ? 'Active' : 'In Active'}</td>
                                                    <th>Date of Birth</th><td>{user[0].user.dob}</td>
                                                </tr>
                                                
                                            </table>
                                            {user && user.map((bus) => (

                                                <div key={bus.business.id}>
                                                    <h5 className='mt-4 mb-4 alert alert-primary'>Business : {bus.business.name}</h5>
                                            
                                                    <h5 className='text-center mt-4 mb-4'>{ bus.business.name } </h5>
                                                    <p style={{fontWeight: 'bold' }}>Description: {bus.business.description}</p>

                                                    <table  className="table table-bordered table-hover">
                                                        <tr>
                                                            <th>Business Type</th><td>{bus.business.business_type}</td>
                                                            <th>Website</th><td>{bus.business.website}</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Tag Line</th><td>{bus.business.tag_line}</td>
                                                            <th>Office Location</th><td>{bus.business.office_locations}</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Address</th><td>{bus.business.street_address}</td>
                                                            <th>Postal Code</th><td>{bus.business.postal_code}</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Company Size</th><td>{bus.business.company_size}</td>
                                                            <th>Founded</th><td>{bus.business.founded}</td>
                                                        </tr>
                                                    

                                                    </table>

                                                    <h5 className='mt-4 mb-4 alert alert-primary'>TimeSlots</h5>
                                                    { bus.timeslots && Object.keys(bus.timeslots).map((key, index)  => (
                                                        
                                                        <div key={bus.timeslots[key][0].day}>
                                                            <h5 className='text-center mt-4 mb-4'>{ bus.timeslots[key][0].day }</h5>

                                                            { bus.timeslots[key] && bus.timeslots[key].map((slot) => (
                                                            
                                                                <table key={slot.start}  className="table table-bordered table-hover">
                                                                    <tr>
                                                                        <th>Start Time</th><td>{moment.utc(slot.start).format('HH:mm:ss')}</td>
                                                                        <th>End Time</th><td>{moment.utc(slot.end).format('HH:mm:ss') }</td>
                                                                    </tr>
                                                                </table>
                                                            
                                                            ))}
                                                           
                                                        </div>
                                                    ))}
                                                    { Object.keys(bus.timeslots).length === 0 && (
                                                        <div className='alert alert-danger'>No Timeslots added</div>
                                                    )}


                                                    <h5 className='mt-4 mb-4 alert alert-primary'>Teams</h5>
                                                    { bus.teams && bus.teams.map(team  => (
                                                        
                                                        <div key={team.id}>
                                                            <h5 className='text-center mt-4 mb-4'>{ team.name }</h5>
                                                        
                                                            <table key={team.id}  className="table table-bordered table-hover">
                                                                <tr>
                                                                    <th>Team Name</th><td>{team.name}</td>
                                                                    <th>Description</th><td>{ team.description}</td>
                                                                </tr>
                                                                <tr>
                                                                    <th>Is Hiring</th><td>{team.is_hiring}</td>
                                                                    <th>Created At</th><td>{team.created_at}</td>
                                                                </tr>
                                                            </table>
                                                        
                                                        
                                                           
                                                        </div>
                                                    ))}
                                                    { bus.teams.length === 0 && (
                                                        <div className='alert alert-danger'>No Teams added</div>
                                                    )}
                                            </div>
                                            ))}    
                                        </Fragment>
                                    )}
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                </div>
            </div>
            
        </Fragment>
        
    );
};

Home.propTypes = {
    getUsers: PropTypes.func.isRequired,
    getAgentProfile: PropTypes.func.isRequired
    
};

const mapStateToProps = (state) => ({
    users: state.user.users,
    user: state.user.user,
    loading: state.user.loading
});

export default connect(mapStateToProps, { getUsers, updateUser, getAgentProfile, getBusinessProfile })(Home);
