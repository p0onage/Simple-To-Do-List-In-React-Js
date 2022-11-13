using GetToDoList.Models;
using ToDoListApi.Data;

namespace ToDoListApi.Services;

public class ToDoListService : IToDoListService
{
    private readonly IToDoListRepository _repository;

    public ToDoListService(IToDoListRepository repository)
    {
        _repository = repository;
    }

    public IEnumerable<ToDoList> GetToDoList()
    {
        return _repository.GetToDoList();
    }

    public void ToggleComplete(int itemId)
    {
        var toDoList = _repository.GetToDoList();
        var item = toDoList.First(x => x.ItemId == itemId);
        item.done = !item.done;
        _repository.UpdateToDoList(toDoList);
    }

    public void AddToDo(ToDoList todo)
    {
        var toDoList = _repository.GetToDoList().ToList();
        todo.ItemId = toDoList.Count + 1;
        todo.done = false;
        toDoList.Add(todo);
        _repository.UpdateToDoList(toDoList);
    }
}

public interface IToDoListService
{
    public IEnumerable<ToDoList> GetToDoList();
    
    public void ToggleComplete(int itemId);
    
    public void AddToDo(ToDoList todo);
}