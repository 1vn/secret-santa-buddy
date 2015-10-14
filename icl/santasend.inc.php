<?php
function santasend(){
	$namelist=explode(",", $_GET['namelist']);
	$emaillist=explode(",", $_GET['emaillist']);
	print_r($namelist);
	print_r($emaillist);
}
?>