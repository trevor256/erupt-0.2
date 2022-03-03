extends MarginContainer

func _ready():
	$HBoxContainer/VBoxContainer/VBoxContainer/StartButton.grab_focus()


func _on_StartButton_pressed():
	get_tree().change_scene("res://testing/test_world.tscn")


func _on_MultiplayerButton_pressed():
	pass # Replace with function body.


func _on_SettingsButton_pressed():
	pass # Replace with function body.


func _on_QuitButton_pressed():
	get_tree().quit()
