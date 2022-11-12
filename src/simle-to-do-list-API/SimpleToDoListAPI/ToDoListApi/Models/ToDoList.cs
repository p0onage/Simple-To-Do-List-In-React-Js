namespace GetToDoList.Models;

public class ToDoList
{
    public int ItemId { get; set; }
    public string Name { get; set; }
    public bool Done { get; set; }
    public bool ToggleComplete { get; set; }
    public string DeleteToDo { get; set; }
}