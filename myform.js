import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import axios from 'axios';
// import image2 from '../../src/images/image3.jpg';
export default class MyForm extends Component {
     constructor(){
        super();
        this.state={
             firstname:'',
             lastname:'',
            email:'',
             phone:'',
            value:'',
            errors:{
              firstname:'',
              lastname:'',
              phone:'',
              email:'',
            },
            selectedFile:null,
            address:'',
            gender:'',
            tenth:'',
            inter:'',
            btech:'',
            mtech:'',
           emailError:''
        }
        
        this.onHandleChange=this.onHandleChange.bind(this);
        // this.onChangeHandler=this.onChangeHandler.bind(this);
        this.changeHandler=this.changeHandler.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
        this.onClickHandler=this.onClickHandler.bind(this);
        // this.onValueChange=this.onValueChange.bind(this);
        this.handleRadioChange=this.handleRadioChange.bind(this);
        this.handleInputChange=this.handleInputChange.bind(this);
        this.onFileChange=this.onFileChange.bind(this);
        // this.onUploadHandler=this.onUploadHandler.bind(this);
    }
    // onChangeFirstName=(e)=>{
    //   this.setState({firstname:e.target.value})
    // }
    //   onChangeLastName=(e)=>{
    //     this.setState({lastname:e.target.value})
    //   }
    changeHandler=(e)=>{
     let name=e.target.name;
     const pn1=RegExp(/^\d{10}$/);
     const regExp = RegExp(
      /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/
  );
           let value=e.target.value;
     let errors=this.state.errors;
     switch(name){
       case "firstname":errors.firstname=value.length<5 ? "username must be 5 characters":"";
       break;
       case "lastname":errors.lastname=value.length<5?"username must be 5 characters":"";
       break;
       case "phone":errors.phone=pn1.test(value)?"":"invalid";
       break;
       case "email":errors.email=regExp.test(value)?"":"invalid";
       break;
       default:
         break;

     }
     this.setState({ [name]:value});
    //  console.log(this.state);
    };

// onChangeEmail=(e)=>{
//   this.setState({email:e.target.value})
// }
onHandleChange=(e)=>{
  this.setState({value:e.target.value})
}
// onChangePhone=(e)=>{
//   this.setState({phone:e.target.value})
// }
  handleRadioChange=(e)=>{
    this.setState({gender:e.target.value})
  }
  handleInputChange=(e)=>{
    e.preventDefault();
    const target=e.target;
    const check=target.type === 'checkbox'?target.checked:target.value;
    const name=target.name;
    this.setState({
      [name]:check
    });
  } 
 onSubmit(e){
    e.preventDefault();
          localStorage.setItem('document',JSON.stringify(this.state));
        alert("form is successful");
        }
    
