import React from 'react';
import { observable, action, computed } from 'mobx';
import { reactLocalStorage } from 'reactjs-localstorage';
import axios from "axios";  


class TodoStore {
@observable profilepath='/profile/';
// @observable port='https://mmpdc.herokuapp.com/';
// @observable port='http://localhost:8080/';
// @observable port='http://192.241.154.210:8080/';
@observable port='http://mountmalarayatpdc.com:8080/';
@observable loading=false;
@observable ispassword=false;
@observable accountimage='';
@observable updateimage=false;
@observable profileimage='Choose File';
@observable isadding =false;
@observable whatpage =0;
@observable username='';
@observable password='';
@observable oldpassword='';
@observable loginstate=false;
@observable email ='';
@observable firstname ='';
@observable middlename =''; 
@observable lastname ='';
@observable addmodal =false;
@observable updatemodal =false;
@observable passwordmodal =false;
@observable updateid ='';
@observable removeid ='';
@observable search ='';
@observable filter ='All';
@observable display =10;
@observable page =1;
@observable block ='';
@observable lot ='';
@observable type ='';
@observable area ='';
@observable price ='';
@observable contactnumber ='';
@observable address ='';
@observable city ='';
@observable province ='';
@observable typename ='';
@observable equity ='';
@observable misc ='';
@observable description ='';
@observable schemename ='';
@observable schemepercentage ='';
@observable schemeyears =5;
@observable birthdate ='';
@observable salaryrange ='Select Salary Range';
@observable message ='';
@observable housemodel ='';
@observable lotarea ='';
@observable floorarea ='';
@observable bedroom ='';
@observable bathroom ='';
@observable tcp ='';
@observable listingimage ='';


@action setHouseModel = (e) => {
  this.housemodel=e.target.value;
}
@action setLotArea = (e) => {
  this.email=e.target.value;
}
@action setFloorArea = (e) => {
  this.email=e.target.value;
}
@action setBedroom = (e) => {
  this.email=e.target.value;
}
@action setBathroom = (e) => {
  this.email=e.target.value;
}
@action setTCP = (e) => {
  this.email=e.target.value;
}
@action setHouseModel2 = (value) => {
  this.housemodel=value;
}
@action setLotArea2 = (value) => {
  this.email=value;
}
@action setFloorArea2 = (value) => {
  this.email=value;
}
@action setBedroom2 = (value) => {
  this.email=value;
}
@action setBathroom2 = (value) => {
  this.email=value;
}
@action setTCP2 = (value) => {
  this.email=value;
}
@action setIsPassword = (value) => {
  this.ispassword=value;
}
@action setLoading = (value) => {
  this.loading=value;
}
@action setAdding = (value) => {
  this.isadding=value;
}
@action setPage = (value) => {
  this.whatpage=value;
}
@action setEmail = (e) => {
  this.email=e.target.value;
}
@action setEmail2 = (value) => {
  this.email=value;
}
@action setUsername = (e) => {
  this.username=e.target.value;
}
@action setPassword = (e) => {
  this.password=e.target.value;
}
@action setPassword2 = (value) => {
  this.password=value;
}
@action setOldPassword = (e) => {
  this.oldpassword=e.target.value;
}
@action setFirstname = (e) => {
  this.firstname=e.target.value;
}
@action setMiddlename = (e) => {
  this.middlename=e.target.value;
}
@action setLastname = (e) => {
  this.lastname=e.target.value;
}
@action setFirstname2 = (value) => {
  this.firstname=value;
}
@action setMiddlename2 = (value) => {
  this.middlename=value;
}
@action setLastname2 = (value) => {
  this.lastname=value;
}
@action setAddModal = (value) => {
  this.addmodal=value;
}
@action setUpdateModal = (value) => {
  this.updatemodal=value;
}
@action setUpdateId = (value) => {
  this.updateid=value;
}
@action setRemoveId = (value) => {
  this.removeid=value;
}
@action setSearch = (e) => {
  this.search=e.target.value;
}
@action setFilter = (value) => {
  this.filter=value;
}
@action setNumberDisplay = (value) => {
  this.display=value;
}
@action setPage = (value) => {
  this.page=value;
}
@action setBlock = (e) => {
  this.block=e.target.value;
}
@action setLot = (e) => {
  this.lot=e.target.value;
}
@action setType = (value) => {
  this.type=value;
}
@action setArea = (e) => {
  this.area=e.target.value;
}
@action setPrice = (e) => {
  this.price=e.target.value;
}
@action setBlock2 = (value) => {
  this.block=value;
}
@action setLot2 = (value) => {
  this.lot=value;
}
@action setType2 = (value) => {
  this.type=value;
}
@action setArea2 = (value) => {
  this.area=value;
}
@action setPrice2 = (value) => {
  this.price=value;
}
@action setContactNumber = (e) => {
  this.contactnumber=e.target.value;
  
}
@action setAddress = (e) => {
  this.address=e.target.value;
}
@action setCity = (e) => {
  this.city=e.target.value;
}
@action setProvince = (e) => {
  this.province=e.target.value;
}
@action setContactNumber2 = (value) => {
  this.contactnumber=value;
}
@action setAddress2 = (value) => {
  this.address=value;
}
@action setCity2 = (value) => {
  this.city=value;
}
@action setProvince2 = (value) => {
  this.province=value;
}
@action setTypename = (e) => {
  this.typename=e.target.value;
}
@action setEquity = (e) => {
  this.equity=e.target.value;
}
@action setMisc = (e) => {
  this.misc=e.target.value;
}
@action setDescription = (e) => {
  this.description=e.target.value;
}
@action setTypename2 = (value) => {
  this.typename=value;
}
@action setEquity2 = (value) => {
  this.equity=value;
}
@action setMisc2 = (value) => {
  this.misc=value;
}
@action setDescription2 = (value) => {
  this.description=value;
}
@action setSchemeName = (e) => {
  this.schemename=e.target.value;
}
@action setYears = (e) => {
  this.schemeyears=e.target.value;
}
@action setSchemePercentage = (e) => {
  this.schemepercentage=e.target.value;
}

@action setSchemeName2 = (value) => {
  this.schemename=value;
}
@action setYears2 = (value) => {
  this.schemeyears=value;
}
@action setSchemePercentage2 = (value) => {
  this.schemepercentage=value;
}
@action setAccountImage = (value) => {
  this.accountimage=value;
  if(this.accountimage === undefined){   
    this.updateimage = false;
  }else{
    this.updateimage = true;
  }
}
@action setProfileImage = (value) => {
  this.profileimage=value;
}
@action setBirthdate = (date, dateString) => {
  this.birthdate=dateString;
  
}

@action setHandleCancel = () => {
  this.addmodal=false;
  this.updatemodal=false;
  this.passwordmodal=false;
}
@action setFieldBlank = () => {
  this.firstname="";
  this.lastname="";
  this.middlename="";
  this.contactnumber="";
  this.address="";
  this.city="";
  this.province="";
}
@action setSalaryRange = (value) => {
  this.salaryrange=value;
  console.log(this.salaryrange);
}
@action setMessage = (e) => {
  this.message=e.target.value;
}
@action setPasswordModal = (value) => {
  this.passwordmodal=value;
}

// Computed


@computed get getIsPassword(){
  return this.ispassword;
}
@computed get getPasswordModal(){
  return this.passwordmodal;
}
@computed get getLoading(){
  return this.loading;
}
@computed get getAdding(){
  return this.isadding;
}
@computed get getUsername(){
  return this.username;
}
@computed get getPassword(){
  return this.password;
}
@computed get getOldPassword(){
  return this.oldpassword;
}
@computed get getEmail(){
  return this.email;
}
@computed get getFirstname(){
  return this.firstname;
}
@computed get getMiddlename(){
  return this.middlename;
}
@computed get getLastname(){
  return this.lastname;
}
@computed get getAddModal(){
  return this.addmodal;
}
@computed get getUpdateModal(){
  return this.updatemodal;
}
@computed get getUpdateId(){
  return this.updateid;
}
@computed get getRemoveId(){
  return this.removeid;
}
@computed get getSearch(){
  return this.search;
}
@computed get getFilter(){
  return this.filter;
}
@computed get getNumberDisplay(){
  return this.display;
}
@computed get getPage(){
  return this.page;
}
@computed get getBlock(){
  return this.block;
}
@computed get getLot(){
  return this.lot;
}
@computed get getType(){
  return this.type;
}
@computed get getArea(){
  return this.area;
}
@computed get getPrice(){
  return this.price;
}
@computed get getContactNumber(){
  return this.contactnumber;
}
@computed get getAddress(){
  return this.address;
}
@computed get getCity(){
  return this.city;
}
@computed get getProvince(){
  return this.province;
}
@computed get getTypename(){
  return this.typename;
}
@computed get getEquity(){
  return this.equity;
}
@computed get getMisc(){
  return this.misc;
}
@computed get getDescription(){
  return this.description;
}
@computed get getSchemeName(){
  return this.schemename;
}
@computed get getYears(){
  return this.schemeyears;
}
@computed get getSchemePercentage(){
  return this.schemepercentage;
}
@computed get getAddUserProfilePath(){
  return this.profilepath;
}
@computed get getProfileImage(){
  console.log(this.profileimage);
  if(this.profileimage==='Choose File'){
    return false;
  }else{
    return true;
  }
  // return this.addofficerbiomax;
}
@computed get getAccountImage(){
  return this.updateimage;
}
@computed get getImage(){
  return this.accountimage;
}
@computed get getPort(){
  return this.port;
}
@computed get getBirthdate(){
  return this.birthdate;
}
@computed get getSalaryRange(){
  return this.salaryrange;
}
@computed get getMessage(){
  return this.message;
}
@action getHouseModel(){
  return this.housemodel;
}
@action getLotArea(){
  return this.email;
}
@action getFloorArea(){
  return this.email;
}
@action getBedroom(){
  return this.email;
}
@action getBathroom(){
  return this.email;
}
@action getTCP(){
  return this.email;
}


}
const store = new TodoStore();

export default store;