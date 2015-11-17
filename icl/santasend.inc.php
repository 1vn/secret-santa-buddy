<?php
function santasend(){
	$pnamelist=$_POST['namelist'];
	$pemaillist=$_POST['emaillist'];
	$namelist=explode(",", $_POST['namelist']);
	$emaillist=explode(",", $_POST['emaillist']);
	$minamt=$_POST['minamt']+0;
	if(count($pnamelist) == 0 || count($pemaillist) == 0){
		header('Content-Type: application/json');
		echo json_encode(array("success"=>0));
		die();
	}
	$nameemail=array();
	foreach($namelist as $idx=>$name){
		$nameemail[$name]=$emaillist[$idx];
	}	

	if($minamt > 0){
		$pricenotice="The minimum amount for the gift should be \$$minamt.";
	}
	$matches=array();
	//echo "<pre>";print_r($emaillist);echo "</pre>";
	//echo "<pre>";print_r($namelist);echo "</pre>";
	//echo "<pre>";print_r($nameemail);echo "</pre>";
	shuffle($namelist);
	for($i=0; $i<count($namelist)-1;$i++){
		$matches[$namelist[$i]]=array("target"=>$namelist[$i+1], "email"=>$nameemail[$namelist[$i]]);
	}
	$matches[$namelist[count($namelist)-1]]=array("target"=>$namelist[0], "email"=>$nameemail[$namelist[count($namelist)-1]]);
	//echo "<pre>";print_r($matches);echo "</pre>";
	$sendgrid = new SendGrid(SENDGRID_API_KEY);
	foreach($matches as $name=>$targetobj){
		$email = new SendGrid\Email();
		$targetname=$targetobj['target'];
		$subject="Your Gift Target - Secret Santa Buddy!";
		$body="Hi $name, <br>
		<br>
		You're going to be gifting $targetname! $pricenotice<br>
		<br>
		Happy Holidays!<br><br>
		<i>This email was sent using the <a href='http://www.ivanzhang.ca/secret-santa-buddy'>Secret Santa Buddy</a> app by <a href='http://www.ivanzhang.ca'>Ivan Zhang</a></i>";
		$email->addTo($targetobj["email"])
      ->setFrom("secretsantazhang@gmail.com")
      ->setSubject($subject)
      ->setHtml($body);

		$sendgrid->send($email);

	}
	header('Content-Type: application/json');
	echo json_encode(array("success"=>1));
}
?>