    remove(e){
      
      e.preventDefault();
      window.localStorage.clear();
    }
    onFileChange= (e) =>{
      // console.log(e.target.files[0]);
      e.preventDefault();
      this.setState({
          selectedFile:e.target.files[0],
          imagepath:e.target.files[0].name
        
      })
  }
  onClickHandler = (e) => {
    e.preventDefault();
      const data = new FormData() 
      data.append('file', this.state.selectedFile)
      axios.post("http://localhost:8000/upload", data, { 
          // receive two    parameter endpoint url ,form data
      })
    .then(res => { // then print response status
        console.log(res.statusText)
     })
  }
  render() {
    const{ errors }=this.state

    return (
    
      <div className="float-container">
         <div className="float-child" >
                <form  onSubmit={this.onSubmit}>
                    <div className="form-group1"  >
                        <label>First Name</label>
                        <input type="text" id="First Name"  name="firstname" placeholder="First Name" onChange={this.changeHandler} className="form-control" />
                        <p style={{color:"red"}}>{errors.firstname}</p>
                        <label>Last Name</label>
                        <input  placeholder="Last Name" type="text" id="lastname" name="lastname" onChange={this.changeHandler} className="form-control" />
                    </div>
                    <p style={{color:"red"}}>{errors.lastname}</p>
                    <div className="form-group" >
                        <label>Email</label>
                        
                      <input type="email" placeholder="Email" id="email" className="form-control" name="email" value={this.state.email} onChange={this.changeHandler} />
                      <p style={{color:"red"}}>{errors.email}</p>
                    </div>
                    
                    {/* <div style={{color:"red"}}>{this.state.emailError}</div> */}
                    <div className="form-group">
                        <label>Phone</label>
                        <input type="tel" placeholder="Phone" id="phone" className="form-control" name="phone" onChange={this.changeHandler} value={this.state.phone}/>
                    </div>
                    <div className="form-group">
                      <label>Address</label>
                      <div>
                      <input type="text" className="form-control" name="address" placeholder="Address" onChange={this.changeHandler}></input>
                      </div>
                    </div>
                      <p style={{color:"red"}}>{errors.phone}</p>
                    <h5 >Qualification </h5>
                    <input type="checkbox"  name="tenth"  id="btech"  onChange={this.handleInputChange}/>&nbsp;10th
                    <br/>
                    <input type="checkbox"  name="inter"  id="btech" onChange={this.handleInputChange}/>&nbsp; Inter
                    <br/>
                    <input type="checkbox"  name="btech"  id="btech"  onChange={this.handleInputChange}/>&nbsp; Btech
                    <br/>
 <input type="checkbox" name="mtech" id="mtech"  onChange={this.handleInputChange}/>&nbsp; Mtech   
<h3>Choose a Year</h3>
<select value={this.state.value} id="opt" onChange={this.onHandleChange}>
<option>2018</option>
<option>2019</option>
<option>2020</option>
</select > 
<br/> <h5> Gender </h5>         
         <label>
           
            <input
              type="radio"
              value="male"
              id="male"
              name="gender" 
              // checked={this.state.gender === "male"}
              onChange={this.handleRadioChange}
               /></label> 
              &nbsp; <label>
            Male
          </label>
        {/* </div> */}
        {/* <div className="radio"> */}
        
       &nbsp;   <label>
            
            <input
              type="radio"
              value="female"
              id="female"
              name="gender"
              // checked={this.state.gender === "female"}
              onChange={this.handleRadioChange}
            /></label>
            &nbsp;<label>
            Female
          </label>
        {/* </div> */}
        {/* <div className="radio"> */}
         &nbsp; <label>
            <input
              type="radio"
              value="other"
              id="other"
              name="gender"
              // checked={this.state.gender === "other"}
              onChange={this.handleRadioChange}
              

            /></label>
           &nbsp; <label>
            Other
            </label>
            
                   <label>Upload Your File</label>
                   <input type="file" className="form-control" name="file" onChange={this.onFileChange}></input>
                    <br></br>      
            

<button type="button" class="btn btn-primary btn-block" onClick={this.onClickHandler}>Upload</button>
  <button type="submit" id="type" class="btn btn-primary btn-block"   >Submit
                </button>
<button type="reset"  class="btn btn-primary btn-block" onClick={this.remove}>Clear</button><br/>


</form>
</div>
<div className="float-child">

<table>
    <tr>
      <td>
    <b> First Name:</b>
      </td>
    <td>
{this.state.firstname}
    </td>
  </tr>
  <tr>
    <td>
    <b> Last Nmae:</b>
    </td>
    <td>
{this.state.lastname}
    </td>
  </tr>
  <tr>
    <td>
   <b>  Email:</b>
    </td>
    <td>
{this.state.email}
    </td>
  </tr>
  <tr>
    <td>
     <b>Phone:</b>
    </td>
    <td>
{this.state.phone}
    </td>
  </tr>
  <tr>
    <td>
    <b>Qualification:</b>
    </td>
    {(this.state.tenth.toString() == 'true') && 
    <td>
    <labe>10th</labe>    
    </td> }
    {(this.state.inter.toString() == 'true') && 
    <td>
   <labe>,Inter</labe>    
    </td>}
    {(this.state.btech.toString() == 'true') &&
<td>
     <labe>,Btech</labe>
    
    </td>}
    {(this.state.mtech.toString() == 'true') &&
    <td>
    <labe>,Mtech</labe>
    
    </td>}
       
   {/* {this.state.mtech.toString()} */}
</tr>
  
  <tr>
    <td>
    <b> Choose Year :</b>
    </td>
    <td>
      {this.state.value}
    </td>
  </tr>
  <tr>
    <td>
    <b> Gender:</b>
    </td>
    <td>
      {this.state.gender}
    </td>
  </tr>
   <tr>
    <td>
    
    <img src={'http://localhost:8000/public/images/'+this.state.imagepath} alt="sr" width='100'></img>
    </td>
  </tr> 
  
</table>

</div>
{/* <img src={process.env.PUBLIC_URL + "/image1.jpg"} width="500"></img> */}
{/* <div>
<img src={image2} alt="img" width="500"/>
</div> */}
{/* <div className='Login-component'></div> */} 
</div>          
         
        );
    }
  }