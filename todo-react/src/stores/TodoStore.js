import React from 'react';
import { observable, action, computed } from 'mobx';
import { reactLocalStorage } from 'reactjs-localstorage';
import axios from "axios";  


class TodoStore {
@observable profilepath='/profile/';
// @observable port='https://mmpdc.herokuapp.com/';
// @observable port='http://localhost:8080/';
// @observable port='http://192.241.154.210:8080/';
@observable port='/api/';
@observable loading=false;
@observable datemodal=false;
@observable voidmodalmisc=false;
@observable voidmodaleqt=false;
@observable ispassword=false;
@observable accountimage='';
@observable updateimage=false;git
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
@observable searchclient ='';
@observable displayname ='';
@observable displaykey ='';
@observable displayaddress ='';
@observable displaycontactnumber ='';
@observable displaypropaddress ='';
@observable displaytypes ='';
@observable displayarea ='';
@observable displayprice ='';
@observable reservationfee ='';
@observable loanable ='';
@observable equitymonth ='12';
@observable computes =false;
@observable monthlymisc =0;
@observable totalmisc =0;
@observable totalequity =0;
@observable newtotalequity =0;
@observable monthlyequity =0;
@observable newreservationfee =0;
@observable totalamortization =0;
@observable monthlyamortization =0;
@observable numberofyears =0;
@observable financing ='';
@observable startdate ='2019/01/01';
@observable displaypaymentscheme ='Choose Payment Scheme';
@observable amortization =[];
@observable clientid ='';
@observable propertyid ='';
@observable paymenttype ='Cash';
@observable payment ='';
@observable bankcheque ='';
@observable bankname ='';
@observable bankbranch ='';
@observable oreceipt ='';
@observable areceipt ='';
@observable penalty ='';
@observable finance ='';
@observable fromdate ='2017/01/01';
@observable todate ='2045/01/01';
@observable payee ='';
@observable voucherdate ='';
@observable amount ='';
@observable cv ='';
@observable checknumber ='';
@observable terms ='';
@observable explanation ='';
@observable preparedby ='';
@observable notedby ='';
@observable approvedby ='';

@action setPayee = (e) => {
  this.payee=e.target.value;
}
@action setPayee2 = (value) => {
  this.payee=value;
}
@action setAmount = (value) => {
  this.amount=value;
}
@action setCV = (e) => {
  this.cv=e.target.value;
}
@action setCV2 = (value) => {
  this.cv=value;
}
@action setCheck = (e) => {
  this.checknumber=e.target.value;
}
@action setCheck2 = (value) => {
  this.checknumber=value;
}
@action setTerms = (e) => {
  this.terms=e.target.value;
}
@action setTerms2 = (value) => {
  this.terms=value;
}
@action setExplanation = (e) => {
  this.explanation=e.target.value;
}
@action setExplanation2 = (value) => {
  this.explanation=value;
}
@action setPreparedBy = (e) => {
  this.preparedby=e.target.value;
}
@action setPreparedBy2 = (value) => {
  this.preparedby=value;
}
@action setNotedBy = (e) => {
  this.notedby=e.target.value;
}
@action setNotedBy2 = (value) => {
  this.notedby=value;
}
@action setApprovedBy = (e) => {
  this.approvedby=e.target.value;
}
@action setApprovedBy2 = (value) => {
  this.approvedby=value;
}
@action setVoucherDate2 = (value) => {
  this.voucherdate=value;
}
@action setVoucherDate = (date,dateString) => {
  this.voucherdate=dateString;
}

@action setDateFrom = (date,dateString) => {
  this.fromdate=dateString;
}
@action setDateTo = (date,dateString) => {
  this.todate=dateString;
}
@action setDateModal = (value) => {
  this.datemodal=value;
}
@action setPenalty = (value) => {
  this.penalty=value;
}
@action setFinance = (value) => {
  this.finance=value;
}
@action setAReceipt = (e) => {
  this.areceipt=e.target.value;
}
@action setOReceipt = (e) => {
  this.oreceipt=e.target.value;
}
@action setBankName = (e) => {
  this.bankname=e.target.value;
}
@action setBankName2 = (value) => {
  this.bankname=value;
}
@action setBankBranch = (e) => {
  this.bankbranch=e.target.value;
}
@action setBankCheque = (e) => {
  this.bankcheque=e.target.value;
}
@action setPayment = (value) => {
  this.payment=value;
}
@action setPaymentType = (value) => {
  this.paymenttype=value;
}
@action setPropertyId = (value) => {
  this.propertyid=value;
}
@action setClientId = (value) => {
  this.clientid=value;
}

@action setAmortization = (id,dates,equity,mf) => {
    this.amortization.push({
       id:id,
       dates:dates,
       equity:equity,
       mf:mf
    })
}

@action setStartDate = (date,dateString) => {
  this.startdate=dateString;
}
@action setFinancing = (value) => {
  this.financing=value;
}
@action setTotalAmortization = (value) => {
  this.totalamortization=value;
}
@action setMonthlyAmortization = (value) => {
  this.monthlyamortization=value;
}
@action setNumberYears = (value) => {
  this.numberofyears=value;
}
@action setMonthlyMisc = (value) => {
  this.monthlymisc=value;
}
@action setNewReservationFee = (value) => {
  this.newreservationfee=value;
}
@action setTotalMisc = (value) => {
  this.totalmisc=value;
}
@action setTotalEquity = (value) => {
  this.totalequity=value;
}
@action setNewTotalEquity = (value) => {
  this.newtotalequity=value;
}
@action setMonthlyEquity = (value) => {
  this.monthlyequity=value;
}
@action setComputes = (value) => {
  this.computes=value;
}
@action setEquityMonth = (value) => {
  this.equitymonth=value;
}
@action setLoanable = (e) => {
  this.loanable=e.target.value;
}
@action setReservationFee = (e) => {
  this.reservationfee=e.target.value;
}
@action setDisplayPaymentScheme = (value) => {
  this.displaypaymentscheme=value;
}
@action setDisplayPropAddress = (value) => {
  this.displaypropaddress=value;
}
@action setDisplayTypes = (value) => {
  this.displaytypes=value;
}
@action setDisplayArea = (value) => {
  this.displayarea=value;
}
@action setDisplayPrice = (value) => {
  this.displayprice=value;
}
@action setDisplayName = (value) => {
  this.displayname=value;
}
@action setDisplayKey = (value) => {
  this.displaykey=value;
}
@action setDisplayAddress = (value) => {
  this.displayaddress=value;
}
@action setDisplayContactNumber = (value) => {
  this.displaycontactnumber=value;
}
@action setSearchClient = (e) => {
  this.searchclient=e.target.value;
}
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
@action setVoidMiscModal = (value) => {
  this.voidmodalmisc=value;
}
@action setVoidEqtModal = (value) => {
  this.voidmodaleqt=value;
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
@action setPrice = (value) => {
  this.price=value;
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
@action setEquity2 = (value) => {
  this.equity=value;
}
@action setMisc2 = (value) => {
  this.misc=value;
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
  this.voidmodalmisc=false;
  this.voidmodaleqt=false;
  this.datemodal=false;
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
@observable payee ='';
@observable voucherdate ='';
@observable amount ='';
@observable cv ='';
@observable checknumber ='';
@observable terms ='';
@observable explanation ='';
@observable preparedby ='';
@observable notedby ='';
@observable approvedby ='';
@computed get getVoucherDate(){
  return this.voucherdate;
}
@computed get getPayee(){
  return this.payee;
}
@computed get getAmount(){
  return this.amount;
}
@computed get getCV(){
  return this.cv;
}
@computed get getCheck(){
  return this.checknumber;
}
@computed get getTerms(){
  return this.terms;
}
@computed get getExplanation(){
  return this.explanation;
}
@computed get getPreparedBy(){
  return this.preparedby;
}
@computed get getNotedBy(){
  return this.notedby;
}
@computed get getApprovedBy(){
  return this.approvedby;
}
@computed get getDateTo(){
  return this.todate;
}
@computed get getDateFrom(){
  return this.fromdate;
}
@computed get getDateModal(){
  return this.datemodal;
}
@computed get getFinance(){
  return this.finance;
}
@computed get getPenalty(){
  return this.penalty;
}
@computed get getAReceipt(){
  return this.areceipt;
}
@computed get getOReceipt(){
  return this.oreceipt;
}
@computed get getBankName(){
  return this.bankname;
}
@computed get getBankBranch(){
  return this.bankbranch;
}
@computed get getBankCheque(){
  return this.bankcheque;
}
@computed get getPayment(){
  return this.payment;
}
@computed get getPaymentType(){
  return this.paymenttype;
}
@computed get getClientId(){
  return this.clientid;
}
@computed get getPropertyId(){
  return this.propertyid;
}
@computed get getAmortization(){
  return this.amortization;
}
@computed get getStartDate(){
  return this.startdate;
}
@computed get getFinancing(){
  return this.financing;
}
@computed get getTotalAmortization(){
  return this.totalamortization;
}
@computed get getMonthlyAmortization(){
  return this.monthlyamortization;
}
@computed get getNumberYears(){
  return this.numberofyears;
}

@computed get getNewReservationFee(){
  return this.newreservationfee;
}
@computed get getTotalMisc(){
  return this.totalmisc;
}
@computed get getTotalEquity(){
  return this.totalequity;
}
@computed get getNewTotalEquity(){
  return this.newtotalequity;
}
@computed get getMonthlyMisc(){
  return this.monthlymisc;
}
@computed get getMonthlyEquity(){
  return this.monthlyequity;
}
@computed get getComputes(){
  return this.computes;
}
@computed get getEquityMonth(){
  return this.equitymonth;
}
@computed get getLoanable(){
  return this.loanable;
}
@computed get getReservationFee(){
  return this.reservationfee;
}
@computed get getDisplayPaymentScheme(){
  return this.displaypaymentscheme;
}
@computed get getDisplayPropAddress(){
  return this.displaypropaddress;
}
@computed get getDisplayTypes(){
  return this.displaytypes;
}
@computed get getDisplayArea(){
  return this.displayarea;
}
@computed get getDisplayPrice(){
  return this.displayprice;
}
@computed get getDisplayName(){
  return this.displayname;
}
@computed get getDisplayKey(){
  return this.displaykey;
}
@computed get getDisplayAddress(){
  return this.displayaddress;
}
@computed get getDisplayContactNumber(){
  return this.displaycontactnumber;
}
@computed get getSearchClient(){
  return this.searchclient;
}
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
@computed get getVoidMiscModal(){
  return this.voidmodalmisc;
}
@computed get getVoidEqtModal(){
  return this.voidmodaleqt;
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