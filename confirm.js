document.addEventListener("DOMContentLoaded",function(){
    let otp = OTP_generator();
    
    let firstName = get_firstName(sessionStorage.getItem("name"));
    let email = sessionStorage.getItem("email");

    let message = `Dear ${firstName} <br/> Thank you for your inquiry. A 4 digit verification number has been sent to your email: '${email}'.<br/><br/> Please enter it in the following box and submit for confirmation : `;

    let input = document.createElement("INPUT");
    input.setAttribute("type", "text");
    input.setAttribute("id", "otp-input");
    let field = document.querySelector("#otp-validation");
    field.append(input);

    let submit_btn = document.createElement("INPUT");
    submit_btn.setAttribute("type","submit")
    submit_btn.setAttribute("value","submit")
    submit_btn.setAttribute("id", "btn-otp");
    submit_btn.addEventListener("click",function(){
    if (! sessionStorage.getItem("fail_counter")){
        sessionStorage.setItem("fail_counter",0)
    }
        if(input.value.length ==4){
            validateOTP(otp);
        }
    })
    field.append(submit_btn);    

    document.querySelector("#message").innerHTML = message;
    

})
function OTP_generator(){
    let randomOTP = Math.floor(1000 + Math.random() * 9000);
    console.log("Remember this OTP : ",randomOTP);
    alert("Check console for OTP");
    return randomOTP;
}

function get_firstName(name){
    let f_name=""
    for(let i=0;i<name.length;i++){
        if(name[i]===" "){
            break
        }
        else{
            f_name+=name[i];
        }
    }
    return f_name;
}

function validateOTP(otp) {
    let counter;
    if (! sessionStorage.getItem("fail_counter")){
        counter = sessionStorage.setItem("fail_counter",0);
    }
    var enteredOTP = document.getElementById('otp-input').value;
    if (enteredOTP === otp.toString()) {
      // OTP validation successful
      document.write('Validation Successful!');
      
      // Redirect to the home page (You can change the URL as per your requirement)
      setTimeout(function() {
        window.location.href = 'https://www.pixel6.co'; // Replace with your home page URL
      }, 3000); // Wait for 3 seconds before redirecting (optional)
    } else {
        console.log(sessionStorage.getItem("fail_counter"));
      // Incorrect OTP entered
      if(parseInt(sessionStorage.getItem("fail_counter")) >3){
        document.write('Validation Failed!');
        window.location.href = 'https://pixel6.co/failed';
      }
      let counter  = parseInt(sessionStorage.getItem("fail_counter"));
      sessionStorage.setItem("fail_counter",counter+1);
      document.write('Incorrect OTP entered. Please re-enter.');
      // Reset the form and ask the user to re-enter
      setTimeout(function() {
        location.reload(); // Reset the page
      }, 3000); // Wait for 3 seconds before resetting (optional)
    }
  }