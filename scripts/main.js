var logged_in = false;
var new_user = false;


var pointone = false;
var pointtwo = false;

function authenticate(provider)
{
    firebase.auth().signInWithPopup(provider).then(function(result){
        logged_in = true;
        firebase_database_ref('Users').child(firebase.auth().currentUser.uid).once('value').then(function(snapshot){
           if(snapshot.val()==null)
           {
               newUser();
           }
            else
            {
                mainRun(snapshot.child("AccountType").val())
            }
        });
        
    }, function(error){
        logged_in = false;
    });
    
}

/*.catch(function(error){
        error_details = [error.code, error.message, error.email, error.credential]
    })*/

function firebase_database_ref(path = null)
{
    if(path == null)
    {
        return firebase.database().ref();
    }
    else
    {
        return firebase.database().ref(path);
    }
}

function auth_Facebook()
{
    authenticate(new firebase.auth.FacebookAuthProvider());
}

function auth_Google()
{
    window.alert("alert zero");
    
    authenticate(new firebase.auth.GoogleAuthProvider());
    
    pointtwo = true;
    window.alert("alert");
}

function newUser()
{
    document.getElementById('keep').innerHTML=`
    <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Career READY</title>
    <link rel="stylesheet" href="style.css">
      
  </head>
  <body>
    <h1>
      <p align="middle">
        <strong>CAREERS 4 DUMMIES</strong>
      </p>
    </h1>
    <p>
    <!--Student Option-->
    <div action="" align="middle">
      <input onclick="new_student()" type="submit" value="STUDENT" name="s">
    </div>
    <p>
    <!--Employee Option-->
    <div action="" align="middle">
      <input onclick="new_employee()" type="submit" value="EMPLOYEE" name="e">
    </div>
  
   <script src = "scripts/main.js"></script>
  </body>
    `
}

function new_student()
{
    document.getElementById('keep').innerHTML=`
    <head>
    <title>Welcome </title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>

    <style>
      body {
        .logo{
          font-size:24px;
          color: #20BA08;
        }
        font-family: Cooper std;
      }
      .center
      {
        text-align: center;
      }
    </style>

    <body>

      <nav class="navbar navbar-fixed-top">
        <div class="container-fluid">
          <div class="navbar-header">
            <a class="navbar-brand" href="#"><b>careers4dummies</b></a>
          </div>
          <br><br>
          <!--Title-->
         <div class="container">
           <h3 class="text-primary text-center">
             <p align="middle"> Welcome Student!</p></h3>
          <p align="middle">Let's get STARTED!</p>
           
        </div>
        
        <div style="color:black;text-align:left" class="container jumbotron">
          
          <!--School-->
          <div class="row">
            <div class="col-xs-1">
            </div>
            <div class="col-xs-3">
              <label class="header">School:</label>
            </div>
            <div class="col-xs-2">
              <input id="student_school" type="text" name="school" size="40">
            </div>
          </div>
          <br>
          <!--Year-->
          <div class="row">
            <div class="col-xs-1">
            </div>
            <div class="col-xs-3">
              <label class="header">Year:</label>
            </div>
            <div class="col-xs-2">
              <input id="student_year" type="text" name="year" size="40">
            </div>
          </div>  
          <br>
          <!--GPA-->
          <div class="row">
            <div class="col-xs-1">
            </div>
            <div class="col-xs-3">
              <label class="header">GPA:</label>
            </div>
            <div class="col-xs-2">
              <input id="student_gpa" type="text" name="gpa" size="40">
            </div>
          </div>
          <br>
          <!--Trancipt-->
          <div class="row">
            <div class="col-xs-1">
            </div>
            <div class="col-xs-3">
              <label class="header">Transcript:</label>
            </div>
            <div class="col-xs-2">
              <input type="file" name="transcript">
            </div>
          </div>
          <br>
          <!--Resume-->
          <div class="row">
            <div class="col-xs-1">
            </div>
            <div class="col-xs-3">
              <label class="header">Resume:</label>
            </div>
            <div class="col-xs-2">
              <input type="file" name="resume">
            </div>
          </div>
          <br>
          <!--Profile Picture-->
          <div class="row">
            <div class="col-xs-1">
            </div>
            <div class="col-xs-3">
              <label class="header">Profile Picture:</label>
            </div>
            <div class="col-xs-2">
              <input type="file" name="pc">
            </div>
          </div>
          <br>
          <!--Submit Button-->
          <div>
            <a href="">
              <p align="middle"><input onclick="submit_new_student_info()" type="submit" ></p>
            </a>
            
          </div>
          
        </div>
        </div>
      </nav>
     

          </body>
        </head>
    `
    
    
}

