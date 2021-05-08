//Removing Form Resubmission

	if ( window.history.replaceState ) {
        window.history.replaceState( null, null, window.location.href );
    }


    //Checking  Local Storage

	if(localStorage.length){
			document.getElementById("superPasswordPage").style.display = "none"; 
			document.getElementById("superPasswordFill").style.display="block";
			let superPasswordFillForm=document.getElementById("superPasswordFillForm");
			superPasswordFillForm.addEventListener("submit",passwordCheckfn);
			function passwordCheckfn(e){
				e.preventDefault();
				 
				let value=document.getElementById("superPasswordFillInput").value;
				if(value==localStorage.getItem("userSuppass")){
					document.getElementById("superPasswordFill").style.display="none";
				}
			}
	}
	else{
			document.getElementById("superPasswordPage").style.display = "block";
			document.getElementById("superPasswordFill").style.display="none";
		let superPasswordForm=document.getElementById("superPasswordPage");
		superPasswordForm.addEventListener("submit",formFunction);
		function formFunction(e){
			e.preventDefault();
			document.getElementById("superPasswordPage").style.display = "none";
			const userSuperPassword=document.getElementById("superPassword").value;
			const userQn=document.getElementById("secretQuestion").value;
			const secretQuesSelec=document.getElementById("secretQuesSelected").value;
			localStorage.userSuppass=(userSuperPassword);
			localStorage.secretQueSelect=(secretQuesSelec);
			localStorage.secretQues=(userQn);
		}
	}



	var tab=document.querySelector('.user-table');


	if(localStorage){
		var arr = [];
		for (let i = 0; i < localStorage.length; i++) {
		if(localStorage.key(i)=="userSuppass"||localStorage.key(i)=="secretQueSelect"||localStorage.key(i)=="secretQues"){
			continue;
		}
  		arr.push(localStorage.key(i));

		}

		
	//Displaying Previous Enteries

	
	let len=arr.length;
	for(let i=0;i<len;i++){
		 
			// let newData=JSON.parse(localStorage.getItem(arr[i]));
			let newRow=`
				<th>
					<td>${ JSON.parse(localStorage.getItem(arr[i]))["site"]}</td>
					<td>${JSON.parse (localStorage.getItem(arr[i]))["userId"]}</td>
					<td>${JSON.parse (localStorage.getItem(arr[i]))["userPassword"]}</td>
					<td>${JSON.parse (localStorage.getItem(arr[i]))["showPassword"]}</td>
					<td>${JSON.parse (localStorage.getItem(arr[i]))["delete"]}</td>
				</th>`;
			tab.innerHTML += newRow;

		}
	}



	 //TAking New Entries 


		let formVar=document.getElementById("form");
		function fnShowPassword(){
			// console.log("hello");
			let x=document.getElementById("userpassword");
			if(x.type==="password"){
				x.type="text";
			}
			else{
				x.type="password";
			}
		}
		function showSuperPassword(){
			let x=document.getElementById("superPasswordFillInput");
			if(x.type=="password"){
				x.type="text";
			}
			else{
				x.type="password";
			}
		}
		var forgotPassword=document.getElementById("forgotPassword").addEventListener('click',forgotPasswordfn);
		function forgotPasswordfn(){
			let x=document.getElementById("forgotPasswordInput").style.display;
			if(x=="none"){
				document.getElementById("superPasswordFillInput").disabled=true;
				document.getElementById("forgotPasswordInput").style.display="block";
				document.getElementById("forgotPasswordInputButton").style.display="block";
				//console.log(localStorage.getItem('secretQueSelect'));
				document.getElementById("secretQuestionInForget").innerHTML=(localStorage.getItem('secretQueSelect')); 

				superPasswordFillForm.addEventListener("submit",function(e){
				e.preventDefault();
				 
				let value=document.getElementById("forgotPasswordInput").value;
				if(value==localStorage.getItem("secretQues")){
					document.getElementById("superPasswordFill").style.display="none";
				}
			});
			}
			else{
				document.getElementById("superPasswordFillInput").disabled=false;
				document.getElementById("forgotPasswordInput").style.display="none";
				document.getElementById("forgotPasswordInputButton").style.display="none";
				document.getElementById("secretQuestionInForget").innerHTML=""; 
			}
		}
		formVar.addEventListener('submit',(e)=>{
			//console.log("hello1")
			e.preventDefault();
			let input={
				"site":document.getElementById("site").value,
				"userId":document.getElementById("userid").value,
				"userPassword":document.getElementById("userpassword").value,
				"delete":"Delete",
				"showPassword":"Show Password"
			}
			localStorage.setItem(input["site"],JSON.stringify(input)); 
			// alert("New Entry Added"); 
			location.reload();
			// document.forms[1].reset();

		})



	//Edit Buttons


		var table=document.getElementById("user-table");
		for(let i=1;i<table.rows.length;i++){
			table.rows[i].cells[4].style.color="black";
			table.rows[i].cells[4].style.cursor="pointer";
			table.rows[i].cells[4].classList.add("class-show");
			table.rows[i].cells[5].classList.add("class-delete");
			table.rows[i].cells[5].style.color="black";
			table.rows[i].cells[5].style.cursor="pointer";
			 
		}



	//show Password button


	for(let i=0;i<arr.length;i++){
		// console.log("Password")
		document.getElementById("user-table").rows[i+1].cells[3].innerHTML="******";
	} 
	var suppass= (localStorage.getItem("userSuppass"));
	// console.log(suppass);
	var showPassword=document.getElementsByClassName("class-show");
		for(let i=0;i<showPassword.length;i++){ 
			showPassword[i].onclick=(e)=>{ 
			// console.log("pass3");
			let x=document.getElementById("user-table").rows[i+1].cells[3];
			if(x.innerHTML==="******"){
				document.getElementById("user-table").rows[i+1].cells[4].innerHTML="Hide Password";
				// document.getElementById("showPasswordSecurity").style.display="block";
				x.innerHTML=`${JSON. parse(localStorage.getItem(arr[i]))["userPassword"]}`;
			
			}
			else{
				document.getElementById("user-table").rows[i+1].cells[4].innerHTML="Show Password";
				x.innerHTML="******";
			}

			}
		}

	//delete button in table


		var deleteRow=document.getElementsByClassName("class-delete");
		for(let i=0;i<deleteRow.length;i++){ 
			deleteRow[i].onclick=(e)=>{
				console.log("ass4");
				localStorage.removeItem(document.getElementById("user-table").rows[i+1].cells[1].innerHTML);
				location.reload();

			}
		} 