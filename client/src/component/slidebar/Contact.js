import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isAuth } from '../../helpers';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { ToastsStore,ToastsContainerPosition,ToastsContainer } from 'react-toasts';
class Contact extends Component {
    constructor(props, context) {
        super(props, context);
        this.state={
            allContact:[],
            allUser : [],
            newArr:[]
        }
    }
    render() {
        if(!isAuth()){
            return <Redirect to="/signin"></Redirect>
        }
        return (
            <div className="tab-pane active show" id="members">
                <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.TOP_RIGHT}/>
                         <div className="search">
                         <form className="form-inline position-relative">
                             <input type="search" className="form-control" id="people" placeholder="Search for people..." />
                             <button type="button" className="btn btn-link loop"><i className="material-icons">search</i></button>
                         </form>
                         </div>      
                         <div className="contacts">
                         <h1>All user</h1>
                         <div className="list-group" id="contacts" role="tablist">
                          
                            {
                                this.state.allContact.map((value,key)=>{
                                    if(value._id!== JSON.parse(localStorage.getItem('id'))){
                                        return(
                                            <div>
                                            <a className="filterMembers fill all online contact" data-id={value._id} key={key+1}>
                                            <img className="avatar-md" src={value.avatar} data-toggle="tooltip" data-placement="top" title="Janette" alt="avatar" />
                                            <div className="status">
                                                <i className="material-icons online">fiber_manual_record</i>
                                            </div>
                                            <div className="data">
                                            <h5>{value.name}</h5>
                                            </div>
                                            <div className="person-add">
													<i key={key} onClick={(event)=>this.addFriend(event,value._id,key)} className="material-icons add-friend" >person_add</i>
												</div>
                                            </a>
                                            </div>
                                        )
                                    }else return null   
                                }
                                )
                            }
  
                         </div>
                         </div>
                     </div>
        );
    }
    addFriend = (event, idContact,key)=>{
        let arr =  this.state.allContact
        axios({
            method:"POST",
            baseURL: "http://localhost:4000",
url:"/contact/add-contact",
            data:{userId: JSON.parse(localStorage.getItem('id')),contactId:idContact}
        })
        .then(res=>{
            arr.splice(key,1)
            this.setState({
                allContact : arr
            })
            ToastsStore.success("Đã thêm bạn thành công")
        })
        .catch(err=>{
            console.log("sadsad");
        })
    }
    UNSAFE_componentWillMount() {
        axios({
            method:'POST',
            baseURL: "http://localhost:4000",
url:"/contact/get-all-contact",
            data: {userId : JSON.parse(localStorage.getItem('id'))}
        })
            .then(res=>{
                let newArr =  res.data.allUser
                res.data.allUser.forEach((value,key)=>{
                    res.data.allContact.forEach((element,index)=>{
                        if(value._id===element._id){
                            newArr.splice(key,1)
                        }
                    })
                })
                this.setState({
                    allContact:newArr
                })
            })
            .catch(err=>{
                console.log(err);
            })
    }   
    
}
const mapStateToProps = (state, ownProps) => {
    return {
        info:state.info
    }
}
export default connect(mapStateToProps)(Contact)
