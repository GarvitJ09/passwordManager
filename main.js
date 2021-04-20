//Removing Form Resubmission
		if ( window.history.replaceState ) {
        window.history.replaceState( null, null, window.location.href );
    }
    var tab=document.querySelector('.user-table');


	if("passwordManager" in localStorage){
		var arr = JSON.parse(localStorage.getItem('passwordManager'));

		
		//Displaying Previous Enteries
		let len=JSON.parse(localStorage.getItem("passwordManager")).length;
		for(let i=0;i<len;i++){
			let newRow=`
				<th>
					<td>${JSON.parse(localStorage.getItem("passwordManager"))[i]["site"]}</td>
					<td>${JSON.parse(localStorage.getItem("passwordManager"))[i]["userId"]}</td>
					<td>${JSON.parse(localStorage.getItem("passwordManager"))[i]["userPassword"]}</td>
				</th>`;
			tab.innerHTML += newRow;

		}
	
	}
    else {
    	var arr=[];
	} 




    //TAking New Entries 
		let formVar=document.getElementById("form");
		formVar.addEventListener('submit',(e)=>{
			console.log("hello1")
			e.preventDefault();
			let input={
				site:document.getElementById("site").value,
				userId:document.getElementById("userid").value,
				userPassword:document.getElementById("password").value
			}
			arr.push(input);
			localStorage.setItem("passwordManager",JSON.stringify(arr)); 
			alert("New Entry Added"); 
			let newRow2=`
				<th>
					<td>${input["site"]}</td>
					<td>${input["userId"]}</td>
					<td>${input["userPassword"]}</td>
				</th>`;
			tab.innerHTML += newRow2;
			document.forms[0].reset();

		})