# client.gd is auto loded on run  
extends Node

# SOCKET_URL and _client are defined 
export var URL = "ws://127.0.0.1:6000"
var _client = WebSocketClient.new()

# on run execute functions 
func _ready():
	_client.connect("connection_closed", self, "_on_connection_closed")
	_client.connect("connection_error", self, "_on_connection_closed")
	_client.connect("connection_established", self, "_on_connected")
	_client.connect("data_received", self, "_on_data")
	
# check for error
	var err = _client.connect_to_url(URL)
	if err != OK:
		print("unable to connect")
		set_process(false)

# Waits up to 1 second to receive a new network event.
func _process(delta):
	_client.poll()

# stops process if connection lost 
func _on_connection_closed(connection_lost = false):
	print("connection_lost: ", connection_lost)
	set_process(false)


###### connected successfull ######
##################################
# when connectd 
func _on_connected():
	print("connected")

# when data is recevied 
func _on_data():
	var payload = JSON.parse( _client.get_peer(1).get_packet().get_string_from_utf8()).result
	print("Received data: ", payload)
	_send()


func _send():
	_client.get_peer(1).put_packet(JSON.print({"client": "connected"}).to_utf8())
