<?php
function santasend(){
	$namelist=explode(",", $_POST['namelist']);
	$emaillist=explode(",", $_POST['emaillist']);
	$nameemail=array();
	foreach($namelist as $idx=>$name){
		$nameemail[$name]=$emaillist[$idx];
	}	

	$matches=array();
	echo "<pre>";print_r($emaillist);echo "</pre>";
	echo "<pre>";print_r($namelist);echo "</pre>";
	echo "<pre>";print_r($nameemail);echo "</pre>";
	shuffle($namelist);
	for($i=0; $i<count($namelist);$i++){
		$matches[$namelist[$i]]=array("target"=>$namelist[$i+1], "email"=>$nameemail[$namelist[$i]]);
	}
	$matches[$namelist[count($namelist)-1]]=array("target"=>$namelist[0], "email"=>$nameemail[$namelist[count($namelist)-1]]);
	//echo "<pre>";print_r($matches);echo "</pre>";
	$sendgrid = new SendGrid(SENDGRID_API_KEY);
	$email = new SendGrid\Email();
	foreach($matches as $name=>$targetobj){
		$targetname=$targetobj['target'];
		$subject="Your Gift Target - Secret Santa Buddy!";
		$body="Hi $name, <br>
		<br>
		You're going to be gifting $targetname!<br>
		<br>
		Happy Holidays!<br><br>
		<i>This email was sent using the <a href='http://www.ivanzhang.ca/secret-santa-buddy'>Secret Santa Buddy</a> app by <a href='http://www.ivanzhang.ca'>Ivan Zhang</a></i>";
		$email->addTo($targetobj["email"])
      ->setFrom("ivanzhangsolutions@gmail.com")
      ->setSubject($subject)
      ->setHtml($body);

		$sendgrid->send($email);

	}
	header('Content-Type: application/json');
	echo json_encode(array("success"=>"true"));
}
?>