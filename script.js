document.addEventListener("DOMContentLoaded",function(){
    sessionStorage.clear()
    // get the form
    let form = document.querySelector("#applicationForm");
    form.addEventListener("submit",function(event){
      event.preventDefault(); 
     // get fields from forms
     const fullname = document.querySelector("#fullName").value;
     const email = document.querySelector('#email').value;
     const pan = document.querySelector('#pan').value;
     const loanAmount = document.querySelector('#loanAmount').value;
    
  
  
    if(validateFormInputs(fullname,email,pan,loanAmount)){
      window.open("confirm.html","_self"); 
      sessionStorage.setItem('name', fullname);
      sessionStorage.setItem('email', email);
     }
  
    })
  });
  
  function Calc_EMI(){
    let amount = document.querySelector('#loanAmount').value;
    if(amount>0){
      console.log(calculateEstimatedEMI(amount));
      document.querySelector("#estimated-emi").innerHTML ="Estimated EMI : "+calculateEstimatedEMI(amount) + " Rupees for 15 years";
    }
  }
  
  function validateFormInputs(fullname,email,pan,loanAmount){
  let flag=true;
  var fullNameRegex = /^[a-zA-Z ]{4,}$/ ; // Alphabets and spaces only, min 4 characters
  var panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/; // Alphanumeric, format: ABCDE1234F
  var loanAmountRegex = /^[0-9]{1,9}$/; // Numeric, max 9 digits
  if (!fullNameRegex.test(fullname)) {
    alert('Please enter a valid Full Name (minimum two words with minimum four characters each).');
    flag=false;
    return flag;
  }
  
  if (!emailIsValid(email)) {
    alert('Please enter a valid Email address.');
    flag=false;
    return flag;
  }
  
  if (!panRegex.test(pan)) {
    alert('Please enter a valid PAN number (format: ABCDE1234F).');
    flag=false;
    return flag;
  }
  
  if (!loanAmountRegex.test(loanAmount)) {
    alert('Please enter a valid Loan Amount (maximum of 9 digits).');
    flag=false;
    return flag;
  }
  else{
    return flag;
  }
  }
  
  function emailIsValid(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
    // Function to calculate estimated EMI
  function calculateEstimatedEMI(amount) {
      // Implementation of EMI calculation
      var interestRate = 8.5; // in percentage
      var tenure = 15; // in years
    
      // Calculate the EMI
      var emi = calculateEMI(amount, interestRate, tenure);
    
      return emi;
    
      
      // EMI calculation logic
      function calculateEMI(loanAmount, interestRate, tenure) {
        // Convert interest rate from percentage to decimal
        interestRate = interestRate / 100 / 12;
      
        // Convert tenure from years to months
        tenure = tenure * 12;
      
        // Calculate EMI using the formula
        var emi = (loanAmount * interestRate * Math.pow(1 + interestRate, tenure)) / (Math.pow(1 + interestRate, tenure) - 1);
      
        return emi.toFixed(2); // Return EMI amount rounded to 2 decimal places
      }
  }
  
  