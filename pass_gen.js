function random(min=0,max=1){
	return Math.floor(Math.random()*(max+1-min)+min);
}
function gen_upper(){
	return String.fromCharCode(random(65,90));
}
function gen_lower(){
	return String.fromCharCode(random(97,122));
}
function gen_num(){
	return random(0,9);
}
function gen_symb(){
	const symbols="@%+!#$^?:;-_()*&~{}[]";
	return symbols[random(0,symbols.length-1)];
}/*
function gen_cust(){
	let word=document.getElementById("cust").value;
	console.log(word);
	return word[random(0,word.length-1)];
}*/
function toggle(){ 
	let dis=document.getElementById("check").checked;
	if(dis){
		document.getElementById("cust").disabled=false;
		document.getElementById("ctext").style="color:white;pointer-events: all;";
	}else{
		document.getElementById("cust").disabled=true;
		document.getElementById("ctext").style="color:grey";
	}
}
function generate() {
	let password;
	let pass_len=document.getElementById("slider").value;
	let upper=document.getElementById("c1").checked;
	let lower=document.getElementById("c2").checked;
	let numbers=document.getElementById("c3").checked;
	let spcl=document.getElementById("c4").checked;
	let word=document.getElementById("cust").value;
	if(upper+lower+numbers+spcl<=0)
		return;
	if(document.getElementById("check").checked){
		//code for custom password
		password=word;
		pass_arr=word.split("")
		if(password.length<pass_len){
			for(let i=password.length;i<pass_len;i++){
				const flag=random(0,3);
				//console.log('flag outside :',flag);
				if (lower && flag===0) {
					letter=password[random(0,password.length-1)];
				//	console.log('lower',letter);
					password=password.replace(letter,letter.toLowerCase());
					pass_arr.splice(pass_arr.indexOf(letter),1,letter.toLowerCase());
				//	console.warn(pass_arr.join(""));
					i--;
				}else if(upper && flag===1){
					letter=password[random(0,password.length-1)];
				//	console.log('upper',letter);
					password=password.replace(letter,letter.toUpperCase());
					pass_arr.splice(pass_arr.indexOf(letter),1,letter.toUpperCase());
				//	console.warn(pass_arr.join(""));
					i--;
				}else if(numbers && flag===2){
					password+=gen_num();
				//	console.log('num',flag,password)
					pass_arr.splice(random(0,pass_arr.length),0,gen_num())
				//	console.warn(pass_arr.join(""));
				}else if(spcl && flag===3){
					password+=gen_symb();
				//	console.log('sumb',flag,password);
					pass_arr.splice(random(0,pass_arr.length),0,gen_symb());
				//	console.warn(pass_arr.join(""));
				}else{
					i--;
				}
			}
			document.getElementById("result").value=pass_arr.join("");
		}else if(password.length===JSON.parse(pass_len)){
			//console.log('word=len');
			const flag=random(0,3);
			let password=word;
			for(let i=0;i<(password.length/2);i++){
				if (lower && flag===0) {
					//password+=gen_lower();
					letter=password[random(0,password.length-1)];
					//console.log('lower',letter);
					password=password.replace(letter,letter.toLowerCase());
				}else if(upper && flag===1){
					//password+=gen_upper();
					letter=password[random(0,word.length-1)];
					//console.log('upper',letter);
					password=password.replace(letter,letter.toUpperCase());
				}else if(numbers && flag===2){
					letter=password[random(0,word.length-1)];
					//console.log('num',letter);
					password=password.replace(letter,gen_num());
					//console.log('num',flag,password)
				}else if(spcl && flag===3){
					letter=password[random(0,word.length-1)];
					//console.log('num',letter);
					password=password.replace(letter,gen_symb());
					//console.log('sumb',flag,password)
				}else{
					i--;
				}
			}
			document.getElementById("result").value=password;
		}else{
			//console.log('word>len');
		}
	}else{
		//code for system generated password
		password="";
		for (let i = 0; i <pass_len; i++) {
			const flag=random(0,3);
			if (lower && flag===0) {
				password+=gen_lower();
			}else if(upper && flag===1){
				password+=gen_upper();
			}else if(numbers && flag===2){
				password+=gen_num();
			}else if(spcl && flag===3){
				password+=gen_symb();
			}else{
				i--;
			}
		}
		document.getElementById("result").value=password;
	}
	
}
function copy(){
	let copyText = document.getElementById("result");
	copyText.select();
	copyText.setSelectionRange(0, 99999); /* For mobile devices */
	navigator.clipboard.writeText(copyText.value);
	alert("Copied the text:  " + copyText.value);
}
function sliderVal(){
	document.getElementById("sliderval").value=document.getElementById("slider").value;
}
function increment(){
	document.getElementById("slider").stepUp();
	sliderVal();
}
function decrement(){
	document.getElementById("slider").stepDown();
	sliderVal();
}