function submit_new_student_info()
{
    school = document.getElementById("student_school").value
    year = document.getElementById("student_year").value
    gpa = document.getElementById("student_gpa").value
    if(school == '' || year == '' || gpa == '')
    {
        window.alert("Please fill in all fields.")
    }
    else
    {
        firebase_database_ref('Users').child(firebase.auth().currentUser.uid).child("AccountType").set("Student");
        firebase_database_ref('Users').child(firebase.auth().currentUser.uid).child("School").set(school);
        firebase_database_ref('Users').child(firebase.auth().currentUser.uid).child("Year").set(year);
        firebase_database_ref('Users').child(firebase.auth().currentUser.uid).child("GPA").set(gpa);
    }
    mainRun("Student")
}

/*firebase_database_ref('hello').child('numberOne').set('value 2343');
firebase_database_ref('hello').set('value 2343');
firebase_database_ref('hello').push().set('value 2343');
*/



function new_employee()
{
    document.getElementById('keep').innerHTML=`
  <head>
    <title>Welcome </title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>

    <style>
      body {
        .logo{
          font-size:24px;
          color: #20BA08;
        }
        font-family: Cooper std;
      }
      .center
      {
        text-align: center;
      }
    </style>

    <body>

      <nav class="navbar navbar-fixed-top">
        <div class="container-fluid">
          <div class="navbar-header">
            <a class="navbar-brand" href="#"><b>careers4dummies</b></a>
          </div>
          <br><br>
          <!--Title-->
          <div class="container">
            <h3 class="text-primary text-center">
              <p align="middle"> Welcome!</p></h3>
            <p align="middle">Let's get STARTED!</p>

          </div>

          <div style="color:black;text-align:left" class="container jumbotron">

            <!--Job Title-->
            <div class="row">
              <div class="col-xs-1">
              </div>
              <div class="col-xs-3">
                <label class="header">Job Title:</label>
              </div>
              <div class="col-xs-2">
                <input id="jobtitle" type="text" name="jobtitle" size="40">
              </div>
            </div>
            <br>
            <!--Occupation-->
            <div class="row">
              <div class="col-xs-1">
              </div>
              <div class="col-xs-3">
                <label class="header">Profession:</label>
              </div>
              <div class="col-xs-2">
                <select id="profession">
                  <option value="engineering">Engineering</option>
                  <option value="venture capatalist">Venture Capatalist</option>
                  <option value="entrepreneur">Entrepreneur</option>
                  <option value="teacher">Teacher</option>
                  <option value="lawyer">Lawyer</option>
                  <option value="other">Other...</option>
                </select>
              </div>
            </div>  
            <br>
            <!--Company-->
            <div class="row">
              <div class="col-xs-1">
              </div>
              <div class="col-xs-3">
                <label class="header">Company:</label>
              </div>
              <div class="col-xs-2">
                <input id="company" type="text" name="Company" size="40">
              </div>
            </div>
            <br>
            <!--Years Experience-->
            <div class="row">
              <div class="col-xs-1">
              </div>
              <div class="col-xs-3">
                <label class="header">Years Experience:</label>
              </div>
              <div class="col-xs-2">
                <input id="exp" type="text" name="years experience" size="40">
              </div>
            </div>
            <br>
            <!--Degree-->
            <div class="row">
              <div class="col-xs-1">
              </div>
              <div class="col-xs-3">
                <label class="header">Degree:</label>
              </div>
              <div class="col-xs-2">
                <input id="degree" type="text" name="degree" size="40">
              </div>
            </div>
            <br>
            <!--School-->
            <div class="row">
              <div class="col-xs-1">
              </div>
              <div class="col-xs-3">
                <label class="header">School:</label>
              </div>
              <div class="col-xs-2">
                <input id="school" type="text" name="school" size="40">
              </div>
            </div>
            <br>
            <!--Profile Picture-->
            <div class="row">
              <div class="col-xs-1">
              </div>
              <div class="col-xs-3">
                <label class="header">Profile Picture:</label>
              </div>
              <div class="col-xs-2">
                <input type="file" name="pc">
              </div>
            </div>
            <br>
            <!--Submit Button-->
            <div>
              <a href="">
                <p align="middle"><input onclick="submit_new_employee_info()" type="submit" ></p>
              </a>

            </div>

          </div>
        </div>
      </nav>


    </body>
  </head>
    `
}

