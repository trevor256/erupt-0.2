extends Node


# Declare member variables here. Examples:
# var a = 2
# var b = "text"


# Called when the node enters the scene tree for the first time.
func _ready():
	pass # Replace with function body.

func goto_scene(path):
	var loader = ResourceLoader.load_interactive(path)
	
	var loading_bar = load("res://ProgressBar.tscn").instance()
	
	get_tree().get_root().call_deferred('add_child',loading_bar)
	
	while true:
		var err = loader.poll()
		if err == ERR_FILE_EOF:
			#load complete
			var resource = loader.get_resource()
			get_tree().get_root().call_deferred('add_child',resource.instance())
			break
		if err == OK:
			#still Loading
			var progress = float(loader.get_stage())/loader.get_stage_count()
			loading_bar.value = progress * 100
			print(progress)
