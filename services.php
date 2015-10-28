<?php
date_default_timezone_set('America/Toronto');

include 'santalib.php';
include 'preheader.php';

$cmd=$_GET['cmd'];

switch ($cmd){

	case 'santasend': include 'icl/santasend.inc.php'; santasend(); break;
	default: die('Unrecognized command '.$cmd);
}
?>