function submit_new_employee_info()
{
    school = document.getElementById("school").value
    jobtitle = document.getElementById("jobtitle").value
    profession = document.getElementById("profession").value
    company = document.getElementById("company").value
    degree = document.getElementById("degree").value
    exp = document.getElementById("exp").value
    if(school == '' || jobtitle == '' || profession == ''|| company == '' || degree == ''|| exp == '')
    {
        window.alert("Please fill in all fields.")
    }
    else
    {
        firebase_database_ref('Users').child(firebase.auth().currentUser.uid).child("AccountType").set("Employee");
        firebase_database_ref('Users').child(firebase.auth().currentUser.uid).child("School").set(school);
        firebase_database_ref('Users').child(firebase.auth().currentUser.uid).child("Jobtitle").set(jobtitle);
        firebase_database_ref('Users').child(firebase.auth().currentUser.uid).child("Profession").set(profession);
        firebase_database_ref('Users').child(firebase.auth().currentUser.uid).child("Company").set(company);
        firebase_database_ref('Users').child(firebase.auth().currentUser.uid).child("Degree").set(degree);
        firebase_database_ref('Users').child(firebase.auth().currentUser.uid).child("YearsInField").set(exp);
    }
    
    mainRun("Employee")
}


function mainRun(accountType)
{
    if(accountType == "E")
    {
        document.getElementById("keep").innerHTML = ` <head>
    <title>Welcome </title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>

    <style>
      .center
      {
        text-align: center;
      }
    </style>

    <body>
      <nav class="navbar navbar-fixed-top">
        <div class="container-fluid">
          <div class="navbar-header">
            <a class="navbar-brand" href="#"><b>careers4dummies</b></a>
          </div>
          <ul class="nav navbar-nav">
            <li class="active"><a href="#">Q&A</a></li>
            <li><a href="#">Profile</a></li>
            <li><a href="#">My Experience</a></li>
            <li><a href="#">Job Shadows / Internships</a></li>
            <li><a href="#">Direct Message</a></li>
          </ul>
        </div>
      </nav>
     <br><br>

      <!--Title-->
      <div class="container">
        <h3 class="text-primary text-center">
          <p align="middle">My Experience</p></h3> 
        <p align="middle"><font size="4">
          Describe for students what a normal day at your career entails and the skillset required to be successful in your field: 
          </font></p>
         
      <!--Display Biography-->
      <div style="color:black;text-align:left" class="container jumbotron">
        <!--Job brief job description-->
        <div class="row">
          <div class="col-xs-1">
          </div>
          <div class="col-xs-3">
            <label class="header">Brief Job Description:</label>
          </div>
          <div class="col-xs-2">
            <textarea id="JD" name="textarea" style="width:310px;height:150px;"></textarea>
          </div>
        </div>
        <br>
        <!--Skills Required-->
        <div class="row">
          <div class="col-xs-1">
          </div>
          <div class="col-xs-3">
            <label class="header">Skills Required:</label>
          </div>
          <div class="col-xs-2">
            <textarea id="SR" name="textarea" style="width:310px;height:150px;"></textarea>
          </div>
        </div>  
        <br>
        <!--Daily Tasks-->
        <div class="row">
          <div class="col-xs-1">
          </div>
          <div class="col-xs-3">
            <label class="header">Daily Tasks:</label>
          </div>
          <div class="col-xs-2">
            <textarea id="DT" name="textarea" style="width:310px;height:150px;"></textarea>
          </div>
        </div>
        <br>
        <!--Job Satisfaction-->
        <div class="row">
          <div class="col-xs-1">
          </div>
          <div class="col-xs-3">
            <label class="header">Job Satisfaction:</label>
          </div>
          <div class="col-xs-2">
            <textarea id="JS" name="textarea" style="width:310px;height:150px;"></textarea>
          </div>
        </div>
        <br>
        <!--Interests-->
        <div class="row">
          <div class="col-xs-1">
          </div>
          <div class="col-xs-3">
            <label class="header">Interests:</label>
          </div>
          <div class="col-xs-2">
            <textarea id="I" name="textarea" style="width:310px;height:150px;"></textarea>
          </div>
        </div>
        <br>
        <!--Tips/Advice-->
        <div class="row">
          <div class="col-xs-1">
          </div>
          <div class="col-xs-3">
            <label class="header">Tips/Advice:</label>
          </div>
          <div class="col-xs-2">
            <textarea id="TA" name="textarea" style="width:310px;height:150px;"></textarea>
          </div>
        </div>
        <br>
        <!--Salary-->
        <div class="row">
          <div class="col-xs-1">
          </div>
          <div class="col-xs-3">
            <label class="header">Salary (Optional):</label>
          </div>
          <div class="col-xs-2">
            <input id="Sal" type="text" name="jobtitle" size="40">
          </div>
        </div>
        <div><p align="middle"><input onclick="submit_empplyee_exp()" type="submit" value="Submit "></p></div>
      </div>
      </div>
      <a href=""><p align="middle">View Comments</p> </a>
      
    </body>
  </head>`
        
        firebase_database_ref('EmployeeExp').child(firebase.auth().currentUser.uid).once('value').then(function(snapshot){
           
            
            if(snapshot.val()!=null)
           {
               if(snapshot.child("JobDescription").val()!=null)
               {
                   document.getElementById("JD").value = snapshot.child("JobDescription").val();
               }
               if(snapshot.child("Skills").val()!=null)
               {
                   document.getElementById("SR").value = snapshot.child("Skills").val();
               }
               if(snapshot.child("Tasks").val()!=null)
               {
                   document.getElementById("DT").value = snapshot.child("Tasks").val();
               }
               
               if(snapshot.child("Satisfaction").val()!=null)
               {
                   document.getElementById("JS").value = snapshot.child("Satisfaction").val();
               }
               
               if(snapshot.child("Interests").val()!=null)
               {
                   document.getElementById("I").value = snapshot.child("Interests").val();
               }
               
               if(snapshot.child("Tips").val()!=null)
               {
                   document.getElementById("TA").value = snapshot.child("Tips").val();
               }
               
               if(snapshot.child("Salary").val()!=null)
               {
                   document.getElementById("Sal").value = snapshot.child("Salary").val();
               }
               
           }
        });
        
    }
    else
    {
       document.getElementById("keep").innerHTML = ` <head>
    <title>Welcome </title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>

    <style>
      .center
      {
        text-align: center;
      }
    </style>

    <body>
      <nav class="navbar navbar-fixed-top">
        <div class="container-fluid">
          <div class="navbar-header">
            <a class="navbar-brand" href="#"><b>careers4dummies</b></a>
          </div>
          <ul class="nav navbar-nav">
            <li class="active"><a href="#">Q&A</a></li>
            <li><a href="#">Profile</a></li>
            <li><a href="#">Employee's Experiences</a></li>
            <li><a href="#">Job Shadows / Internships</a></li>
            <li><a href="#">Direct Message</a></li>
            <li><a href="#">Aptitude Test</a></li>
          </ul>
        </div>
      </nav>
      <br><br>

      <!--Title-->
      <div class="container">
        <h3 class="text-primary text-center">
          <p align="middle">Employee's Experiences</p></h3> 
        <p align="middle"><font size="4">
          Read about what employees have to say about their careers and ask them questions regarding their experiences:
          </font></p>
        <!--Display Biography-->
        <div style="color:black;text-align:left" class="container jumbotron">
          <!--search by career-->
          <div class="row">
            <div class="col-xs-1">
            </div>
            <div class="col-xs-3">
              <label class="header">Search by Career:</label>
            </div>
            <div class="col-xs-2">
              <select>
                <option value="engineering">Engineering</option>
                <option value="venture capatalist">Venture Capatalist</option>
                <option value="entrepreneur">Entrepreneur</option>
                <option value="teacher">Teacher</option>
                <option value="lawyer">Lawyer</option>
                <option value="other">Other...</option>
              </select>
            </div>
          </div>
          <br>
          <!--filters-->
          <div class="row">
            <div class="col-xs-1">
            </div>
            <div class="col-xs-3">
              <label class="header">Filters:</label>
            </div>
            <div class="col-xs-2">
              <select>
                <option value="mr">Most Recent</option>
                <option value="mh">Most Helpful</option>
              </select>
            </div>
          </div>
          <br>
          <p align="middle"><input type="submit" value="Search"></p>
        </div>   
        ==Search Results==
      </div>
    
    </body>` 
    }
}


