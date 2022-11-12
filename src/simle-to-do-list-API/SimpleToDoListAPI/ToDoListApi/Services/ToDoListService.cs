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
}

public interface IToDoListService
{
    public IEnumerable<ToDoList> GetToDoList();
}