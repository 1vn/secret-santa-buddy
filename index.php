<?php
include 'header.php';
?>
	<div id="title-block" class="title-block_">	
		<div class="title-block">
				<h1>Secret Santa Buddy</h1>
				<div class="description">
					<p>Gift giving of the future!</p> <br>
				</div>
				<div class="get-started" onclick="nextpage('santa-block')">
						Let's get started!
				</div>
		</div>
	</div>
	<div class="cwidth">
	<div id="santa-block" class="santa-block_">
		<div id="santa-block" class="santa-block">
				<h1>Santa List</h1>
				<div class="description">
				<p>Simply enter the names and emails of the other Secret Santas and press send! Our elves will arrange the gift giving and send everyone an email with who they'll need to surprise!</p>
				</div>
				<div id="santa-list">
				<div class="inprow">
					<div class="namefield"><span><input id="nameinp0" class="nameinp" placeholder="Name"></span></div>
					<div class="emailfield"><span><input id="emailinp0" class="emailinp" placeholder="Email"></span></div>
					<div class="clear"></div>
					</div>
				</div>
				<div class="buttonrow">
					<div class="button" onclick="addsanta()">Add Santa</div>	
					<div class="button submit-button" onclick="secretsanta()">Send</div>
				</div>
		</div>
</div>
	<div class="footer">
	</div>
<?php
include 'footer.php';
?>