/*firebase_database_ref('hello').child('numberOne').set('value 2343');
firebase_database_ref('hello').set('value 2343');
firebase_database_ref('hello').push().set('value 2343');
*/

function submit_employee_exp()
{

    firebase_database_ref('EmployeeExp').child(firebase.auth().currentUser.uid).child("JobDescription").set(document.getElementById("JD").value)
    firebase_database_ref('EmployeeExp').child(firebase.auth().currentUser.uid).child("Skills").set(document.getElementById("SR").value)
    firebase_database_ref('EmployeeExp').child(firebase.auth().currentUser.uid).child("Tasks").set(document.getElementById("DT").value)
    firebase_database_ref('EmployeeExp').child(firebase.auth().currentUser.uid).child("JobDescription").set(document.getElementById("JD").value)
    firebase_database_ref('EmployeeExp').child(firebase.auth().currentUser.uid).child("JobDescription").set(document.getElementById("JD").value)
    firebase_database_ref('EmployeeExp').child(firebase.auth().currentUser.uid).child("JobDescription").set(document.getElementById("JD").value)
    firebase_database_ref('EmployeeExp').child(firebase.auth().currentUser.uid).child("JobDescription").set(document.getElementById("JD").value)
    
    if(snapshot.child("JobDescription").val()!=null)
    {
       document.getElementById("JD").value = snapshot.child("JobDescription").val();
    }
    if(snapshot.child("Skills").val()!=null)
    {
       document.getElementById("SR").value = snapshot.child("Skills").val();
    }
    if(snapshot.child("Tasks").val()!=null)
    {
       document.getElementById("DT").value = snapshot.child("Tasks").val();
    }

    if(snapshot.child("Satisfaction").val()!=null)
    {
       document.getElementById("JS").value = snapshot.child("Satisfaction").val();
    }

    if(snapshot.child("Interests").val()!=null)
    {
       document.getElementById("I").value = snapshot.child("Interests").val();
    }

    if(snapshot.child("Tips").val()!=null)
    {
       document.getElementById("TA").value = snapshot.child("Tips").val();
    }

    if(snapshot.child("Salary").val()!=null)
    {
       document.getElementById("Sal").value = snapshot.child("Salary").val();
    }
}

/*function auth_Email_create()
{
    if(document.getElementById('pass').value == document.getElementById('confpass').value)
    {
    
        firebase.auth().createUserWithEmailAndPassword(document.getElementById('email').value, document.getElementById('pass').value).then(function(user_new){
            user = user_new;
        }).catch(function(error){
            window.alert(error.message);
        });

        user.updateProfile({
            displayName: document.getElementById('FN').value + " " + document.getElementById('LN').value
        });
        
        window.alert(user.displayName);
    }
    else
    {
        window.alert("Passwords did not match")
    }
}

function auth_Email_login()
{
    
    firebase.auth().signInWithEmailAndPassword();
}*/