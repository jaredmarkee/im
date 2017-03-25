         // initializing socket, connection to server
         var socket = io.connect('http://localhost:7777');
         socket.on('connect', function(data) {
            socket.emit('join', 'Hello server from client');
         });

         // listener for 'thread' event, which updates messages
         socket.on('thread', function(who, data) {
			$('#thread').append('<div class="a"><div style="float: left;" ><img src="scout.png" class="avitar"></div><div class="words">' + who + " - " + data + '</div></div>');
         });
         
         socket.on('del', function(user) {
			 $('#login').append(' <button id="mylink" onclick="signOut()" type="submit">Sign Out</button>');
            delete people[client.id];
         });
         
         

         // prevents form from submitting and sends a message to server
         $("#message_form").submit(function(){
            var message = $('#message').val();
            socket.emit('messages', message);
            this.reset();
            return false;
         });

         $("#user_form").submit(function(){
            var un = $('#username').val();
            socket.emit('username', un);
            this.reset();
            return false;
         });
         
         $("#mylink").submit(function(){
			document.cookie = "username=";
			var user = people[client.id];
            socket.emit('deluser', user);
            return false;
         });
         


	 


