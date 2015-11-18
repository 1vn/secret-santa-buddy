<?php
include 'preheader.php';
include 'header.php';

?>
	<div id="title-block" class="full-block_">	
		<div class="title-block">
				<div id="julianne">
					<img id="julianne-img" src="julianne.png">
					<span id="julianne-msg"></span>
				</div>
				<h1>Secret Santa Buddy</h1>
				<div class="description">
					<p><i>Gift giving of the future!</i></p> <br>
				</div>
				<div class="get-started" onclick="nextpage('santa-block_')">
						Let's get started!
				</div>
		</div>
	</div>
	<div class="cwidth">
	<div id="santa-block_" class="full-block_">
		<div id="santa-block" class="santa-block">
				<h1>Santa List</h1>
				<div class="description">
				<p>Simply enter the names and emails of the other Secret Santas and press send. Our elves will arrange the gift giving and send everyone an email with who they'll need to surprise!</p>
				</div>
				<div id="santa-options">
					<div class="fielddesc">Mininum Amount</div>
					<div id="min-amount-row" class="inprow">
						$<input type="text" id="minamt" onchange="updaterangevalue" placeholder="0.00" title="Everyone has to spend at least this amount.">
					</div>
				</div>
				<div id="santa-list">
					<div class="inprow" id="row0">
						<div class="namefield" id="namefield0"><span><input id="nameinp0" class="nameinp" placeholder="Name"></span></div>
						<div class="emailfield" id="emailfield0"><span><input id="emailinp0" class="emailinp" placeholder="Email" type="email" onkeypress="addsanta(event)"></span></div>
						<div class="santaoptionsbutton"><i class="fa fa-times" onclick="showsantaoptions(0)"></i></div>
						<div class="clear"></div>
						<!-- <div class="santaoptionsbutton"><i class="fa fa-chevron-down" onclick="showsantaoptions(0)"></i></div>					!-->
						<div class="santaoptions" id="santaoptions0">
						<div class="warningtext" id="warning0">Are you sure you want to remove this Santa?&nbsp;&nbsp;<i class="fa fa-check" onclick="removesanta(0)"></i>&nbsp;&nbsp;<i class="fa fa-times" onclick="showsantaoptions(0)"></i></div>
						</div>
					</div>
				</div>
				<div class="buttonrow" id="buttonrow">
					<div class="button" onclick="addsanta()" id="add">Add Santa&nbsp;&nbsp;<i class="fa fa-plus"></i></div>	
					<div class="button submit-button" onclick="santasend()" id="send">Send&nbsp;&nbsp;<i class="fa fa-envelope-o"></i></div>
				</div>
		</div>
	</div>
	<div id="santaresult"></div>
	<div class="footer">
	</div>
<?php
include 'footer.php';
?>